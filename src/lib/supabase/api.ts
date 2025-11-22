// =======================================================
// FILE 6 — FRONTEND API LAYER (TYPESCRIPT)
// ALL-IN-ONE FILE (supabaseClient + Types + API functions)
// =======================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// =======================================================
// 1. SUPABASE CLIENT (LAZY INITIALIZATION)
// =======================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables are missing in api.ts!');
      console.error('VITE_SUPABASE_URL:', supabaseUrl);
      console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
      throw new Error('Supabase environment variables are not configured');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully in api.ts');
  }

  return supabaseInstance;
}

// Export a Proxy that lazily initializes the client
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

// =======================================================
// 2. DATABASE TYPES (matches FILE 1 schema)
// =======================================================

export type Role = 'admin' | 'owner' | 'agent' | 'tenant';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  owner_id: string | null;
  title: string;
  description: string | null;
  property_type: string;
  location: string;
  address: string | null;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  furnishing: string | null;
  status: string;
  images: string[];
  amenities: string[];
  reference_code: string | null;
  verified: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  tenant_id: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: string;
  property_id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  category: string | null;
  priority: string;
  status: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  property_id: string | null;
  file_path: string;
  document_type: string;
  verified: boolean;
  created_at: string;
}

// =======================================================
// 3. ROLE RESOLVER
// =======================================================

export async function getCurrentRole(): Promise<Role | null> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  return profile?.role ?? null;
}

// =======================================================
// 4. AUTH HELPERS
// =======================================================

export const authApi = {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp(email: string, password: string, role: Role) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) return { error };

    await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      role,
    });

    return { user: data.user };
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};

// =======================================================
// 5. PROFILES API
// =======================================================

export const profilesApi = {
  async getProfile(id: string) {
    return supabase.from('profiles').select('*').eq('id', id).single();
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    return supabase.from('profiles').update(updates).eq('id', id).single();
  },
};

// =======================================================
// 6. PROPERTIES API
// =======================================================

export const propertiesApi = {
  async getAllVerified() {
    return supabase.from('properties').select('*').eq('verified', true);
  },

  async getMyProperties() {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return { data: [] };

    return supabase.from('properties').select('*').eq('owner_id', user.user.id);
  },

  async getById(id: string) {
    return supabase.from('properties').select('*').eq('id', id).single();
  },

  async create(payload: Partial<Property>) {
    return supabase.from('properties').insert(payload).single();
  },

  async update(id: string, payload: Partial<Property>) {
    return supabase.from('properties').update(payload).eq('id', id).single();
  },
};

// =======================================================
// 7. INQUIRIES API
// =======================================================

export const inquiriesApi = {
  async createInquiry(propertyId: string, message: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return { error: 'Not logged in' };

    return supabase.from('inquiries').insert({
      property_id: propertyId,
      tenant_id: user.user.id,
      message,
    });
  },

  async getMyInquiries() {
    const { data: user } = await supabase.auth.getUser();
    return supabase.from('inquiries').select('*').eq('tenant_id', user.user?.id);
  },

  async getForOwner() {
    return supabase.rpc('owner_dashboard_inquiries');
  },
};

// =======================================================
// 8. SERVICE REQUESTS API
// =======================================================

export const serviceRequestsApi = {
  async create(propertyId: string, payload: Partial<ServiceRequest>) {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return { error: 'Not logged in' };

    return supabase.from('service_requests').insert({
      property_id: propertyId,
      tenant_id: user.user.id,
      ...payload,
    });
  },

  async getMyRequests() {
    const { data: user } = await supabase.auth.getUser();
    return supabase.from('service_requests').select('*').eq('tenant_id', user.user?.id);
  },

  async getForOwner() {
    return supabase.rpc('owner_dashboard_service_requests');
  },
};

// =======================================================
// 9. DOCUMENTS API
// =======================================================

export const documentsApi = {
  async uploadDocument(file: File, documentType: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return { error: 'Not logged in' };

    const filePath = `${user.user.id}/${documentType}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);

    if (uploadError) return { error: uploadError };

    await supabase.from('documents').insert({
      user_id: user.user.id,
      file_path: filePath,
      document_type: documentType,
    });

    return { filePath };
  },

  async getMyDocuments() {
    const { data: user } = await supabase.auth.getUser();
    return supabase.from('documents').select('*').eq('user_id', user.user?.id);
  },
};

// =======================================================
// 10. DASHBOARD API
// =======================================================

export const dashboardApi = {
  async getAdminStats() {
    return supabase.rpc('admin_dashboard_stats');
  },

  async getOwnerStats() {
    return supabase.rpc('owner_dashboard_stats');
  },

  async getTenantStats() {
    return supabase.rpc('tenant_dashboard_stats');
  },
};

// =======================================================
// 11. EXPORT AS SINGLE API OBJECT
// =======================================================

export const api = {
  auth: authApi,
  profiles: profilesApi,
  properties: propertiesApi,
  inquiries: inquiriesApi,
  serviceRequests: serviceRequestsApi,
  documents: documentsApi,
  dashboard: dashboardApi,
};
