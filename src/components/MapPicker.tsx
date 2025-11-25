import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export function MapPicker({ onLocationSelect, initialLat, initialLng }: MapPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const [coordinates, setCoordinates] = useState({
    lat: initialLat || 25.2048,
    lng: initialLng || 55.2708,
  });

  const [manualLat, setManualLat] = useState(initialLat?.toString() || '');
  const [manualLng, setManualLng] = useState(initialLng?.toString() || '');

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 13,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add initial marker
    const marker = L.marker([coordinates.lat, coordinates.lng], {
      draggable: true,
    }).addTo(map);

    // Handle marker drag
    marker.on('dragend', () => {
      const position = marker.getLatLng();
      setCoordinates({ lat: position.lat, lng: position.lng });
      setManualLat(position.lat.toFixed(6));
      setManualLng(position.lng.toFixed(6));
      onLocationSelect(position.lat, position.lng);
    });

    // Handle map click
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCoordinates({ lat, lng });
      setManualLat(lat.toFixed(6));
      setManualLng(lng.toFixed(6));
      onLocationSelect(lat, lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Try to get user's location
    if (navigator.geolocation && !initialLat && !initialLng) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);
          marker.setLatLng([latitude, longitude]);
          setCoordinates({ lat: latitude, lng: longitude });
          setManualLat(latitude.toFixed(6));
          setManualLng(longitude.toFixed(6));
          onLocationSelect(latitude, longitude);
        },
        () => {
          console.log('Could not get user location, using default (Dubai)');
        }
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

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

    setCoordinates({ lat, lng });
    
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([lat, lng], 13);
      markerRef.current.setLatLng([lat, lng]);
    }

    onLocationSelect(lat, lng);
  };

  return (
    <div className="space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleManualUpdate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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
        <div
          ref={mapContainerRef}
          className="w-full h-96 z-0"
          style={{ minHeight: '384px' }}
        />
        
        {/* Instruction Overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-[1000] pointer-events-none">
          <p className="text-sm font-medium text-gray-700">
            📍 Click on map or drag marker to set location
          </p>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <strong>Tip:</strong> You can click anywhere on the map, drag the marker, or enter coordinates manually above.
          The map will automatically detect your current location when you first open this page.
        </p>
      </div>
    </div>
  );
}
