import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Lazy initialization - create client only when first accessed
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables are missing!');
      console.error('VITE_SUPABASE_URL:', supabaseUrl);
      console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
      throw new Error('Supabase environment variables are not configured');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  }

  return supabaseInstance;
}

// Export a getter function instead of the client directly
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

// Type definitions for your database
export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: 'admin' | 'owner' | 'agent' | 'tenant';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  owner_id: string;
  title: string;
  description?: string;
  property_type: string;
  location: string;
  address?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished';
  status: 'available' | 'rented' | 'maintenance';
  images?: string[];
  amenities?: string[];
  reference_code?: string;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  property_id: string;
  tenant_id: string;
  message?: string;
  status: 'pending' | 'contacted' | 'viewing_scheduled' | 'closed';
  created_at: string;
  updated_at: string;
};

export type ServiceRequest = {
  id: string;
  property_id: string;
  tenant_id: string;
  title: string;
  description?: string;
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  images?: string[];
  created_at: string;
  updated_at: string;
};
