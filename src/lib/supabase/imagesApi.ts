import { supabase } from './api';

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  sort_order: number;
  is_primary: boolean;
  created_at?: string;
}

/**
 * Get images for a specific property
 */
export const getPropertyImages = async (propertyId: string): Promise<PropertyImage[]> => {
  const { data, error } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', propertyId)
    .order('sort_order');

  if (error) {
    console.error('Error fetching property images:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get primary image for a property
 */
export const getPrimaryImage = async (propertyId: string): Promise<PropertyImage | null> => {
  const { data, error } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', propertyId)
    .eq('is_primary', true)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned
    console.error('Error fetching primary image:', error);
    throw error;
  }

  return data || null;
};

/**
 * Add images to a property
 */
export const addPropertyImages = async (
  propertyId: string,
  imageUrls: string[],
  primaryIndex: number = 0,
): Promise<void> => {
  const propertyImages = imageUrls.map((url, index) => ({
    property_id: propertyId,
    image_url: url,
    sort_order: index,
    is_primary: index === primaryIndex,
  }));

  const { error } = await supabase.from('property_images').insert(propertyImages);

  if (error) {
    console.error('Error adding property images:', error);
    throw error;
  }
};

/**
 * Remove all images from a property
 */
export const removeAllPropertyImages = async (propertyId: string): Promise<void> => {
  const { error } = await supabase.from('property_images').delete().eq('property_id', propertyId);

  if (error) {
    console.error('Error removing property images:', error);
    throw error;
  }
};

/**
 * Remove a specific image
 */
export const removePropertyImage = async (imageId: string): Promise<void> => {
  const { error } = await supabase.from('property_images').delete().eq('id', imageId);

  if (error) {
    console.error('Error removing property image:', error);
    throw error;
  }
};

/**
 * Update image sort order
 */
export const updateImageSortOrder = async (
  imageId: string,
  newSortOrder: number,
): Promise<void> => {
  const { error } = await supabase
    .from('property_images')
    .update({ sort_order: newSortOrder })
    .eq('id', imageId);

  if (error) {
    console.error('Error updating image sort order:', error);
    throw error;
  }
};

/**
 * Set primary image
 */
export const setPrimaryImage = async (propertyId: string, imageId: string): Promise<void> => {
  // First, unset all primary flags for this property
  const { error: unsetError } = await supabase
    .from('property_images')
    .update({ is_primary: false })
    .eq('property_id', propertyId);

  if (unsetError) {
    console.error('Error unsetting primary images:', unsetError);
    throw unsetError;
  }

  // Then set the new primary image
  const { error: setError } = await supabase
    .from('property_images')
    .update({ is_primary: true })
    .eq('id', imageId);

  if (setError) {
    console.error('Error setting primary image:', setError);
    throw setError;
  }
};

/**
 * Update property images (remove all and add new ones)
 */
export const updatePropertyImages = async (
  propertyId: string,
  imageUrls: string[],
  primaryIndex: number = 0,
): Promise<void> => {
  // Remove all existing images
  await removeAllPropertyImages(propertyId);

  // Add new images
  if (imageUrls.length > 0) {
    await addPropertyImages(propertyId, imageUrls, primaryIndex);
  }
};
