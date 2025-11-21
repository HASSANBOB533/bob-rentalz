import { createClient } from '@supabase/supabase-js'

console.log('RAW ENV:', import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'SET' : 'MISSING')

// Log environment variables for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase Environment Variables:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'SET' : 'MISSING',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'SET' : 'MISSING'
  })
}

// Create Supabase client with fallback values to prevent app crash
// If env vars are missing, the client will be created but API calls will fail gracefully
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)

// Type definitions for your database
export type Profile = {
  id: string
  email: string
  full_name?: string
  phone?: string
  role: 'admin' | 'owner' | 'agent' | 'tenant'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Property = {
  id: string
  owner_id: string
  title: string
  description?: string
  property_type: string
  location: string
  address?: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished'
  status: 'available' | 'rented' | 'maintenance'
  images?: string[]
  amenities?: string[]
  reference_code?: string
  created_at: string
  updated_at: string
}

export type Inquiry = {
  id: string
  property_id: string
  tenant_id: string
  message?: string
  status: 'pending' | 'contacted' | 'viewing_scheduled' | 'closed'
  created_at: string
  updated_at: string
}

export type ServiceRequest = {
  id: string
  property_id: string
  tenant_id: string
  title: string
  description?: string
  category?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  images?: string[]
  created_at: string
  updated_at: string
}
