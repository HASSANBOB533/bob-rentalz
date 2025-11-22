import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    amenities: string[];
    availabilityDate: string;
  };
  onApply: (filters: { amenities: string[]; availabilityDate: string }) => void;
}

const AMENITIES = [
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'parking', label: 'Parking' },
  { id: 'garden', label: 'Garden' },
  { id: 'gym', label: 'Gym' },
  { id: 'security', label: 'Security' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'centralAC', label: 'Central AC' },
  { id: 'beachAccess', label: 'Beach Access' },
  { id: 'petFriendly', label: 'Pet Friendly' },
  { id: 'playground', label: 'Playground' },
];

/**
 * FilterModal Component
 * Modal for additional filters like amenities and availability date
 */
export function FilterModal({ isOpen, onClose, filters, onApply }: FilterModalProps) {
  const [localAmenities, setLocalAmenities] = useState<string[]>(filters.amenities);
  const [localDate, setLocalDate] = useState<string>(filters.availabilityDate);

  const handleAmenityToggle = (amenityId: string) => {
    setLocalAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    );
  };

  const handleApply = () => {
    onApply({
      amenities: localAmenities,
      availabilityDate: localDate,
    });
  };

  const handleReset = () => {
    setLocalAmenities([]);
    setLocalDate('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-3 py-2.5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-[#2B2B2B] text-base font-medium">More Filters</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-3">
              {/* Amenities Section */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity.id}
                      className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                        localAmenities.includes(amenity.id)
                          ? 'border-[#E9C500] bg-[#E9C500]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={localAmenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 text-[#E9C500] focus:ring-[#E9C500]"
                      />
                      <span className="text-xs text-gray-700">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Date Section */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Availability Date</h4>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={localDate}
                    onChange={(e) => setLocalDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="w-full pl-9 pr-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all text-xs"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Find properties available from this date onwards
                </p>
              </div>
            </div>

            {/* Footer - Action Buttons */}
            <div className="px-3 py-2.5 border-t border-gray-200 flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 py-2 text-xs h-auto"
              >
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 bg-[#E9C500] hover:bg-[#E3B600] text-[#0E56A4] py-2 text-xs h-auto font-medium"
              >
                Apply Filters
                {(localAmenities.length > 0 || localDate) && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                    {localAmenities.length + (localDate ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
