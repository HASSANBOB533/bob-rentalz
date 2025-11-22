import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { AmenitiesSelector } from '../components/property/AmenitiesSelector';
import { ImageUploader } from '../components/property/ImageUploader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { createProperty, uploadPropertyImage } from '../lib/supabase/propertiesApi';

export function ListPropertyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
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
    location: '',
    address: '',
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

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.title || !formData.location || !formData.propertyType) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (step === 2) {
      if (!formData.bedrooms || !formData.bathrooms || !formData.price) {
        toast.error('Please fill in all required fields');
        return;
      }
    }

    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.propertyType ||
      !formData.bedrooms ||
      !formData.price ||
      !formData.location
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
        location: formData.location,
        address: formData.address || undefined,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms === 'studio' ? 0 : parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: formData.area ? parseFloat(formData.area) : undefined,
        furnishing: formData.furnishing || undefined,
        status: 'draft' as const, // Public form submissions start as draft
      };

      await createProperty(propertyData, selectedAmenityIds, imageUrls);

      setSubmitted(true);
      toast.success('Property submitted successfully!');
    } catch (error: any) {
      console.error('Error creating property:', error);
      toast.error(error.message || 'Failed to submit property');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-[#E5E7EB] max-w-2xl mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Property Submitted Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for listing your property with BOB Rentalz. Our team will review your
            submission and contact you within 24-48 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  title: '',
                  description: '',
                  propertyType: '',
                  bedrooms: '',
                  bathrooms: '',
                  area: '',
                  furnishing: '',
                  price: '',
                  location: '',
                  address: '',
                });
                setSelectedAmenityIds([]);
                setImageUrls([]);
              }}
              variant="outline"
            >
              List Another Property
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">List Your Property</h1>
            <p className="text-gray-600">
              Fill out the form below to list your property with BOB Rentalz
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      s <= step ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        s < step ? 'bg-[#D4AF37]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Basic Info</span>
              <span className="text-sm text-gray-600">Details</span>
              <span className="text-sm text-gray-600">Features</span>
              <span className="text-sm text-gray-600">Media</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Basic Information</h3>

                  <div>
                    <label className="block font-medium mb-2">Property Title *</label>
                    <Input
                      required
                      placeholder="e.g., Modern Villa in New Cairo"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Location *</label>
                      <Input
                        required
                        placeholder="e.g., New Cairo, Cairo"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Property Type *</label>
                      <Select
                        required
                        value={formData.propertyType}
                        onValueChange={(value) => handleInputChange('propertyType', value)}
                      >
                        <SelectTrigger>
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
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Full Address</label>
                    <Input
                      placeholder="e.g., 123 Main Street, Building 5"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Description *</label>
                    <Textarea
                      required
                      placeholder="Describe your property in detail..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Property Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Bedrooms *</label>
                      <Select
                        required
                        value={formData.bedrooms}
                        onValueChange={(value) => handleInputChange('bedrooms', value)}
                      >
                        <SelectTrigger>
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
                      <label className="block font-medium mb-2">Bathrooms *</label>
                      <Select
                        required
                        value={formData.bathrooms}
                        onValueChange={(value) => handleInputChange('bathrooms', value)}
                      >
                        <SelectTrigger>
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

                    <div>
                      <label className="block font-medium mb-2">Area (sqm)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 120"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Furnishing</label>
                      <Select
                        value={formData.furnishing}
                        onValueChange={(value) => handleInputChange('furnishing', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select furnishing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furnished">Fully Furnished</SelectItem>
                          <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                          <SelectItem value="unfurnished">Unfurnished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Monthly Rent (EGP) *</label>
                      <Input
                        required
                        type="number"
                        placeholder="e.g., 15000"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Features (Amenities) */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Property Features</h3>
                  <AmenitiesSelector
                    selectedAmenityIds={selectedAmenityIds}
                    onChange={setSelectedAmenityIds}
                  />
                </div>
              )}

              {/* Step 4: Media (Images) */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Property Images</h3>
                  <ImageUploader
                    images={imageUrls}
                    onImagesChange={setImageUrls}
                    onUpload={handleImageUpload}
                    maxImages={10}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || isUploadingImages}
                    className="ml-auto bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Property'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
