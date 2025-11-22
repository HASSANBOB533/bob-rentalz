import { Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { isInComparison, toggleComparison } from '../utils/comparison';

interface CompareCheckboxProps {
  propertyId: string;
  isInComparison?: boolean;
  onCompareToggle?: () => void;
}

/**
 * CompareCheckbox Component
 * Checkbox button for adding/removing properties from comparison
 */
export function CompareCheckbox({
  propertyId,
  isInComparison: externalIsInComparison,
  onCompareToggle,
}: CompareCheckboxProps) {
  // Use local state only for optimistic updates
  const [localIsSelected, setLocalIsSelected] = useState<boolean | null>(null);

  // Derived state: prefer local optimistic state, fallback to external or computed
  const isSelected = localIsSelected ?? externalIsInComparison ?? isInComparison(propertyId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const success = toggleComparison(propertyId);

    if (!success && !isSelected) {
      toast.error('You can compare up to 3 properties', {
        description: 'Remove a property to add another one.',
      });
      return;
    }

    // Optimistic update
    setLocalIsSelected(!isSelected);
    onCompareToggle?.();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`absolute top-16 right-4 w-9 h-9 rounded-lg flex items-center justify-center transition-all z-20 ${
        isSelected
          ? 'bg-[#D4AF37] text-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isSelected ? 'Remove from comparison' : 'Add to comparison'}
      title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
    >
      {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
    </motion.button>
  );
}
