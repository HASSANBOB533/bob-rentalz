import { MapPin, Navigation, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property, agents } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PropertyCard } from './PropertyCard';
import { Button } from './ui/button';

interface MapViewProps {
  properties: Property[];
  onPropertySelect?: (propertyId: string) => void;
}

/**
 * Enhanced MapView Component for BOB Rentalz
 *
 * Features:
 * - Split-screen layout (60% property list, 40% map) on desktop/tablet
 * - Interactive map pins with hover effects and click tooltips
 * - Mobile-responsive with full-screen map and swipeable bottom drawer
 * - Smooth animations and transitions
 * - Gold accent colors matching the premium brand aesthetic
 */
export function MapView({ properties, onPropertySelect }: MapViewProps) {
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [isMobileMapExpanded, setIsMobileMapExpanded] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [mapZoom, setMapZoom] = useState(1);

  // Generate coordinates for properties that don't have them
  const propertiesWithCoordinates = properties.map((property, _index) => {
    if (property.coordinates) {
      return property;
    }

    // Generate coordinates based on location
    let baseCoords = { lat: 30.0444, lng: 31.2357 }; // Default: New Cairo

    if (property.location === 'Maadi') {
      baseCoords = { lat: 29.9602, lng: 31.2497 };
    } else if (property.location === 'New Alamein') {
      baseCoords = { lat: 31.3547, lng: 27.8813 };
    }

    // Add slight offset to spread pins
    const offset = {
      lat: (Math.random() - 0.5) * 0.02,
      lng: (Math.random() - 0.5) * 0.02,
    };

    return {
      ...property,
      coordinates: {
        lat: baseCoords.lat + offset.lat,
        lng: baseCoords.lng + offset.lng,
      },
    };
  });

  // Desktop/Tablet: Split screen view
  const renderSplitView = () => (
    <div className="hidden md:flex h-full gap-0">
      {/* Left: Property List (60%) */}
      <div className="w-[60%] overflow-y-auto p-6 bg-[#F8F7F5]">
        <div className="space-y-4">
          {propertiesWithCoordinates.map((property) => (
            <motion.div
              key={property.id}
              onMouseEnter={() => setHoveredPropertyId(property.id)}
              onMouseLeave={() => setHoveredPropertyId(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: hoveredPropertyId === property.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`transition-all ${
                hoveredPropertyId === property.id ? 'ring-2 ring-[#D4AF37] rounded-2xl' : ''
              }`}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Map (40%) */}
      <div className="w-[40%] sticky top-0 h-full">{renderMap()}</div>
    </div>
  );

  // Mobile: Full screen map with bottom drawer
  const renderMobileView = () => (
    <div className="md:hidden h-full relative">
      {!isMobileMapExpanded ? (
        // Default: Property grid
        <div className="p-4 overflow-y-auto h-full bg-[#F8F7F5]">
          <Button
            onClick={() => setIsMobileMapExpanded(true)}
            className="w-full mb-4 gold-gradient text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            View Full Screen Map
          </Button>
          <div className="space-y-4">
            {propertiesWithCoordinates.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      ) : (
        // Expanded: Full screen map
        <div className="relative h-full">
          {/* Map */}
          {renderMap()}

          {/* Back Button */}
          <button
            onClick={() => setIsMobileMapExpanded(false)}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Bottom Drawer with Swipeable Cards */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl p-4">
              {/* Drawer Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

              {/* Swipeable Property Cards */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileCardIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobilePropertyCard
                      property={propertiesWithCoordinates[mobileCardIndex]}
                      onPropertySelect={onPropertySelect}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {propertiesWithCoordinates.length > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() =>
                        setMobileCardIndex((prev) =>
                          prev > 0 ? prev - 1 : propertiesWithCoordinates.length - 1,
                        )
                      }
                      className="w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <div className="text-sm text-gray-600">
                      {mobileCardIndex + 1} / {propertiesWithCoordinates.length}
                    </div>

                    <button
                      onClick={() =>
                        setMobileCardIndex((prev) =>
                          prev < propertiesWithCoordinates.length - 1 ? prev + 1 : 0,
                        )
                      }
                      className="w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Map rendering
  const renderMap = () => (
    <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
      {/* Mock Map Background with Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20 transition-transform duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${50 * mapZoom}px ${50 * mapZoom}px`,
          transform: `scale(${mapZoom})`,
        }}
      />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-xl shadow-soft overflow-hidden z-10">
        <button
          onClick={() => setMapZoom((prev) => Math.min(prev + 0.2, 2))}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200"
          aria-label="Zoom in"
        >
          <span className="text-lg font-medium text-gray-700">+</span>
        </button>
        <button
          onClick={() => setMapZoom((prev) => Math.max(prev - 0.2, 0.6))}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Zoom out"
        >
          <span className="text-lg font-medium text-gray-700">−</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-soft z-10">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Property Pins */}
      <div className="absolute inset-0">
        {propertiesWithCoordinates.map((property, _index) => {
          // Convert lat/lng to screen position (simplified)
          const coords = property.coordinates!;

          // Map New Cairo area
          const minLat = 29.9,
            maxLat = 30.1,
            minLng = 31.2,
            maxLng = 31.5;

          let top = ((maxLat - coords.lat) / (maxLat - minLat)) * 100;
          let left = ((coords.lng - minLng) / (maxLng - minLng)) * 100;

          // Handle New Alamein (different region)
          if (property.location === 'New Alamein') {
            top = 20 + (index % 3) * 15;
            left = 20 + Math.floor(index / 3) * 15;
          }

          // Clamp values
          top = Math.max(15, Math.min(85, top));
          left = Math.max(15, Math.min(85, left));

          const isHovered = hoveredPropertyId === property.id;
          const isSelected = selectedPinId === property.id;

          return (
            <button
              key={property.id}
              onClick={() => {
                setSelectedPinId(selectedPinId === property.id ? null : property.id);
                setMobileCardIndex(index);
              }}
              onMouseEnter={() => setHoveredPropertyId(property.id)}
              onMouseLeave={() => setHoveredPropertyId(null)}
              className="absolute transform -translate-x-1/2 -translate-y-full group z-20"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transition: 'all 0.3s ease',
              }}
            >
              <div className="relative">
                {/* Pin with Glow Effect */}
                <motion.div
                  animate={{
                    scale: isHovered || isSelected ? 1.2 : 1,
                    boxShadow:
                      isHovered || isSelected
                        ? '0 0 20px 8px rgba(212, 175, 55, 0.6)'
                        : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center border-4 border-white relative"
                >
                  <MapPin className="w-6 h-6 text-white fill-white" />

                  {/* Price Label */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg whitespace-nowrap border border-gray-200">
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {property.price.toLocaleString()} EGP<span className="text-[10px]">/mo</span>
                    </span>
                  </div>
                </motion.div>

                {/* Property Info Tooltip (on click) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-gray-100 z-30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Property Image */}
                      <div className="relative h-40 overflow-hidden">
                        <ImageWithFallback
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      {/* Property Details */}
                      <div className="p-4">
                        <h4 className="font-semibold mb-1 line-clamp-2 text-[14px] md:text-[15px] lg:text-[16px]">
                          {property.title}
                        </h4>
                        <p className="text-[#D4AF37] font-semibold mb-2 text-[18px]">
                          {property.price.toLocaleString()} EGP/month
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{property.location}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {property.bedrooms} beds • {property.bathrooms} baths • {property.area}m²
                        </div>
                        <Link to={`/property/${property.id}`} className="block w-full">
                          <Button className="w-full gold-gradient text-white">View Details</Button>
                        </Link>
                      </div>

                      {/* Arrow pointing to pin */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                        <div className="border-8 border-transparent border-t-white drop-shadow-lg" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-600 shadow-soft">
        Map Data © BOB Rentalz 2025
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {renderSplitView()}
      {renderMobileView()}
    </div>
  );
}

// Mobile Property Card Component
interface MobilePropertyCardProps {
  property: Property;
  onPropertySelect?: (propertyId: string) => void;
}

function MobilePropertyCard({ property, onPropertySelect }: MobilePropertyCardProps) {
  const _agent = agents.find((a) => a.id === property.agentId);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {property.verified && (
          <div className="absolute top-3 left-3 bg-[#D4AF37] text-white px-2 py-1 rounded-full text-xs font-medium">
            Verified
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="p-4">
        <h4 className="font-semibold mb-2 line-clamp-2 text-[14px] md:text-[15px] lg:text-[16px]">
          {property.title}
        </h4>
        <p className="text-[#D4AF37] font-semibold mb-2 text-[18px]">
          {property.price.toLocaleString()} EGP<span className="text-[16px]">/month</span>
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {property.bedrooms} beds • {property.bathrooms} baths • {property.area}m²
        </div>
        <Link to={`/property/${property.id}`} className="block w-full">
          <Button className="w-full gold-gradient text-white">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
