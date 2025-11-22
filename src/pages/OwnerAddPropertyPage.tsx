import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AmenitiesSelector } from '../components/property/AmenitiesSelector';
import { ImageUploader } from '../components/property/ImageUploader';
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
import { Textarea } from '../components/ui/textarea';
import { createProperty, uploadPropertyImage } from '../lib/supabase/propertiesApi';

export default function OwnerAddPropertyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAgentPath = location.pathname.startsWith('/agent');
  const dashboardPath = isAgentPath ? '/agent/dashboard' : '/owner/dashboard';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnishing: '',
    price: '',
    city: '',
    address: '',
    status: 'draft' as 'draft' | 'active',
  });

  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (files: File[]): Promise<string[]> => {
    setIsUploadingImages(true);
    try {
      const uploadPromises = files.map((file) => uploadPropertyImage(file));
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload some images');
      return [];
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleSaveDraft = async () => {
    await handleSubmit('draft');
  };

  const handlePublish = async () => {
    await handleSubmit('active');
  };

  const handleSubmit = async (status: 'draft' | 'active') => {
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

    setIsSubmitting(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        property_type: formData.propertyType,
        location: formData.city,
        address: formData.address || undefined,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms === 'studio' ? 0 : parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: formData.area ? parseFloat(formData.area) : undefined,
        furnishing: formData.furnishing || undefined,
        status: status,
      };

      const { id } = await createProperty(propertyData, selectedAmenityIds, imageUrls);

      toast.success(
        status === 'draft' ? 'Property saved as draft!' : 'Property submitted for approval!',
      );

      setTimeout(() => {
        navigate(dashboardPath);
      }, 1500);
    } catch (error: any) {
      console.error('Error creating property:', error);
      toast.error(error.message || 'Failed to create property');
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Basic Information</h2>
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

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
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

        {/* Property Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Property Details</h2>
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

            {/* Area & Furnishing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="area">Area (sqm)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 120"
                  className="mt-1.5"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="furnishing">Furnishing</Label>
                <Select
                  value={formData.furnishing}
                  onValueChange={(value) => handleInputChange('furnishing', value)}
                >
                  <SelectTrigger id="furnishing" className="mt-1.5">
                    <SelectValue placeholder="Select furnishing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Fully Furnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Location & Pricing</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city">City/Location *</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="e.g., New Cairo, Cairo"
                  className="mt-1.5"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="price">Monthly Rent (EGP) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 15000"
                  className="mt-1.5"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Full Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="e.g., 123 Main Street, Building 5, Apt 12"
                className="mt-1.5"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Amenities</h2>
          <AmenitiesSelector
            selectedAmenityIds={selectedAmenityIds}
            onChange={setSelectedAmenityIds}
          />
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Property Images</h2>
          <ImageUploader
            images={imageUrls}
            onImagesChange={setImageUrls}
            onUpload={handleImageUpload}
            maxImages={10}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting || isUploadingImages}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save as Draft'
            )}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting || isUploadingImages}
            className="bg-[#0E56A4] hover:bg-[#0A3F79]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Property'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
