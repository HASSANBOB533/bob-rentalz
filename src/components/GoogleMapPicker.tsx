import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface GoogleMapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export function GoogleMapPicker({ onLocationSelect, initialLat, initialLng }: GoogleMapPickerProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [coordinates, setCoordinates] = useState({
    lat: initialLat || 25.2048,
    lng: initialLng || 55.2708,
  });

  const [manualLat, setManualLat] = useState(initialLat?.toString() || '');
  const [manualLng, setManualLng] = useState(initialLng?.toString() || '');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key not found');
      setIsLoading(false);
      return;
    }

    // Check if already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    window.initGoogleMaps = () => {
      initializeMap();
    };

    script.onerror = () => {
      setError('Failed to load Google Maps');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window.initGoogleMaps;
    };
  }, []);

  const initializeMap = () => {
    if (!mapContainerRef.current || !window.google) return;

    try {
      // Create map
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Create marker
      const marker = new window.google.maps.Marker({
        position: { lat: coordinates.lat, lng: coordinates.lng },
        map: map,
        draggable: true,
        title: 'Property Location',
      });

      // Handle marker drag
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        const lat = position.lat();
        const lng = position.lng();
        updateLocation(lat, lng);
      });

      // Handle map click
      map.addListener('click', (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        marker.setPosition({ lat, lng });
        updateLocation(lat, lng);
      });

      // Initialize autocomplete
      if (searchInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            fields: ['geometry', 'name', 'formatted_address'],
          }
        );

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            map.setCenter({ lat, lng });
            map.setZoom(15);
            marker.setPosition({ lat, lng });
            updateLocation(lat, lng);
          }
        });

        autocompleteRef.current = autocomplete;
      }

      mapRef.current = map;
      markerRef.current = marker;
      setIsLoading(false);

      // Try to get user's location
      if (!initialLat && !initialLng && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setCenter({ lat, lng });
            marker.setPosition({ lat, lng });
            updateLocation(lat, lng);
          },
          () => {
            console.log('Could not get user location');
          }
        );
      }
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  const updateLocation = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
    setManualLat(lat.toFixed(6));
    setManualLng(lng.toFixed(6));
    onLocationSelect(lat, lng);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        if (mapRef.current && markerRef.current) {
          mapRef.current.setCenter({ lat, lng });
          mapRef.current.setZoom(15);
          markerRef.current.setPosition({ lat, lng });
        }

        updateLocation(lat, lng);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not get your current location. Please enable location services.');
        setIsGettingLocation(false);
      }
    );
  };

  const handleManualUpdate = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid coordinates');
      return;
    }

    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }

    if (mapRef.current && markerRef.current) {
      mapRef.current.setCenter({ lat, lng });
      markerRef.current.setPosition({ lat, lng });
    }

    updateLocation(lat, lng);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Location */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="inline-block w-4 h-4 mr-1" />
          Search Location
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a location (e.g., Dubai Marina, Burj Khalifa)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation || isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            {isGettingLocation ? 'Getting...' : 'Current Location'}
          </button>
        </div>
      </div>

      {/* Manual Coordinate Input */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-3">Manual Coordinates</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="text"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder="25.2048"
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="text"
              value={manualLng}
              onChange={(e) => setManualLng(e.target.value)}
              placeholder="55.2708"
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleManualUpdate}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Map
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Enter coordinates manually or click on the map to set location
        </p>
      </div>

      {/* Current Coordinates Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Selected Location:</span>
          <span className="text-gray-900 font-mono">
            {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        )}
        
        <div
          ref={mapContainerRef}
          className="w-full h-96"
          style={{ minHeight: '384px' }}
        />
        
        {/* Instruction Overlay */}
        {!isLoading && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-[1000] pointer-events-none">
            <p className="text-sm font-medium text-gray-700">
              📍 Click on map or drag marker to set location
            </p>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <strong>Tip:</strong> Search for a location above, click "Current Location" to auto-detect, or click anywhere on the map to set the property location.
        </p>
      </div>
    </div>
  );
}
