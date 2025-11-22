import { supabase } from './api';

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  created_at?: string;
}

export interface PropertyAmenity {
  property_id: string;
  amenity_id: string;
}

/**
 * Get all available amenities
 */
export const getAllAmenities = async (): Promise<Amenity[]> => {
  const { data, error } = await supabase
    .from('amenities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching amenities:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get amenities for a specific property
 */
export const getPropertyAmenities = async (propertyId: string): Promise<Amenity[]> => {
  const { data, error } = await supabase
    .from('property_amenities')
    .select(`
      amenity_id,
      amenities (
        id,
        name,
        icon
      )
    `)
    .eq('property_id', propertyId);

  if (error) {
    console.error('Error fetching property amenities:', error);
    throw error;
  }

  // Extract amenities from the join result
  return data?.map((item: any) => item.amenities) || [];
};

/**
 * Add amenities to a property
 */
export const addPropertyAmenities = async (
  propertyId: string,
  amenityIds: string[]
): Promise<void> => {
  const propertyAmenities = amenityIds.map(amenityId => ({
    property_id: propertyId,
    amenity_id: amenityId,
  }));

  const { error } = await supabase
    .from('property_amenities')
    .insert(propertyAmenities);

  if (error) {
    console.error('Error adding property amenities:', error);
    throw error;
  }
};

/**
 * Remove all amenities from a property
 */
export const removeAllPropertyAmenities = async (propertyId: string): Promise<void> => {
  const { error } = await supabase
    .from('property_amenities')
    .delete()
    .eq('property_id', propertyId);

  if (error) {
    console.error('Error removing property amenities:', error);
    throw error;
  }
};

/**
 * Update property amenities (remove all and add new ones)
 */
export const updatePropertyAmenities = async (
  propertyId: string,
  amenityIds: string[]
): Promise<void> => {
  // Remove all existing amenities
  await removeAllPropertyAmenities(propertyId);

  // Add new amenities
  if (amenityIds.length > 0) {
    await addPropertyAmenities(propertyId, amenityIds);
  }
};
