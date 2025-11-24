import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Loader2 } from 'lucide-react';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  initialLocation?: { lat: number; lng: number };
  onLocationChange: (location: { lat: number; lng: number; address?: string }) => void;
  addressValue?: string;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

// Component to update map view when location changes
function MapUpdater({ position }: { position: L.LatLng | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [position, map]);
  
  return null;
}

// Component to handle map clicks
function MapClickHandler({ onLocationChange }: { onLocationChange: (location: { lat: number; lng: number }) => void }) {
  const map = useMap();
  
  useEffect(() => {
    const handleClick = async (e: L.LeafletMouseEvent) => {
      onLocationChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      
      // Reverse geocode to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );
        const data = await response.json();
        if (data.display_name) {
          onLocationChange({ 
            lat: e.latlng.lat, 
            lng: e.latlng.lng,
            address: data.display_name 
          });
        }
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
      }
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationChange]);
  
  return null;
}

export function MapPicker({ initialLocation, onLocationChange, addressValue }: MapPickerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(
    initialLocation ? L.latLng(initialLocation.lat, initialLocation.lng) : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  
  const defaultCenter: [number, number] = initialLocation
    ? [initialLocation.lat, initialLocation.lng]
    : [25.2048, 55.2708]; // Dubai coordinates

  // Auto-detect user location on mount
  useEffect(() => {
    if (!initialLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = L.latLng(pos.coords.latitude, pos.coords.longitude);
          setPosition(newPos);
          onLocationChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, [initialLocation, onLocationChange]);

  // Geocode when addressValue prop changes
  useEffect(() => {
    if (addressValue && addressValue.length > 3) {
      geocodeAddress(addressValue);
    }
  }, [addressValue]);

  // Search for addresses as user types
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setIsSearching(true);
    
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
        );
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  // Geocode address to coordinates
  const geocodeAddress = async (address: string) => {
    try {
      setIsSearching(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const newPos = L.latLng(parseFloat(result.lat), parseFloat(result.lon));
        setPosition(newPos);
        onLocationChange({ 
          lat: parseFloat(result.lat), 
          lng: parseFloat(result.lon),
          address: result.display_name
        });
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle selecting a search result
  const handleSelectResult = (result: SearchResult) => {
    const newPos = L.latLng(parseFloat(result.lat), parseFloat(result.lon));
    setPosition(newPos);
    setSearchQuery(result.display_name);
    setShowResults(false);
    onLocationChange({ 
      lat: parseFloat(result.lat), 
      lng: parseFloat(result.lon),
      address: result.display_name
    });
  };

  const handleLocationChange = (location: { lat: number; lng: number; address?: string }) => {
    setPosition(L.latLng(location.lat, location.lng));
    onLocationChange(location);
    if (location.address) {
      setSearchQuery(location.address);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Search Box */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search for a location (e.g., Dubai Marina, Sheikh Zayed Road)"
            className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 animate-spin" />
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-[9999] w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectResult(result)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 flex items-start space-x-2"
              >
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Coordinates Display */}
      {position && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span>
            <strong>Location:</strong> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </span>
        </div>
      )}

      {/* Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300 relative z-0">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position && <Marker position={position} />}
          <MapUpdater position={position} />
          <MapClickHandler onLocationChange={handleLocationChange} />
        </MapContainer>
        
        {/* Click Instruction */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md text-sm text-gray-700 z-[1000] pointer-events-none">
          <span className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>Click on the map to set exact location</span>
          </span>
        </div>
      </div>
    </div>
  );
}
