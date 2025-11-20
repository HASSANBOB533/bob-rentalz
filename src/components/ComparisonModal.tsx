import { X, Bed, Bath, Maximize, MapPin, CheckCircle, XCircle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { properties as allProperties, agents } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { Link } from 'react-router-dom';

interface ComparisonModalProps {
  open: boolean;
  onClose: () => void;
  properties: string[];
}

/**
 * ComparisonModal Component
 * Modal displaying side-by-side property comparison
 */
export function ComparisonModal({ open, onClose, properties: propertyIds }: ComparisonModalProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const properties = allProperties.filter(p => propertyIds.includes(p.id));

  useEffect(() => {
    const favs: Record<string, boolean> = {};
    propertyIds.forEach((id) => {
      favs[id] = isFavorite(id);
    });
    setFavorites(favs);
  }, [propertyIds.join(',')]); // Use joined string to avoid array reference issues

  const handleFavoriteToggle = (propertyId: string) => {
    const newState = toggleFavorite(propertyId);
    setFavorites((prev) => ({ ...prev, [propertyId]: newState }));
  };

  const commonAmenities = [
    'Pool',
    'Parking',
    'Garden',
    'Pet Friendly',
    'Gym',
    'Central AC',
    'Security',
    'Elevator',
    'Balcony',
    'Beach Access',
  ];

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-[#F8F7F5]">
              <h2 className="text-[#2B2B2B]">Compare Properties</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-auto p-6">
              {properties.length < 2 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 mb-2">Select at least 2 properties</h3>
                    <p className="text-gray-600">
                      Add properties to comparison to see them side-by-side
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  properties.length === 3 ? 'lg:grid-cols-3 md:grid-cols-2' : 
                  properties.length === 2 ? 'lg:grid-cols-2' : 
                  'grid-cols-1'
                }`}>
                  {properties.map((property) => {
                    const agent = agents.find((a) => a.id === property.agentId);

                    return (
                      <div
                        key={property.id}
                        className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all"
                      >
                        {/* Property Image */}
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          {property.verified && (
                            <div className="absolute top-3 left-3 bg-[#D4AF37] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </div>
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="p-5 space-y-4">
                          {/* Title & Price */}
                          <div className="mb-5">
                            <Link 
                              to={`/property/${property.id}`}
                              className="font-semibold text-gray-900 hover:text-[#D4AF37] transition-colors line-clamp-2 text-[14px] md:text-[16px] lg:text-[18px] block mb-2"
                            >
                              {property.title}
                            </Link>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-[#D4AF37] font-semibold text-[20px] md:text-[24px] whitespace-nowrap">
                              {property.price.toLocaleString()} EGP<span className="text-[18px] md:text-[22px]">/month</span>
                            </span>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">
                              {property.region}, {property.location}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200">
                            <div className="text-center">
                              <Bed className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {property.bedrooms}
                              </span>
                              <p className="text-xs text-gray-500">Beds</p>
                            </div>
                            <div className="text-center">
                              <Bath className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {property.bathrooms}
                              </span>
                              <p className="text-xs text-gray-500">Baths</p>
                            </div>
                            <div className="text-center">
                              <Maximize className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {property.area}
                              </span>
                              <p className="text-xs text-gray-500">m²</p>
                            </div>
                          </div>

                          {/* Furnishing */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                              Furnishing
                            </p>
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                              {property.furnishing}
                            </span>
                          </div>

                          {/* Amenities */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                              Amenities
                            </p>
                            <div className="space-y-1.5">
                              {commonAmenities.map((amenity) => (
                                <div
                                  key={amenity}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  {property.amenities.includes(amenity) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                      <span className="text-gray-700">{amenity}</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                      <span className="text-gray-400">{amenity}</span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Agent */}
                          {agent && (
                            <div className="pt-3 border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                                Agent
                              </p>
                              <div className="flex items-center gap-3">
                                <ImageWithFallback
                                  src={agent.photo}
                                  alt={agent.name}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {agent.name}
                                  </p>
                                  <p className="text-xs text-gray-500">{agent.phone}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleFavoriteToggle(property.id)}
                            >
                              <Heart
                                className={`w-4 h-4 mr-2 ${
                                  favorites[property.id]
                                    ? 'fill-red-500 text-red-500'
                                    : ''
                                }`}
                              />
                              {favorites[property.id] ? 'Saved' : 'Save'}
                            </Button>
                            <Link to={`/property/${property.id}`} className="flex-1">
                              <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}