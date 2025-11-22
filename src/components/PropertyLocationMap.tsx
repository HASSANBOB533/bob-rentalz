import { MapPin, Navigation, School, ShoppingBag, Coffee, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../data/mockData';

interface PropertyLocationMapProps {
  property: Property;
}

/**
 * PropertyLocationMap Component
 * Displays an interactive map showing the property location with nearby landmarks
 */
export function PropertyLocationMap({ property }: PropertyLocationMapProps) {
  // Get or generate coordinates
  const getCoordinates = () => {
    if (property.coordinates) {
      return property.coordinates;
    }

    // Generate default coordinates based on location
    const locationCoords: Record<string, { lat: number; lng: number }> = {
      'New Cairo': { lat: 30.0444, lng: 31.2357 },
      Maadi: { lat: 29.9602, lng: 31.2497 },
      'New Alamein': { lat: 31.3547, lng: 27.8813 },
    };

    return locationCoords[property.location] || { lat: 30.0444, lng: 31.2357 };
  };

  const coords = getCoordinates();

  // Mock nearby landmarks based on location
  const getNearbyLandmarks = () => {
    const baseOffsets = [
      { dx: 0.005, dy: 0.003, name: 'International School', icon: School, type: 'education' },
      { dx: -0.004, dy: 0.006, name: 'Shopping Mall', icon: ShoppingBag, type: 'shopping' },
      { dx: 0.007, dy: -0.002, name: 'Café District', icon: Coffee, type: 'dining' },
      { dx: -0.003, dy: -0.005, name: 'Business Center', icon: Building2, type: 'business' },
    ];

    return baseOffsets.map((offset, index) => ({
      id: index,
      name: offset.name,
      icon: offset.icon,
      type: offset.type,
      lat: coords.lat + offset.dy,
      lng: coords.lng + offset.dx,
    }));
  };

  const landmarks = getNearbyLandmarks();

  // Convert lat/lng to screen position
  const coordsToPosition = (lat: number, lng: number) => {
    // Calculate relative to property location
    const latDiff = (coords.lat - lat) * 500; // Scale factor
    const lngDiff = (lng - coords.lng) * 500;

    // Center is at 50%, 50%
    const top = 50 + latDiff;
    const left = 50 + lngDiff;

    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="bg-white rounded-xl p-5 md:p-6 lg:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-5">
        <h3>Location</h3>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4AF37] text-sm font-medium hover:underline flex items-center gap-1"
        >
          View on Google Maps →
        </a>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-4 p-4 bg-[#F8F7F5] rounded-xl">
        <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">
            {property.region}, {property.location}
          </p>
          <p className="text-sm text-gray-600">Cairo, Egypt</p>
        </div>
      </div>

      {/* Interactive Map - Responsive Heights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-[260px] md:h-[320px] lg:h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden"
      >
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Street patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#888" strokeWidth="2" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#888" strokeWidth="2" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#888" strokeWidth="2" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#888" strokeWidth="2" />
        </svg>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-soft overflow-hidden z-10">
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200">
            <span className="text-lg font-medium text-gray-700">+</span>
          </button>
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="text-lg font-medium text-gray-700">−</span>
          </button>
        </div>

        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-soft z-10">
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Navigation className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Property Pin - Center */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20"
        >
          <div className="relative group">
            {/* Pulsing Ring */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-[#D4AF37] rounded-full"
              style={{ width: '60px', height: '60px', top: '-10px', left: '-10px' }}
            />

            {/* Main Pin */}
            <div className="relative w-14 h-14 bg-[#D4AF37] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <MapPin className="w-7 h-7 text-white fill-white" />
            </div>

            {/* Property Label */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap border border-gray-200">
              <p className="text-xs font-semibold text-[#2B2B2B] mb-0.5">
                {property.title.substring(0, 20)}...
              </p>
              <p className="text-xs text-[#D4AF37] font-semibold">
                {property.price.toLocaleString()} EGP<span className="text-[10px]">/month</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Nearby Landmarks */}
        {landmarks.map((landmark, index) => {
          const position = coordsToPosition(landmark.lat, landmark.lng);
          const Icon = landmark.icon;

          return (
            <motion.div
              key={landmark.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={position}
            >
              <div className="relative">
                {/* Landmark Pin */}
                <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-gray-300 group-hover:border-[#E9C500] transition-all group-hover:scale-110">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-[#E9C500] transition-colors" />
                </div>

                {/* Landmark Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  <p className="text-xs font-medium text-gray-700">{landmark.name}</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Map Attribution */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
          © BOB Rentalz Maps
        </div>
      </motion.div>

      {/* Nearby Landmarks Legend */}
      <div className="mt-6">
        <h5 className="font-medium mb-3 text-sm text-gray-700">Nearby Landmarks</h5>
        <div className="grid grid-cols-2 gap-3">
          {landmarks.map((landmark) => {
            const Icon = landmark.icon;
            return (
              <div key={landmark.id} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <span className="text-xs">{landmark.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distance Info */}
      <div className="mt-6 p-4 bg-[#F8F7F5] rounded-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">To Airport</p>
            <p className="font-semibold text-sm">25 min</p>
          </div>
          <div className="border-l border-gray-300">
            <p className="text-xs text-gray-600 mb-1">To Downtown</p>
            <p className="font-semibold text-sm">15 min</p>
          </div>
          <div className="border-l border-gray-300">
            <p className="text-xs text-gray-600 mb-1">To Metro</p>
            <p className="font-semibold text-sm">8 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}
