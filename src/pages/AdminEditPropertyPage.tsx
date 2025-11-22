import { ArrowLeft, Upload, MapPin, Shield, User, FileText, Save, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
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

export default function AdminEditPropertyPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Mock property database - Merged with OwnerEditPropertyPage and AdminPropertyDetailPage data
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
      '101': {
        id: '101',
        refCode: 'BOB-NC-VIL-0101-P1',
        title: 'Luxury 4BR Villa with Pool',
        tagline: 'Stunning luxury villa',
        description:
          'Stunning luxury villa featuring 4 spacious bedrooms, private swimming pool, landscaped garden, and modern amenities throughout. Perfect for families seeking comfort and elegance.',
        propertyType: 'villa',
        bedrooms: '4',
        bathrooms: '3',
        size: '350',
        furnishing: 'furnished',
        floorLevel: 'Ground',
        parkingSpaces: '2',
        price: '45000',
        securityDeposit: '90000',
        minLeaseTerm: '12',
        availabilityDate: '2024-06-01',
        city: 'new-cairo',
        area: '5th-settlement',
        compound: 'Palm Hills',
        street: 'Villa 45',
        coordinates: '30.0444, 31.2357',
        videoUrl: '',
        status: 'Pending',
        assignedAgent: null,
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
      '103': {
        id: '103',
        refCode: 'BOB-ZM-PEN-0103-A1',
        title: 'Spacious Penthouse',
        tagline: 'Elegant penthouse with city views',
        description:
          'Elegant penthouse with breathtaking city views, modern finishes, and premium amenities. Features an expansive terrace perfect for entertaining.',
        propertyType: 'penthouse',
        bedrooms: '3',
        bathrooms: '3',
        size: '280',
        furnishing: 'furnished',
        floorLevel: '12',
        parkingSpaces: '2',
        price: '35000',
        securityDeposit: '70000',
        minLeaseTerm: '12',
        availabilityDate: '2024-05-15',
        city: 'giza', // mapped from Zamalek generally being in Greater Cairo/Giza context or specific
        area: 'zamalek',
        compound: 'Zamalek Towers',
        street: 'Nile St',
        coordinates: '30.0626, 31.2197',
        videoUrl: '',
        status: 'Approved',
        assignedAgent: null,
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
    }),
    [],
  );

  // Form state
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

  const initialAmenities = useMemo(
    () => ({
      parking: false,
      garden: false,
      pool: false,
      security: false,
      elevator: false,
      gym: false,
      balcony: false,
      petsAllowed: false,
      seaView: false,
    }),
    [],
  );

  const [amenities, setAmenities] = useState(initialAmenities);

  const [adminNotes, setAdminNotes] = useState('');

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
        propertyType: property.propertyType?.toLowerCase() || '',
        bedrooms: String(property.bedrooms || ''),
        bathrooms: String(property.bathrooms || ''),
        size: String(property.size || ''),
        furnishing: property.furnishing || '',
        floorLevel: property.floorLevel || '',
        parkingSpaces: String(property.parkingSpaces || ''),
        price: String(property.price || ''),
        securityDeposit: String(property.securityDeposit || ''),
        minLeaseTerm: String(property.minLeaseTerm || ''),
        availabilityDate: property.availabilityDate || '',
        city: property.city?.toLowerCase().replace(' ', '-') || '',
        area: property.area?.toLowerCase().replace(' ', '-') || '',
        compound: property.compound || '',
        street: property.street || '',
        coordinates: property.coordinates || '',
        videoUrl: property.videoUrl || '',
      });

      // Pre-fill amenities
      if (property.amenities) {
        // Check if amenities is array (from AdminPropDetail style) or object (from OwnerEdit style)
        if (Array.isArray(property.amenities)) {
          const amenityObj: any = { ...initialAmenities };
          property.amenities.forEach((a: string) => {
            const key = a.toLowerCase().replace(' ', '');
            // map some common ones if names differ slightly
            if (key === 'seaview') amenityObj.seaView = true;
            else if (amenityObj[key] !== undefined) amenityObj[key] = true;
          });
          setAmenities(amenityObj);
        } else {
          setAmenities(property.amenities);
        }
      }

      // Set read-only system fields
      setSystemFields({
        refCode: property.refCode || `BOB-PROP-${property.id}`,
        status: property.status || '',
        assignedAgent: property.assignedAgent || null,
      });

      // Pre-fill Admin Notes if they existed (mocked empty for now)
      setAdminNotes(property.adminNotes || '');

      setLoading(false);
      setPropertyNotFound(false);
    } else {
      setLoading(false);
      setPropertyNotFound(true);
    }
  }, [propertyId, MOCK_PROPERTIES, initialAmenities]);

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
    console.log('Admin saving property with data:', {
      ...formData,
      amenities,
      adminNotes,
      ...systemFields,
    });

    toast.success('Property changes saved successfully!');
    setTimeout(() => {
      navigate(`/admin/properties/${propertyId}`);
    }, 1000);
  };

  const handleCancel = () => {
    navigate(`/admin/properties/${propertyId}`);
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

  if (propertyNotFound) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Property Not Found</h2>
            <Button type="button" onClick={() => navigate('/admin/properties')}>
              Back to Properties
            </Button>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading property...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Property</span>
        </button>

        {/* Page Header with System Info */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Edit Property (Admin)</h1>
            <p className="text-gray-600">Update listing details and internal notes.</p>
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
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Admin Internal Notes Section */}
          <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#0E56A4]" />
              <h2 className="text-lg font-semibold text-[#0E56A4]">Admin Notes (Internal Only)</h2>
            </div>
            <div>
              <Label htmlFor="admin-notes" className="sr-only">
                Admin Notes
              </Label>
              <Textarea
                id="admin-notes"
                placeholder="Add internal notes about this property (e.g., verification details, owner requests, etc.)"
                rows={3}
                className="bg-white"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                These notes are only visible to admins and agents, not to the owner.
              </p>
            </div>
          </div>

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
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="parking"
                  checked={amenities.parking}
                  onCheckedChange={(checked) => handleAmenityToggle('parking', checked)}
                />
                <Label htmlFor="parking">Private Parking</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="garden"
                  checked={amenities.garden}
                  onCheckedChange={(checked) => handleAmenityToggle('garden', checked)}
                />
                <Label htmlFor="garden">Private Garden</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="pool"
                  checked={amenities.pool}
                  onCheckedChange={(checked) => handleAmenityToggle('pool', checked)}
                />
                <Label htmlFor="pool">Swimming Pool</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="security"
                  checked={amenities.security}
                  onCheckedChange={(checked) => handleAmenityToggle('security', checked)}
                />
                <Label htmlFor="security">24/7 Security</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="elevator"
                  checked={amenities.elevator}
                  onCheckedChange={(checked) => handleAmenityToggle('elevator', checked)}
                />
                <Label htmlFor="elevator">Elevator</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="gym"
                  checked={amenities.gym}
                  onCheckedChange={(checked) => handleAmenityToggle('gym', checked)}
                />
                <Label htmlFor="gym">Shared Gym</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="balcony"
                  checked={amenities.balcony}
                  onCheckedChange={(checked) => handleAmenityToggle('balcony', checked)}
                />
                <Label htmlFor="balcony">Balcony / Terrace</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="pets"
                  checked={amenities.petsAllowed}
                  onCheckedChange={(checked) => handleAmenityToggle('petsAllowed', checked)}
                />
                <Label htmlFor="pets">Pets Allowed</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="seaview"
                  checked={amenities.seaView}
                  onCheckedChange={(checked) => handleAmenityToggle('seaView', checked)}
                />
                <Label htmlFor="seaview">Sea / Nile View</Label>
              </div>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Photos & Video</h2>
            <div className="space-y-6">
              {/* Photos */}
              <div>
                <Label className="mb-2 block">Property Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="font-medium text-gray-900">Click to upload photos</p>
                    <p className="text-sm text-gray-500 mt-1">or drag and drop (JPG, PNG)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Upload at least 5 high-quality photos.</p>
              </div>

              {/* Floor Plan */}
              <div>
                <Label className="mb-2 block">Floor Plan (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Upload Floor Plan</p>
                  </div>
                </div>
              </div>

              {/* Video URL */}
              <div>
                <Label htmlFor="video-url">Video Tour URL (YouTube/Vimeo)</Label>
                <Input
                  id="video-url"
                  type="url"
                  placeholder="https://youtube.com/..."
                  className="mt-1.5"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSaveChanges}
              className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
