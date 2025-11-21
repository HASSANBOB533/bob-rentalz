import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { properties as mockProperties } from '../data/mockData';

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
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Use mock data as fallback if Supabase returns empty
      if (!data || data.length === 0) {
        console.log('Using mock properties data');
        setProperties(mockProperties as any);
      } else {
        setProperties(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      console.log('Falling back to mock properties data');
      setError(err.message);
      // Fallback to mock data on error
      setProperties(mockProperties as any);
    } finally {
      setLoading(false);
    }
  }

  return { properties, loading, error, refetch: fetchProperties };
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  async function fetchFeaturedProperties() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      // Use mock data as fallback if Supabase returns empty
      if (!data || data.length === 0) {
        console.log('Using mock featured properties data');
        const featuredMockProperties = mockProperties.filter(p => p.featured).slice(0, 6);
        setProperties(featuredMockProperties as any);
      } else {
        setProperties(data || []);
      }
    } catch (err) {
      console.error('Error fetching featured properties:', err);
      console.log('Falling back to mock featured properties data');
      // Fallback to mock data on error
      const featuredMockProperties = mockProperties.filter(p => p.featured).slice(0, 6);
      setProperties(featuredMockProperties as any);
    } finally {
      setLoading(false);
    }
  }

  return { properties, loading };
}
