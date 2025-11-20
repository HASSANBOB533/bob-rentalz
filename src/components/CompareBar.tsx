import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { properties as allProperties } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompareBarProps {
  properties: string[];
  onRemove: (propertyId: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}

/**
 * CompareBar Component
 * Floating bottom bar showing selected properties for comparison
 */
export function CompareBar({ properties: propertyIds, onRemove, onClear, onOpenModal }: CompareBarProps) {
  if (propertyIds.length === 0) return null;

  const properties = allProperties.filter(p => propertyIds.includes(p.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-4 right-4 md:left-8 md:right-8 lg:left-auto lg:right-8 lg:max-w-4xl lg:mx-auto z-50 bg-white border-2 border-[#D4AF37] shadow-2xl rounded-2xl"
      >
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Side - Selected Properties */}
            <div className="flex items-center gap-4 flex-1 overflow-x-auto">
              <span className="font-semibold text-gray-900 whitespace-nowrap">
                Compare ({properties.length}/3)
              </span>

              <div className="flex gap-3">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="relative flex-shrink-0 group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#D4AF37]">
                      <ImageWithFallback
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => onRemove(property.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      aria-label="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={onClear}
                className="text-sm text-gray-600 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
              <Button
                onClick={onOpenModal}
                disabled={properties.length < 2}
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}