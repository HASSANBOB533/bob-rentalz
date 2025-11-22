import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Property {
  id: string;
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
  status: string;
  reference_code: string;
  images: string[];
  amenities: string[];
  verified: boolean;
  featured: boolean;
  created_at: string;
  videoUrl?: string;
  region?: string;
  agentId?: string;
  leaseTerm?: string;
}

/**
 * Transform property data from Supabase with normalized tables to flat structure
 */
function transformPropertyData(data: any[]): Property[] {
  return data.map((property) => ({
    id: property.id,
    title: property.title,
    description: property.description,
    property_type: property.property_type,
    location: property.location,
    address: property.address,
    price: parseFloat(property.price),
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: parseFloat(property.area),
    furnishing: property.furnishing,
    status: property.status,
    reference_code: property.reference_code,
    verified: property.verified,
    featured: property.featured,
    created_at: property.created_at,
    videoUrl: property.video_url,
    // property_images relation
    images:
      property.property_images
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((img: any) => img.image_url) ?? [],
    // property_amenities relation
    amenities:
      property.property_amenities
        ?.map((pa: any) => pa.amenities?.name)
        .filter(Boolean) ?? [],
  }));
}

/**
 * Hook to fetch all available properties
 * For public users: Returns only verified=true and status='available' properties (enforced by RLS)
 * For authenticated users: Returns properties based on their role permissions
 */
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('properties')
        .select(
          `
          *,
          property_images (
            image_url,
            sort_order,
            is_primary
          ),
          property_amenities (
            amenities (
              name,
              icon
            )
          )
        `,
        )
        .in('status', ['available', 'active'])
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProperties(transformPropertyData(data));
      } else {
        // Supabase is the only source of truth → just expose empty list
        console.warn('No properties found in Supabase');
        setProperties([]);
      }
    } catch (err: any) {
      console.error('Error fetching properties from Supabase:', err);
      setError(err.message ?? 'Failed to load properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refetch: fetchProperties };
}

/**
 * Hook to fetch featured properties
 * For public users: Returns only verified=true, status='available', and featured=true properties (enforced by RLS)
 * For authenticated users: Returns featured properties based on their role permissions
 */
export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('properties')
        .select(
          `
          *,
          property_images (
            image_url,
            sort_order,
            is_primary
          ),
          property_amenities (
            amenities (
              name,
              icon
            )
          )
        `,
        )
        .in('status', ['available', 'active'])
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProperties(transformPropertyData(data));
      } else {
        console.warn('No featured properties found in Supabase');
        setProperties([]);
      }
    } catch (err: any) {
      console.error('Error fetching featured properties from Supabase:', err);
      setError(err.message ?? 'Failed to load featured properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProperties();
  }, [fetchFeaturedProperties]);

  return { properties, loading, error, refetch: fetchFeaturedProperties };
}

/**
 * Hook to fetch a single property by ID
 * For public users: Returns property only if verified=true and status='available' (enforced by RLS)
 * For authenticated users: Returns property based on their role permissions
 */
export function useProperty(propertyId: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!propertyId) {
      setLoading(false);
      setProperty(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('properties')
        .select(
          `
          *,
          property_images (
            image_url,
            sort_order,
            is_primary
          ),
          property_amenities (
            amenities (
              name,
              icon
            )
          )
        `,
        )
        .eq('id', propertyId)
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        const [transformed] = transformPropertyData([data]);
        setProperty(transformed);
      } else {
        setProperty(null);
      }
    } catch (err: any) {
      console.error('Error fetching property from Supabase:', err);
      setError(err.message ?? 'Failed to load property');
      setProperty(null);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return { property, loading, error, refetch: fetchProperty };
}
