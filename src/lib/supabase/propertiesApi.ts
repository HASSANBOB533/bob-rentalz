import { addPropertyAmenities, removeAllPropertyAmenities } from './amenitiesApi';
import { supabase } from './api';

export interface PropertyFormData {
  title: string;
  description: string;
  property_type: string;
  location: string;
  address?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  furnishing?: string;
  status?: 'draft' | 'active' | 'rented' | 'pending';
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  sort_order: number;
  is_primary: boolean;
}

/**
 * Create a new property
 */
export const createProperty = async (
  propertyData: PropertyFormData,
  amenityIds: string[] = [],
  imageUrls: string[] = [],
): Promise<{ id: string }> => {
  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Create property
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert([
        {
          owner_id: user.id,
          title: propertyData.title,
          description: propertyData.description,
          property_type: propertyData.property_type,
          location: propertyData.location,
          address: propertyData.address || null,
          price: propertyData.price,
          bedrooms: propertyData.bedrooms || null,
          bathrooms: propertyData.bathrooms || null,
          area: propertyData.area || null,
          furnishing: propertyData.furnishing || null,
          status: propertyData.status || 'draft',
          // Keep old arrays empty for backward compatibility
          images: [],
          amenities: [],
        },
      ])
      .select('id')
      .single();

    if (propertyError) {
      console.error('Error creating property:', propertyError);
      throw propertyError;
    }

    const propertyId = property.id;

    // Add amenities to property_amenities table
    if (amenityIds.length > 0) {
      await addPropertyAmenities(propertyId, amenityIds);
    }

    // Add images to property_images table
    if (imageUrls.length > 0) {
      const propertyImages = imageUrls.map((url, index) => ({
        property_id: propertyId,
        image_url: url,
        sort_order: index,
        is_primary: index === 0, // First image is primary
      }));

      const { error: imagesError } = await supabase.from('property_images').insert(propertyImages);

      if (imagesError) {
        console.error('Error adding property images:', imagesError);
        throw imagesError;
      }
    }

    return { id: propertyId };
  } catch (error) {
    console.error('Error in createProperty:', error);
    throw error;
  }
};

/**
 * Update an existing property
 */
export const updateProperty = async (
  propertyId: string,
  propertyData: Partial<PropertyFormData>,
  amenityIds?: string[],
  imageUrls?: string[],
): Promise<void> => {
  try {
    // Update property basic info
    const { error: propertyError } = await supabase
      .from('properties')
      .update({
        title: propertyData.title,
        description: propertyData.description,
        property_type: propertyData.property_type,
        location: propertyData.location,
        address: propertyData.address,
        price: propertyData.price,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area,
        furnishing: propertyData.furnishing,
        status: propertyData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', propertyId);

    if (propertyError) {
      console.error('Error updating property:', propertyError);
      throw propertyError;
    }

    // Update amenities if provided
    if (amenityIds !== undefined) {
      await removeAllPropertyAmenities(propertyId);
      if (amenityIds.length > 0) {
        await addPropertyAmenities(propertyId, amenityIds);
      }
    }

    // Update images if provided
    if (imageUrls !== undefined) {
      // Remove all existing images
      const { error: deleteError } = await supabase
        .from('property_images')
        .delete()
        .eq('property_id', propertyId);

      if (deleteError) {
        console.error('Error deleting property images:', deleteError);
        throw deleteError;
      }

      // Add new images
      if (imageUrls.length > 0) {
        const propertyImages = imageUrls.map((url, index) => ({
          property_id: propertyId,
          image_url: url,
          sort_order: index,
          is_primary: index === 0,
        }));

        const { error: imagesError } = await supabase
          .from('property_images')
          .insert(propertyImages);

        if (imagesError) {
          console.error('Error adding property images:', imagesError);
          throw imagesError;
        }
      }
    }
  } catch (error) {
    console.error('Error in updateProperty:', error);
    throw error;
  }
};

/**
 * Get a single property by ID with amenities and images
 */
export const getPropertyById = async (propertyId: string) => {
  try {
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select(
        `
        *,
        property_amenities (
          amenity_id,
          amenities (
            id,
            name,
            icon
          )
        ),
        property_images (
          id,
          image_url,
          sort_order,
          is_primary
        )
      `,
      )
      .eq('id', propertyId)
      .single();

    if (propertyError) {
      console.error('Error fetching property:', propertyError);
      throw propertyError;
    }

    return property;
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    throw error;
  }
};

/**
 * Get all properties for the current user (owner)
 */
export const getMyProperties = async () => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select(
        `
        *,
        property_amenities (
          amenity_id,
          amenities (
            id,
            name,
            icon
          )
        ),
        property_images (
          id,
          image_url,
          sort_order,
          is_primary
        )
      `,
      )
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
      throw propertiesError;
    }

    return properties || [];
  } catch (error) {
    console.error('Error in getMyProperties:', error);
    throw error;
  }
};

/**
 * Delete a property (soft delete by setting status to 'deleted')
 */
export const deleteProperty = async (propertyId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('properties')
      .update({ status: 'deleted' })
      .eq('id', propertyId);

    if (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteProperty:', error);
    throw error;
  }
};

/**
 * Upload property image to Supabase Storage
 */
export const uploadPropertyImage = async (file: File, propertyId?: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = propertyId
      ? `properties/${propertyId}/${fileName}`
      : `properties/temp/${fileName}`;

    const { data, error } = await supabase.storage.from('property-images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('property-images').getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadPropertyImage:', error);
    throw error;
  }
};
