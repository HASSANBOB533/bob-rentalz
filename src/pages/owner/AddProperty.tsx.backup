import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';
import { Home, Upload, X } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface PropertyFormData {
  title: string;
  description: string;
  property_type: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing: string;
  amenities: string[];
}

const propertyTypes = [
  'Apartment',
  'Villa',
  'Chalet',
  'Studio',
  'Duplex',
  'Penthouse',
  'Townhouse',
  'Twinhouse',
  'Cabin',
  'Loft',
  'Serviced Apartment',
  'Serviced Studio',
];

const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

const availableAmenities = [
  'WiFi',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Security',
  'Elevator',
  'Balcony',
  'Garden',
  'Air Conditioning',
  'Heating',
  'Pets Allowed',
  'Laundry',
  'Storage',
  'Dishwasher',
  'Microwave',
];

export default function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const uploadImages = async (propertyId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Date.now()}-${i}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to add a property');
        return;
      }

      // Generate reference code
      const referenceCode = `BOB-${Date.now().toString().slice(-8)}`;

      // First, create the property record
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          owner_id: user.id,
          title: data.title,
          description: data.description,
          property_type: data.property_type,
          location: data.location,
          address: data.address,
          price: data.price,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          furnishing: data.furnishing,
          amenities: selectedAmenities,
          reference_code: referenceCode,
          status: 'available',
          images: [], // Will update after upload
        })
        .select()
        .single();

      if (propertyError) {
        throw propertyError;
      }

      // Upload images if any
      let imageUrls: string[] = [];
      if (imageFiles.length > 0 && property) {
        imageUrls = await uploadImages(property.id);

        // Update property with image URLs
        const { error: updateError } = await supabase
          .from('properties')
          .update({ images: imageUrls })
          .eq('id', property.id);

        if (updateError) {
          console.error('Error updating images:', updateError);
        }
      }

      // Success! Navigate to properties list
      navigate('/owner/properties');
    } catch (err: any) {
      console.error('Error adding property:', err);
      setError(err.message || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-36 lg:pt-52">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
                <p className="text-gray-600 mt-1">List your property for rent</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Luxury 2BR Apartment in Downtown"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    {...register('property_type', { required: 'Property type is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.property_type && (
                    <p className="mt-1 text-sm text-red-600">{errors.property_type.message}</p>
                  )}
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing *
                  </label>
                  <select
                    {...register('furnishing', { required: 'Furnishing is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select furnishing</option>
                    {furnishingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.furnishing && (
                    <p className="mt-1 text-sm text-red-600">{errors.furnishing.message}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent (AED) *
                  </label>
                  <input
                    type="number"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5000"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    {...register('area', {
                      min: { value: 0, message: 'Area must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1200"
                  />
                  {errors.area && (
                    <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                  )}
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    {...register('bedrooms', {
                      min: { value: 0, message: 'Bedrooms must be 0 or more' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                  />
                  {errors.bedrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
                  )}
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    {...register('bathrooms', {
                      min: { value: 0, message: 'Bathrooms must be 0 or more' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                  />
                  {errors.bathrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location/City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Area *
                  </label>
                  <input
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dubai Marina"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Building name, street, etc."
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <textarea
                {...register('description')}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property, its features, nearby amenities, etc."
              />
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Images</h2>
              <div className="space-y-4">
                {/* Upload Button */}
                <div>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload images (max 10)
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/owner')}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
