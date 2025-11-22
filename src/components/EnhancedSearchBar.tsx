import { Search, MapPin, DollarSign, Home, Sofa, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { topLevelRegions } from '../data/locationData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface EnhancedSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  furnishing: string;
  propertyType: string;
}

export function EnhancedSearchBar({ onSearch, className = '' }: EnhancedSearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
    furnishing: 'all',
    propertyType: 'all',
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-soft p-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Location */}
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 hover:border-[#D4AF37] transition-colors">
          <MapPin className="w-5 h-5 text-[#D4AF37]" />
          <Select
            value={filters.location}
            onValueChange={(value) => setFilters({ ...filters, location: value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {topLevelRegions.map((region) => (
                <SelectItem key={region.id} value={region.name}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 hover:border-[#D4AF37] transition-colors">
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          <Input
            type="text"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border-0 p-0 h-auto focus-visible:ring-0"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 hover:border-[#D4AF37] transition-colors">
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Bedrooms</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* More Filters */}
        <Popover>
          <PopoverTrigger className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            More
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Bathrooms</label>
                <Select
                  value={filters.bathrooms}
                  onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Furnishing</label>
                <Select
                  value={filters.furnishing}
                  onValueChange={(value) => setFilters({ ...filters, furnishing: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                    <SelectItem value="chalet">Chalet</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="serviced-apartment">Serviced Apartment</SelectItem>
                    <SelectItem value="serviced-studio">Serviced Studio</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="twinhouse">Twinhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="gold-gradient text-white rounded-xl px-8 hover:opacity-90 transition-opacity"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}
