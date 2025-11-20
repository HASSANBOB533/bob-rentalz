import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { topLevelRegions } from '../data/locationData';

interface PropertyFiltersProps {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedFurnishing: string;
  setSelectedFurnishing: (value: string) => void;
  selectedBedrooms: string;
  setSelectedBedrooms: (value: string) => void;
  selectedBathrooms: string;
  setSelectedBathrooms: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedStatus: string[];
  handleStatusToggle: (status: string) => void;
  selectedAmenities: string[];
  handleAmenityToggle: (amenity: string) => void;
  allAmenities: string[];
  idPrefix?: string;
}

export function PropertyFilters({
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  selectedFurnishing,
  setSelectedFurnishing,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedBathrooms,
  setSelectedBathrooms,
  maxPrice,
  setMaxPrice,
  selectedStatus,
  handleStatusToggle,
  selectedAmenities,
  handleAmenityToggle,
  allAmenities,
  idPrefix = '',
}: PropertyFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <label className="block font-medium mb-2">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue />
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

      {/* Property Type */}
      <div>
        <label className="block font-medium mb-2">Property Type</label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Cabin">Cabin</SelectItem>
            <SelectItem value="Chalet">Chalet</SelectItem>
            <SelectItem value="Duplex">Duplex</SelectItem>
            <SelectItem value="Loft">Loft</SelectItem>
            <SelectItem value="Penthouse">Penthouse</SelectItem>
            <SelectItem value="Serviced Apartment">Serviced Apartment</SelectItem>
            <SelectItem value="Serviced Studio">Serviced Studio</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="Townhouse">Townhouse</SelectItem>
            <SelectItem value="Twinhouse">Twinhouse</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Furnishing */}
      <div>
        <label className="block font-medium mb-2">Furnishing</label>
        <Select value={selectedFurnishing} onValueChange={setSelectedFurnishing}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Furnished">Furnished</SelectItem>
            <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
            <SelectItem value="Unfurnished">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block font-medium mb-2">Bedrooms</label>
        <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block font-medium mb-2">Bathrooms</label>
        <Select value={selectedBathrooms} onValueChange={setSelectedBathrooms}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Max Price */}
      <div>
        <label className="block font-medium mb-2">Max Price (EGP)</label>
        <Input
          type="number"
          placeholder="e.g., 50000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border-gray-200"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-3">Status</label>
        <div className="space-y-2">
          {['available', 'pending'].map((status) => (
            <div key={status} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}${status}`}
                checked={selectedStatus.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              />
              <label htmlFor={`${idPrefix}${status}`} className="text-sm capitalize cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block font-medium mb-3">Amenities</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <label htmlFor={`${idPrefix}${amenity}`} className="text-sm cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}