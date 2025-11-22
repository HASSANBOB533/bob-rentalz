import { ArrowLeft, Upload, MapPin, Shield, User } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/DashboardLayout';
import { LifecycleTimeline } from '../components/LifecycleTimeline';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';

export default function OwnerEditPropertyPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Mock property database
  const MOCK_PROPERTIES: Record<string, any> = useMemo(
    () => ({
      '1': {
        id: '1',
        refCode: 'BOB-NC-APT-0001-R1',
        title: 'Modern 2BR Apartment in New Cairo',
        tagline: 'Spacious modern living in the heart of New Cairo',
        description:
          'Spacious and modern 2-bedroom apartment located in the heart of New Cairo. Features include modern kitchen, balcony, and parking.',
        propertyType: 'apartment',
        bedrooms: '2',
        bathrooms: '2',
        size: '120',
        furnishing: 'furnished',
        floorLevel: '5',
        parkingSpaces: '1',
        price: '15000',
        securityDeposit: '30000',
        minLeaseTerm: '12',
        availabilityDate: '2025-01-01',
        city: 'new-cairo',
        area: '5th-settlement',
        compound: 'Palm Hills',
        street: '123 Palm Street',
        coordinates: '30.0444, 31.2357',
        videoUrl: 'https://youtube.com/watch?v=example',
        status: 'Rented',
        assignedAgent: 'Sarah Anderson',
        amenities: {
          parking: true,
          garden: false,
          pool: true,
          security: true,
          elevator: true,
          gym: true,
          balcony: true,
          petsAllowed: false,
          seaView: false,
        },
      },
      '2': {
        id: '2',
        refCode: 'BOB-GZ-VIL-0002-R1',
        title: 'Luxury Villa with Private Pool',
        tagline: 'Experience luxury living at its finest',
        description:
          'Stunning luxury villa with private pool, large garden, and modern amenities. Perfect for families looking for space and comfort.',
        propertyType: 'villa',
        bedrooms: '5',
        bathrooms: '4',
        size: '450',
        furnishing: 'furnished',
        floorLevel: '',
        parkingSpaces: '3',
        price: '45000',
        securityDeposit: '90000',
        minLeaseTerm: '12',
        availabilityDate: '2025-02-01',
        city: 'giza',
        area: 'sheikh-zayed',
        compound: 'Beverly Hills',
        street: 'Villa 15, Beverly Hills',
        coordinates: '30.0131, 30.9746',
        videoUrl: '',
        status: 'Active',
        assignedAgent: 'Michael Brown',
        amenities: {
          parking: true,
          garden: true,
          pool: true,
          security: true,
          elevator: false,
          gym: true,
          balcony: true,
          petsAllowed: true,
          seaView: false,
        },
      },
      '3': {
        id: '3',
        refCode: 'BOB-CA-PEN-0003-R1',
        title: 'Spacious 3BR Penthouse',
        tagline: 'Breathtaking views from your private penthouse',
        description:
          'Beautiful penthouse with breathtaking views. Features include large terrace, modern kitchen, and premium finishes throughout.',
        propertyType: 'penthouse',
        bedrooms: '3',
        bathrooms: '3',
        size: '200',
        furnishing: 'semi-furnished',
        floorLevel: '15',
        parkingSpaces: '2',
        price: '28000',
        securityDeposit: '56000',
        minLeaseTerm: '12',
        availabilityDate: '2025-03-01',
        city: 'cairo',
        area: 'maadi',
        compound: 'Sarayat',
        street: '45 Nile View Tower',
        coordinates: '29.9602, 31.2569',
        videoUrl: '',
        status: 'Rented',
        assignedAgent: 'Sarah Anderson',
        amenities: {
          parking: true,
          garden: false,
          pool: false,
          security: true,
          elevator: true,
          gym: false,
          balcony: true,
          petsAllowed: false,
          seaView: true,
        },
      },
      '4': {
        id: '4',
        refCode: 'BOB-CA-APT-0004-R1',
        title: 'Family Apartment with Garden View',
        tagline: 'Perfect home for your family',
        description:
          'Comfortable family apartment with garden views and excellent location near schools and shopping centers.',
        propertyType: 'apartment',
        bedrooms: '3',
        bathrooms: '2',
        size: '150',
        furnishing: 'furnished',
        floorLevel: '3',
        parkingSpaces: '1',
        price: '18000',
        securityDeposit: '36000',
        minLeaseTerm: '6',
        availabilityDate: '',
        city: 'cairo',
        area: 'nasr-city',
        compound: '',
        street: '',
        coordinates: '',
        videoUrl: '',
        status: 'Active',
        assignedAgent: null,
        amenities: {
          parking: true,
          garden: true,
          pool: false,
          security: true,
          elevator: true,
          gym: false,
          balcony: false,
          petsAllowed: true,
          seaView: false,
        },
      },
    }),
    [],
  );

  // Form state - initialized with empty values
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

  // Read-only system fields
  const [systemFields, setSystemFields] = useState({
    refCode: '',
    status: '',
    assignedAgent: null as string | null,
  });

  const [loading, setLoading] = useState(true);
  const [propertyNotFound, setPropertyNotFound] = useState(false);

  // Load property data when component mounts
  useEffect(() => {
    if (propertyId && MOCK_PROPERTIES[propertyId]) {
      const property = MOCK_PROPERTIES[propertyId];

      // Pre-fill form with existing property data
      setFormData({
        title: property.title || '',
        tagline: property.tagline || '',
        description: property.description || '',
        propertyType: property.propertyType || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        size: property.size || '',
        furnishing: property.furnishing || '',
        floorLevel: property.floorLevel || '',
        parkingSpaces: property.parkingSpaces || '',
        price: property.price || '',
        securityDeposit: property.securityDeposit || '',
        minLeaseTerm: property.minLeaseTerm || '',
        availabilityDate: property.availabilityDate || '',
        city: property.city || '',
        area: property.area || '',
        compound: property.compound || '',
        street: property.street || '',
        coordinates: property.coordinates || '',
        videoUrl: property.videoUrl || '',
      });

      // Pre-fill amenities
      if (property.amenities) {
        setAmenities(property.amenities);
      }

      // Set read-only system fields
      setSystemFields({
        refCode: property.refCode || '',
        status: property.status || '',
        assignedAgent: property.assignedAgent || null,
      });

      setLoading(false);
      setPropertyNotFound(false);
    } else {
      setLoading(false);
      setPropertyNotFound(true);
    }
  }, [propertyId, MOCK_PROPERTIES]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    setAmenities((prev) => ({
      ...prev,
      [amenity]: checked,
    }));
  };

  const handleSaveChanges = () => {
    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.propertyType ||
      !formData.bedrooms ||
      !formData.price ||
      !formData.city
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would save all fields to the backend
    console.log('Saving property with data:', {
      ...formData,
      amenities,
      ...systemFields,
    });

    toast.success('Property changes saved successfully!');
    setTimeout(() => {
      navigate('/owner/properties');
    }, 1000);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft with data:', {
      ...formData,
      amenities,
      ...systemFields,
    });
    toast.success('Property saved as draft!');
  };

  const handleBackClick = () => {
    navigate('/owner/properties');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      Approved: { bg: 'bg-blue-100', text: 'text-blue-700' },
      Active: { bg: 'bg-green-100', text: 'text-green-700' },
      Rented: { bg: 'bg-purple-100', text: 'text-purple-700' },
      Rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
    return <Badge className={`${config.bg} ${config.text}`}>{status}</Badge>;
  };

  // Show error if property not found
  if (propertyNotFound) {
    return (
      <DashboardLayout userRole="owner">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Property Not Found</h2>
            <p className="text-gray-600 mb-6">
              The property you're trying to edit doesn't exist or has been removed.
            </p>
            <Button type="button" onClick={handleBackClick}>
              Back to My Properties
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout userRole="owner">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading property...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Properties</span>
        </button>

        {/* Page Header with System Info */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Edit Property</h1>
            <p className="text-gray-600 mb-4">Update your existing listing details</p>

            {/* Lifecycle Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-2 max-w-2xl">
              <LifecycleTimeline type="property" currentStage={systemFields.status} />
            </div>
          </div>

          {/* Listing Status Card (Read-Only) */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:min-w-[280px]">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-gray-600" />
              <h3 className="font-medium text-gray-900">Listing Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Reference Code</p>
                <p className="font-mono text-gray-900">{systemFields.refCode}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Status</p>
                {getStatusBadge(systemFields.status)}
              </div>
              {systemFields.assignedAgent && (
                <div>
                  <p className="text-gray-600 mb-1">Assigned Agent</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0E56A4]" />
                    <p className="font-medium text-gray-900">{systemFields.assignedAgent}</p>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3">
                These values are system-controlled and cannot be edited.
              </p>
            </div>
          </div>
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
                <div className="relative mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <Label>Gallery Images</Label>
                <div className="relative mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Upload multiple property photos</p>
                  <p className="text-sm text-gray-500 mt-1">Up to 10 images</p>
                </div>
              </div>

              {/* Floor Plan */}
              <div>
                <Label>Floor Plan</Label>
                <div className="relative mt-1.5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
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
                <p className="text-sm text-gray-500 mt-2">YouTube or Vimeo link for video tour</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="parking" className="cursor-pointer">
                  Parking
                </Label>
                <Switch
                  id="parking"
                  checked={amenities.parking}
                  onCheckedChange={(checked) => handleAmenityToggle('parking', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="garden" className="cursor-pointer">
                  Garden
                </Label>
                <Switch
                  id="garden"
                  checked={amenities.garden}
                  onCheckedChange={(checked) => handleAmenityToggle('garden', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="pool" className="cursor-pointer">
                  Pool
                </Label>
                <Switch
                  id="pool"
                  checked={amenities.pool}
                  onCheckedChange={(checked) => handleAmenityToggle('pool', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="security" className="cursor-pointer">
                  Security
                </Label>
                <Switch
                  id="security"
                  checked={amenities.security}
                  onCheckedChange={(checked) => handleAmenityToggle('security', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="elevator" className="cursor-pointer">
                  Elevator
                </Label>
                <Switch
                  id="elevator"
                  checked={amenities.elevator}
                  onCheckedChange={(checked) => handleAmenityToggle('elevator', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="gym" className="cursor-pointer">
                  Gym
                </Label>
                <Switch
                  id="gym"
                  checked={amenities.gym}
                  onCheckedChange={(checked) => handleAmenityToggle('gym', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="balcony" className="cursor-pointer">
                  Balcony
                </Label>
                <Switch
                  id="balcony"
                  checked={amenities.balcony}
                  onCheckedChange={(checked) => handleAmenityToggle('balcony', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="petsAllowed" className="cursor-pointer">
                  Pets Allowed
                </Label>
                <Switch
                  id="petsAllowed"
                  checked={amenities.petsAllowed}
                  onCheckedChange={(checked) => handleAmenityToggle('petsAllowed', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <Label htmlFor="seaView" className="cursor-pointer">
                  Sea View
                </Label>
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
              type="button"
              onClick={handleSaveDraft}
              variant="outline"
              className="flex-1 sm:flex-initial border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
