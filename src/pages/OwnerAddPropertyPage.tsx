import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ArrowLeft, Upload, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function OwnerAddPropertyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAgentPath = location.pathname.startsWith('/agent');
  const dashboardPath = isAgentPath ? '/agent/dashboard' : '/owner/dashboard';
  
  // Form state - all fields initialized as empty
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    furnishing: '',
    floorLevel: '',
    parkingSpaces: '',
    price: '',
    securityDeposit: '',
    minLeaseTerm: '',
    availabilityDate: '',
    city: '',
    area: '',
    compound: '',
    street: '',
    coordinates: '',
    videoUrl: '',
  });

  const [amenities, setAmenities] = useState({
    parking: false,
    garden: false,
    pool: false,
    security: false,
    elevator: false,
    gym: false,
    balcony: false,
    petsAllowed: false,
    seaView: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: checked
    }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft with data:', {
      ...formData,
      amenities
    });
    toast.success('Property saved as draft!');
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title || !formData.description || !formData.propertyType || 
        !formData.bedrooms || !formData.price || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('Submitting property with data:', {
      ...formData,
      amenities
    });

    toast.success('Property submitted for approval!');
    setTimeout(() => {
      navigate('/owner/properties');
    }, 1500);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
      {/* Back Link */}
      <Link
        to={dashboardPath}
        className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Add New Property</h1>
        <p className="text-gray-600">Create a new rental listing</p>
      </div>

      <div className="space-y-8">
        {/* Basic Listing Info Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Basic Listing Information</h2>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Luxury 3BR Apartment in New Cairo"
                className="mt-1.5"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            {/* Tagline */}
            <div>
              <Label htmlFor="tagline">Short Tagline</Label>
              <Input
                id="tagline"
                type="text"
                placeholder="e.g., Modern living in the heart of the city"
                className="mt-1.5"
                value={formData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">A catchy one-liner for your property</p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your property in detail..."
                rows={5}
                className="mt-1.5"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Property Details</h2>
          <div className="space-y-6">
            {/* Property Type & Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="property-type">Property Type *</Label>
                <Select 
                  value={formData.propertyType} 
                  onValueChange={(value) => handleInputChange('propertyType', value)}
                >
                  <SelectTrigger id="property-type" className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select 
                  value={formData.bedrooms} 
                  onValueChange={(value) => handleInputChange('bedrooms', value)}
                >
                  <SelectTrigger id="bedrooms" className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Select 
                  value={formData.bathrooms} 
                  onValueChange={(value) => handleInputChange('bathrooms', value)}
                >
                  <SelectTrigger id="bathrooms" className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bathroom</SelectItem>
                    <SelectItem value="2">2 Bathrooms</SelectItem>
                    <SelectItem value="3">3 Bathrooms</SelectItem>
                    <SelectItem value="4">4+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Size, Floor Level, Parking */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="size">Size (sqm)</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="e.g., 120"
                  className="mt-1.5"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="floor-level">Floor Level</Label>
                <Input
                  id="floor-level"
                  type="text"
                  placeholder="e.g., 5 or Ground"
                  className="mt-1.5"
                  value={formData.floorLevel}
                  onChange={(e) => handleInputChange('floorLevel', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="parking-spaces">Parking Spaces</Label>
                <Select 
                  value={formData.parkingSpaces} 
                  onValueChange={(value) => handleInputChange('parkingSpaces', value)}
                >
                  <SelectTrigger id="parking-spaces" className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="1">1 Space</SelectItem>
                    <SelectItem value="2">2 Spaces</SelectItem>
                    <SelectItem value="3">3+ Spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Furnishing */}
            <div>
              <Label htmlFor="furnishing">Furnishing *</Label>
              <Select 
                value={formData.furnishing} 
                onValueChange={(value) => handleInputChange('furnishing', value)}
              >
                <SelectTrigger id="furnishing" className="mt-1.5">
                  <SelectValue placeholder="Select furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furnished">Fully Furnished</SelectItem>
                  <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing & Terms Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Pricing & Terms</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Monthly Rent (EGP) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 25000"
                  className="mt-1.5"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="security-deposit">Security Deposit (EGP)</Label>
                <Input
                  id="security-deposit"
                  type="number"
                  placeholder="e.g., 50000"
                  className="mt-1.5"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Typically 1-2 months rent</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="min-lease-term">Minimum Lease Term (months)</Label>
                <Select 
                  value={formData.minLeaseTerm} 
                  onValueChange={(value) => handleInputChange('minLeaseTerm', value)}
                >
                  <SelectTrigger id="min-lease-term" className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months (1 year)</SelectItem>
                    <SelectItem value="24">24 months (2 years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability-date">Availability Date</Label>
                <Input
                  id="availability-date"
                  type="date"
                  className="mt-1.5"
                  value={formData.availabilityDate}
                  onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">When can tenants move in?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Location Information</h2>
          <div className="space-y-6">
            {/* City, Area, Compound */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city">City *</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => handleInputChange('city', value)}
                >
                  <SelectTrigger id="city" className="mt-1.5">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cairo">Cairo</SelectItem>
                    <SelectItem value="alexandria">Alexandria</SelectItem>
                    <SelectItem value="giza">Giza</SelectItem>
                    <SelectItem value="new-cairo">New Cairo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Area *</Label>
                <Select 
                  value={formData.area} 
                  onValueChange={(value) => handleInputChange('area', value)}
                >
                  <SelectTrigger id="area" className="mt-1.5">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5th-settlement">5th Settlement</SelectItem>
                    <SelectItem value="nasr-city">Nasr City</SelectItem>
                    <SelectItem value="zamalek">Zamalek</SelectItem>
                    <SelectItem value="maadi">Maadi</SelectItem>
                    <SelectItem value="sheikh-zayed">Sheikh Zayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="compound">Compound / Neighborhood</Label>
                <Input
                  id="compound"
                  type="text"
                  placeholder="e.g., Palm Hills"
                  className="mt-1.5"
                  value={formData.compound}
                  onChange={(e) => handleInputChange('compound', e.target.value)}
                />
              </div>
            </div>

            {/* Street / Building */}
            <div>
              <Label htmlFor="street">Street / Building Name</Label>
              <Input
                id="street"
                type="text"
                placeholder="e.g., 123 Palm Street, Building A"
                className="mt-1.5"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
              />
            </div>

            {/* Google Maps Coordinates */}
            <div>
              <Label htmlFor="coordinates">
                <MapPin className="inline w-4 h-4 mr-1" />
                Google Maps Coordinates
              </Label>
              <Input
                id="coordinates"
                type="text"
                placeholder="Latitude, Longitude (e.g., 30.0444, 31.2357)"
                className="mt-1.5"
                value={formData.coordinates}
                onChange={(e) => handleInputChange('coordinates', e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                Right-click on Google Maps and select coordinates to copy
              </p>
            </div>
          </div>
        </div>

        {/* Media Uploads Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Media Uploads</h2>
          <div className="space-y-6">
            {/* Main Image */}
            <div>
              <Label>Main Image *</Label>
              <div className="mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <Label>Gallery Images</Label>
              <div className="mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Upload multiple property photos</p>
                <p className="text-sm text-gray-500 mt-1">Up to 10 images</p>
              </div>
            </div>

            {/* Floor Plan */}
            <div>
              <Label>Floor Plan</Label>
              <div className="mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Upload floor plan image</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG, PDF</p>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <Label htmlFor="video-url">Video Tour URL</Label>
              <Input
                id="video-url"
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1.5"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                YouTube or Vimeo link for video tour
              </p>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-[#0E56A4] mb-6">Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="parking" className="cursor-pointer">Parking</Label>
              <Switch
                id="parking"
                checked={amenities.parking}
                onCheckedChange={(checked) => handleAmenityToggle('parking', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="garden" className="cursor-pointer">Garden</Label>
              <Switch
                id="garden"
                checked={amenities.garden}
                onCheckedChange={(checked) => handleAmenityToggle('garden', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="pool" className="cursor-pointer">Pool</Label>
              <Switch
                id="pool"
                checked={amenities.pool}
                onCheckedChange={(checked) => handleAmenityToggle('pool', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="security" className="cursor-pointer">Security</Label>
              <Switch
                id="security"
                checked={amenities.security}
                onCheckedChange={(checked) => handleAmenityToggle('security', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="elevator" className="cursor-pointer">Elevator</Label>
              <Switch
                id="elevator"
                checked={amenities.elevator}
                onCheckedChange={(checked) => handleAmenityToggle('elevator', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="gym" className="cursor-pointer">Gym</Label>
              <Switch
                id="gym"
                checked={amenities.gym}
                onCheckedChange={(checked) => handleAmenityToggle('gym', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="balcony" className="cursor-pointer">Balcony</Label>
              <Switch
                id="balcony"
                checked={amenities.balcony}
                onCheckedChange={(checked) => handleAmenityToggle('balcony', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="petsAllowed" className="cursor-pointer">Pets Allowed</Label>
              <Switch
                id="petsAllowed"
                checked={amenities.petsAllowed}
                onCheckedChange={(checked) => handleAmenityToggle('petsAllowed', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="seaView" className="cursor-pointer">Sea View</Label>
              <Switch
                id="seaView"
                checked={amenities.seaView}
                onCheckedChange={(checked) => handleAmenityToggle('seaView', checked)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="flex-1 sm:flex-initial border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
          >
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
