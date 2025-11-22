import { Filter, Grid3x3, List, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CompareBar } from '../components/CompareBar';
import { ComparisonModal } from '../components/ComparisonModal';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilters } from '../components/PropertyFilters';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { locations, Property } from '../data/mockData';
import { useProperties } from '../hooks/useProperties';
import { getComparisonList, removeFromComparison, clearComparison } from '../utils/comparison';

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { properties, loading, error } = useProperties();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get('bedrooms') || 'any');
  const [selectedBathrooms, setSelectedBathrooms] = useState('any');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFurnishing, setSelectedFurnishing] = useState('all');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['available']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenities = Array.from(new Set(properties.flatMap((p) => p.amenities))).slice(0, 10);

  useEffect(() => {
    if (properties.length > 0) {
      applyFilters();
    }
  }, [
    properties,
    selectedLocation,
    selectedBedrooms,
    selectedBathrooms,
    selectedType,
    selectedFurnishing,
    maxPrice,
    selectedStatus,
    selectedAmenities,
    sortBy,
  ]);

  const applyFilters = () => {
    let filtered = properties;

    if (selectedLocation !== 'all') {
      filtered = filtered.filter((p) => p.location === selectedLocation);
    }

    if (selectedBedrooms !== 'any') {
      filtered = filtered.filter((p) => p.bedrooms >= parseInt(selectedBedrooms));
    }

    if (selectedBathrooms !== 'any') {
      filtered = filtered.filter((p) => p.bathrooms >= parseInt(selectedBathrooms));
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    if (selectedFurnishing !== 'all') {
      filtered = filtered.filter((p) => p.furnishing === selectedFurnishing);
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter((p) => selectedStatus.includes(p.status));
    }

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((p) =>
        selectedAmenities.every((amenity) => p.amenities.includes(amenity)),
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    setFilteredProperties(filtered);
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity],
    );
  };

  const clearFilters = () => {
    setSelectedLocation('all');
    setSelectedBedrooms('any');
    setSelectedBathrooms('any');
    setSelectedType('all');
    setSelectedFurnishing('all');
    setMaxPrice('');
    setSelectedStatus(['available']);
    setSelectedAmenities([]);
    setSearchParams({});
  };

  const _handlePropertySelect = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const activeFilterCount = [
    selectedLocation !== 'all',
    selectedBedrooms !== 'any',
    selectedBathrooms !== 'any',
    selectedType !== 'all',
    selectedFurnishing !== 'all',
    maxPrice !== '',
    selectedAmenities.length > 0,
  ].filter(Boolean).length;

  // Comparison state
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Update comparison list when changes occur
  const refreshComparison = () => {
    setComparisonList(getComparisonList());
  };

  useEffect(() => {
    refreshComparison();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProperties]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-12 pb-12 md:pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 space-y-4"
        >
          <h1 className="mb-0 text-2xl md:text-2xl lg:text-2xl">Browse Properties</h1>

          {/* Mobile: Vertical Stack with 16px spacing */}
          <div className="space-y-4">
            {/* Property Count */}
            <p className="text-gray-600 text-sm md:text-base">
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>

            {/* Sort Dropdown - Full width on mobile */}
            <div className="w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle - Full width on mobile */}
            <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-200 shadow-soft">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-[#D4AF37] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-[#D4AF37] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">List</span>
              </button>
            </div>

            {/* Mobile Filter Toggle - Full width */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden border-gray-200 relative w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="w-80 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 sticky top-24 overflow-y-auto max-h-[calc(100vh-120px)]"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h4>Filters</h4>
                  {activeFilterCount > 0 && (
                    <span className="bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#D4AF37]">
                  Clear
                </Button>
              </div>

              <PropertyFilters
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedFurnishing={selectedFurnishing}
                setSelectedFurnishing={setSelectedFurnishing}
                selectedBedrooms={selectedBedrooms}
                setSelectedBedrooms={setSelectedBedrooms}
                selectedBathrooms={selectedBathrooms}
                setSelectedBathrooms={setSelectedBathrooms}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedStatus={selectedStatus}
                handleStatusToggle={handleStatusToggle}
                selectedAmenities={selectedAmenities}
                handleAmenityToggle={handleAmenityToggle}
                allAmenities={allAmenities}
                idPrefix="desktop-"
              />
            </motion.div>
          </aside>

          {/* Mobile Filter Panel - Slide from Bottom */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
                <motion.aside
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed left-0 right-0 bottom-0 top-20 bg-white z-50 lg:hidden overflow-hidden rounded-t-3xl"
                >
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <h4>Filters</h4>
                        {activeFilterCount > 0 && (
                          <span className="bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
                            {activeFilterCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-[#D4AF37]"
                        >
                          Clear
                        </Button>
                        <button onClick={() => setShowFilters(false)} className="p-2">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <PropertyFilters
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        selectedFurnishing={selectedFurnishing}
                        setSelectedFurnishing={setSelectedFurnishing}
                        selectedBedrooms={selectedBedrooms}
                        setSelectedBedrooms={setSelectedBedrooms}
                        selectedBathrooms={selectedBathrooms}
                        setSelectedBathrooms={setSelectedBathrooms}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        selectedStatus={selectedStatus}
                        handleStatusToggle={handleStatusToggle}
                        selectedAmenities={selectedAmenities}
                        handleAmenityToggle={handleAmenityToggle}
                        allAmenities={allAmenities}
                        idPrefix="mobile-"
                      />
                    </div>

                    {/* Bottom Apply Button */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <Button
                        onClick={() => setShowFilters(false)}
                        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white py-6"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Properties Content */}
          <main className="flex-1">
            {filteredProperties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-12 text-center shadow-soft border border-gray-100"
              >
                <h3 className="mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : loading ? (
              /* Loading State */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6'
                    : 'flex flex-col gap-4 md:gap-6'
                }
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-red-600 mb-4 text-lg font-semibold">Failed to load properties</p>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              /* Properties Grid */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6'
                    : 'flex flex-col gap-4 md:gap-6'
                }
              >
                {paginatedProperties.map((property, _index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onCompareToggle={refreshComparison}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && filteredProperties.length > 0 && (
              <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 mt-10 md:mt-12 lg:mt-14">
                {/* Prev Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 text-[#1A3A5F] hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Prev</span>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#1A3A5F] text-white font-semibold'
                        : 'text-gray-800 hover:text-[#1A3A5F]'
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 text-[#1A3A5F] hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Compare Bar */}
        {comparisonList.length > 0 && (
          <CompareBar
            properties={comparisonList}
            onRemove={(id) => {
              removeFromComparison(id);
              refreshComparison();
            }}
            onClear={() => {
              clearComparison();
              refreshComparison();
            }}
            onOpenModal={() => setShowComparisonModal(true)}
          />
        )}

        {/* Comparison Modal */}
        <ComparisonModal
          open={showComparisonModal}
          onClose={() => setShowComparisonModal(false)}
          properties={comparisonList}
        />
      </div>
    </div>
  );
}
