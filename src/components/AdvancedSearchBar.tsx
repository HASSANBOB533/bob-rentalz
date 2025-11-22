import { Search, SlidersHorizontal, Bookmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { topLevelRegions } from '../data/locationData';
import { FilterModal } from './FilterModal';
import { Button } from './ui/button';

export interface SearchFilters {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  furnishing: string;
  amenities: string[];
  availabilityDate: string;
}

interface AdvancedSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Cabin',
  'Chalet',
  'Duplex',
  'Loft',
  'Penthouse',
  'Serviced Apartment',
  'Serviced Studio',
  'Studio',
  'Townhouse',
  'Twinhouse',
  'Villa',
];
const FURNISHING_OPTIONS = ['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'];
const BEDROOM_OPTIONS = ['Any', '1', '2', '3', '4', '5+'];

/**
 * AdvancedSearchBar Component
 * Premium search bar with multiple filters and save search functionality
 */
export function AdvancedSearchBar({ onSearch, initialFilters }: AdvancedSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    location: initialFilters?.location || 'All Locations',
    propertyType: initialFilters?.propertyType || 'All Types',
    minPrice: initialFilters?.minPrice || '',
    maxPrice: initialFilters?.maxPrice || '',
    bedrooms: initialFilters?.bedrooms || 'Any',
    furnishing: initialFilters?.furnishing || 'Any',
    amenities: initialFilters?.amenities || [],
    availabilityDate: initialFilters?.availabilityDate || '',
  });

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
    setIsExpanded(false);
  };

  const handleSaveSearch = () => {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const searchName = `Search ${savedSearches.length + 1}`;
    savedSearches.push({
      name: searchName,
      filters,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    toast.success('Search saved to favorites!', {
      description: 'You can access it from your saved searches.',
    });
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      location: 'All Locations',
      propertyType: 'All Types',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'Any',
      furnishing: 'Any',
      amenities: [],
      availabilityDate: '',
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') {
      return value !== '' && value !== 'All Locations' && value !== 'All Types' && value !== 'Any';
    }
    return false;
  }).length;

  return (
    <>
      <motion.div
        ref={searchBarRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[680px] mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Desktop View - Two Row Layout */}
        <div className="hidden lg:block p-3">
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-2 mb-2">
            {/* Location */}
            <div className="col-span-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
              >
                <option value="All Locations">All Locations</option>
                {topLevelRegions.map((region) => (
                  <option key={region.id} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="col-span-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="col-span-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Price Range (EGP)
              </label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-2">
            {/* Bedrooms */}
            <div className="col-span-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Bedrooms</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
              >
                {BEDROOM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Furnishing */}
            <div className="col-span-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Furnishing</label>
              <select
                value={filters.furnishing}
                onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-2 focus:ring-[#E9C500]/20 outline-none transition-all"
              >
                {FURNISHING_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* More Filters Button */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1 opacity-0">
                Filters
              </label>
              <Button
                variant="outline"
                onClick={() => setShowFilterModal(true)}
                className="w-full py-1.5 h-auto relative text-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E9C500] text-[#0E56A4] text-[10px] rounded-full flex items-center justify-center font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Save Search Button */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1 opacity-0">Save</label>
              <Button
                variant="outline"
                onClick={handleSaveSearch}
                className="w-full py-1.5 h-auto text-xs"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Search Button */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1 opacity-0">
                Search
              </label>
              <Button
                onClick={handleSearch}
                className="w-full bg-[#E9C500] hover:bg-[#E3B600] text-[#0E56A4] py-1.5 h-auto text-xs font-medium"
              >
                <Search className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleReset}
                className="text-xs text-gray-600 hover:text-[#E9C500] transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden">
          {/* Collapsed State */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#E9C500]" />
              <span className="text-sm font-medium text-gray-700">Search Properties</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#E9C500] text-[#0E56A4] text-xs rounded-full font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </motion.div>
          </button>

          {/* Expanded State */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100 overflow-hidden"
              >
                <div className="p-2.5 space-y-2">
                  {/* Location */}
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                  >
                    <option value="All Locations">All Locations</option>
                    {topLevelRegions.map((region) => (
                      <option key={region.id} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>

                  {/* Property Type */}
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {/* Price Range */}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                    />
                  </div>

                  {/* Bedrooms & Furnishing - Side by Side */}
                  <div className="flex gap-2">
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                    >
                      {BEDROOM_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option === 'Any'
                            ? 'Beds - Any'
                            : `${option} Bed${option !== '1' ? 's' : ''}`}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filters.furnishing}
                      onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-200 focus:border-[#E9C500] focus:ring-1 focus:ring-[#E9C500]/20 outline-none text-sm"
                    >
                      {FURNISHING_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option === 'Any' ? 'Furnishing - Any' : option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons - 3 in a row */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilterModal(true)}
                      className="flex-1 relative h-8 text-xs px-2"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E9C500] text-[#0E56A4] text-[10px] rounded-full flex items-center justify-center font-medium">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSaveSearch}
                      className="flex-1 h-8 text-xs px-2"
                    >
                      <Bookmark className="w-3.5 h-3.5 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={handleSearch}
                      className="flex-1 bg-[#E9C500] hover:bg-[#E3B600] text-[#0E56A4] h-8 text-xs px-2 font-medium"
                    >
                      <Search className="w-3.5 h-3.5 mr-1" />
                      Search
                    </Button>
                  </div>

                  {/* Reset Filters */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="w-full text-xs text-gray-600 hover:text-[#E9C500] transition-colors flex items-center justify-center gap-1 py-1.5"
                    >
                      <X className="w-3 h-3" />
                      Reset filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters((prev) => ({ ...prev, ...newFilters }));
          setShowFilterModal(false);
        }}
      />
    </>
  );
}
