import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapsPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  apiKey: string;
}

// Global flag to track if script is loaded
let isScriptLoaded = false;
let isScriptLoading = false;
const scriptLoadCallbacks: (() => void)[] = [];

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve) => {
    if (isScriptLoaded) {
      resolve();
      return;
    }

    if (isScriptLoading) {
      scriptLoadCallbacks.push(resolve);
      return;
    }

    isScriptLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    (window as any).initGoogleMaps = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      resolve();
      scriptLoadCallbacks.forEach(cb => cb());
      scriptLoadCallbacks.length = 0;
    };

    document.head.appendChild(script);
  });
};

const GoogleMapsPicker: React.FC<GoogleMapsPickerProps> = ({
  initialLat = 25.2048,
  initialLng = 55.2708,
  onLocationSelect,
  apiKey,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedLocation, setSelectedLocation] = useState({ lat: initialLat, lng: initialLng });
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is missing');
      setIsLoading(false);
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => {
        initializeMap();
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load Google Maps');
        setIsLoading(false);
        console.error('Google Maps loading error:', err);
      });
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    try {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: initialLat, lng: initialLng },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      setMap(mapInstance);

      // Create marker
      const markerInstance = new google.maps.Marker({
        position: { lat: initialLat, lng: initialLng },
        map: mapInstance,
        draggable: true,
        title: 'Property Location',
      });

      setMarker(markerInstance);

      // Add click listener to map
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          updateLocation(lat, lng);
        }
      });

      // Add drag listener to marker
      markerInstance.addListener('dragend', () => {
        const position = markerInstance.getPosition();
        if (position) {
          const lat = position.lat();
          const lng = position.lng();
          updateLocation(lat, lng);
        }
      });

      // Initialize autocomplete
      if (searchInputRef.current) {
        const autocompleteInstance = new google.maps.places.Autocomplete(searchInputRef.current, {
          fields: ['geometry', 'formatted_address', 'name'],
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const placeAddress = place.formatted_address || place.name || '';
            
            updateLocation(lat, lng, placeAddress);
            mapInstance.setCenter({ lat, lng });
            mapInstance.setZoom(15);
          }
        });
      }
    } catch (err) {
      setError('Failed to initialize map');
      console.error('Map initialization error:', err);
    }
  };

  const updateLocation = (lat: number, lng: number, newAddress?: string) => {
    setSelectedLocation({ lat, lng });
    
    if (marker) {
      marker.setPosition({ lat, lng });
    }

    if (map) {
      map.panTo({ lat, lng });
    }

    // Reverse geocode to get address if not provided
    if (!newAddress && window.google) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const geocodedAddress = results[0].formatted_address;
          setAddress(geocodedAddress);
          onLocationSelect(lat, lng, geocodedAddress);
        } else {
          onLocationSelect(lat, lng);
        }
      });
    } else {
      setAddress(newAddress || '');
      onLocationSelect(lat, lng, newAddress);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">❌ {error}</p>
        <p className="text-sm text-red-600 mt-2">Please check your Google Maps API key configuration.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Location
        </label>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a place or address..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <p className="mt-1 text-sm text-gray-500">
          {isLoading ? 'Loading map...' : 'Type to search, or click/drag the marker on the map'}
        </p>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-gray-300 bg-gray-100 relative"
        style={{ minHeight: '400px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Location Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">📍 Selected Location</h4>
        <div className="space-y-1 text-sm text-blue-800">
          <p><strong>Latitude:</strong> {selectedLocation.lat.toFixed(6)}</p>
          <p><strong>Longitude:</strong> {selectedLocation.lng.toFixed(6)}</p>
          {address && (
            <p><strong>Address:</strong> {address}</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>💡 Tip:</strong> You can search for a location using the search box above,
          click anywhere on the map, or drag the marker to set the exact property location.
        </p>
      </div>
    </div>
  );
};

export default GoogleMapsPicker;
