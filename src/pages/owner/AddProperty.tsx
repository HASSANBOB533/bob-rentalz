import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';
import { Home, Upload, X, MapPin, Video } from 'lucide-react';
import { MapPicker } from '../../components/MapPicker';

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
  latitude?: number;
  longitude?: number;
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

// Expanded amenities list
const availableAmenities = [
  // Basic
  'WiFi',
  'Parking',
  'Elevator',
  'Security 24/7',
  'CCTV',
  'Intercom',
  'Central AC',
  'Central Heating',
  
  // Kitchen
  'Kitchen Appliances',
  'Dishwasher',
  'Microwave',
  'Refrigerator',
  'Oven',
  'Gas Stove',
  
  // Laundry
  'Washing Machine',
  'Dryer',
  'Laundry Room',
  
  // Outdoor
  'Balcony',
  'Terrace',
  'Garden',
  'Private Pool',
  'Shared Pool',
  'BBQ Area',
  'Outdoor Seating',
  
  // Facilities
  'Gym',
  'Sauna',
  'Steam Room',
  'Spa',
  'Kids Play Area',
  'Sports Court',
  'Jogging Track',
  'Concierge Service',
  "Maid's Room",
  'Storage Room',
  'Study Room',
  
  // Utilities
  'Water',
  'Electricity',
  'Gas',
  'Internet',
  'Cable TV',
  
  // Pet Friendly
  'Pets Allowed',
  'Pet Park',
  
  // Accessibility
  'Wheelchair Accessible',
  'Disabled Access',
  
  // Views
  'Sea View',
  'City View',
  'Garden View',
  'Pool View',
  'Mountain View',
  
  // Other
  'Furnished',
  'Unfurnished',
  'Smart Home',
  'Solar Panels',
  'Generator',
  'Fire Alarm',
  'Sprinkler System',
];

export default function AddPropertyEnhanced() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PropertyFormData>();

  // Watch address field for changes
  const addressValue = watch('address');
  const locationValue = watch('location');

  // Get user's current location for map
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to Dubai coordinates
          setMapLocation({ lat: 25.2048, lng: 55.2708 });
        }
      );
    } else {
      // Default to Dubai coordinates
      setMapLocation({ lat: 25.2048, lng: 55.2708 });
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 20) {
      setError('Maximum 20 images allowed');
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit
      setError('Video file must be less than 100MB');
      return;
    }

    setVideoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
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

      const {
        data: { publicUrl },
      } = supabase.storage.from('property-images').getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const uploadVideo = async (propertyId: string): Promise<string | null> => {
    if (!videoFile) return null;

    const fileExt = videoFile.name.split('.').pop();
    const fileName = `${propertyId}/video-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('property-videos')
      .upload(fileName, videoFile);

    if (error) {
      console.error('Error uploading video:', error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('property-videos').getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to add a property');
        return;
      }

      const referenceCode = `BOB-${Date.now().toString().slice(-8)}`;

      // Create property with "pending_approval" status
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
          status: 'pending_approval', // Changed from 'available'
          verified: false,
          latitude: mapLocation?.lat,
          longitude: mapLocation?.lng,
          images: [],
          video_url: null,
        })
        .select()
        .single();

      if (propertyError) {
        throw propertyError;
      }

      // Upload images
      let imageUrls: string[] = [];
      if (imageFiles.length > 0 && property) {
        imageUrls = await uploadImages(property.id);
      }

      // Upload video
      let videoUrl: string | null = null;
      if (videoFile && property) {
        videoUrl = await uploadVideo(property.id);
      }

      // Update property with media URLs
      if (property && (imageUrls.length > 0 || videoUrl)) {
        const { error: updateError } = await supabase
          .from('properties')
          .update({
            images: imageUrls,
            video_url: videoUrl,
          })
          .eq('id', property.id);

        if (updateError) {
          console.error('Error updating media:', updateError);
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
                <p className="text-gray-600 mt-1">
                  List your property for rent (pending admin approval)
                </p>
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

              {/* Map Location Picker */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Pin Location on Map
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Click on the map to set the exact location of your property
                  {mapLocation && (
                    <span className="ml-2 text-blue-600 font-medium">
                      ({mapLocation.lat.toFixed(6)}, {mapLocation.lng.toFixed(6)})
                    </span>
                  )}
                </p>
                <MapPicker
                  initialLat={mapLocation?.lat}
                  initialLng={mapLocation?.lng}
                  onLocationSelect={(lat, lng) => {
                    setMapLocation({ lat, lng });
                  }}
                />
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

            {/* Amenities - Expanded */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Amenities ({selectedAmenities.length} selected)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2 border rounded-lg">
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
                <div>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload images (max 20)
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

            {/* Video Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                <Video className="inline w-5 h-5 mr-2" />
                Property Video (Optional)
              </h2>
              <div className="space-y-4">
                {!videoPreview ? (
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="text-center">
                      <Video className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload property video
                      </p>
                      <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-64 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/dashboard/owner')}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0A3F79] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#0E56A4', color: '#ffffff' }}
              >
                {loading ? 'Submitting for Approval...' : 'Submit for Approval'}
              </button>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your property will be reviewed by our admin team before
                being published. You'll be notified once it's approved.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
