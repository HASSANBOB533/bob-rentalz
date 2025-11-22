import React, { useEffect, useState } from 'react';
import { getAllAmenities, Amenity } from '../../lib/supabase/amenitiesApi';

interface AmenitiesSelectorProps {
  selectedAmenityIds: string[];
  onChange: (amenityIds: string[]) => void;
}

export const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({
  selectedAmenityIds,
  onChange,
}) => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      const data = await getAllAmenities();
      setAmenities(data);
    } catch (error) {
      console.error('Failed to load amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenityIds.includes(amenityId)) {
      onChange(selectedAmenityIds.filter((id) => id !== amenityId));
    } else {
      onChange([...selectedAmenityIds, amenityId]);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading amenities...</div>;
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Amenities</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((amenity) => {
          const isSelected = selectedAmenityIds.includes(amenity.id);
          return (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                }
              `}
            >
              {amenity.icon && <span className="text-xl">{amenity.icon}</span>}
              <span className="text-sm font-medium">{amenity.name}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-2">{selectedAmenityIds.length} amenities selected</p>
    </div>
  );
};
