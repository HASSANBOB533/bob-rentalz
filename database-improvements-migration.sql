-- =======================================================
-- BOB RENTALZ - DATABASE IMPROVEMENTS MIGRATION
-- Applied: November 22, 2025
-- =======================================================
-- This migration implements recommended improvements for scalability
-- and feature completeness based on industry best practices.
-- =======================================================

-- =======================================================
-- 1. PERFORMANCE INDEXES
-- =======================================================
-- These indexes significantly improve query performance as data grows

-- Properties table indexes
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_location ON public.properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_verified ON public.properties(verified);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured);

-- Inquiries table indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON public.inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_tenant_id ON public.inquiries(tenant_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- Documents table indexes
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_property_id ON public.documents(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_deleted ON public.documents(deleted);

-- Service requests table indexes
CREATE INDEX IF NOT EXISTS idx_service_requests_property_id ON public.service_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_tenant_id ON public.service_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON public.service_requests(status);

-- =======================================================
-- 2. NORMALIZED AMENITIES STRUCTURE
-- =======================================================
-- Replaces TEXT[] array with proper many-to-many relationship

-- Create amenities table
CREATE TABLE IF NOT EXISTS public.amenities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for property-amenity relationship
CREATE TABLE IF NOT EXISTS public.property_amenities (
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

-- Add indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_property_amenities_property ON public.property_amenities(property_id);
CREATE INDEX IF NOT EXISTS idx_property_amenities_amenity ON public.property_amenities(amenity_id);

-- Enable RLS
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for amenities (public read, admin write)
CREATE POLICY amenities_public_read ON public.amenities
  FOR SELECT TO public USING (true);

CREATE POLICY amenities_admin_write ON public.amenities
  FOR ALL TO authenticated
  USING (current_user_role() = 'admin');

-- RLS Policies for property_amenities (follow property access)
CREATE POLICY property_amenities_public_read ON public.property_amenities
  FOR SELECT TO public USING (true);

CREATE POLICY property_amenities_owner_manage ON public.property_amenities
  FOR ALL TO authenticated
  USING (
    property_id IN (SELECT id FROM properties WHERE owner_id = auth.uid())
  );

-- Insert common amenities
INSERT INTO public.amenities (name, icon) VALUES
  ('Swimming Pool', '🏊'),
  ('Gym', '💪'),
  ('Parking', '🅿️'),
  ('Garden', '🌳'),
  ('Security', '🔒'),
  ('Elevator', '🛗'),
  ('Balcony', '🏡'),
  ('Central AC', '❄️'),
  ('Maid Room', '🧹'),
  ('Beach Access', '🏖️'),
  ('Clubhouse', '🏛️'),
  ('Playground', '🎪'),
  ('Private Terrace', '🌆'),
  ('Jacuzzi', '🛁')
ON CONFLICT (name) DO NOTHING;

-- =======================================================
-- 3. NORMALIZED PROPERTY IMAGES STRUCTURE
-- =======================================================
-- Replaces TEXT[] array with proper table for better image management

-- Create property_images table
CREATE TABLE IF NOT EXISTS public.property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_property_images_property ON public.property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_sort ON public.property_images(property_id, sort_order);

-- Enable RLS
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies (follow property access)
CREATE POLICY property_images_public_read ON public.property_images
  FOR SELECT TO public USING (true);

CREATE POLICY property_images_owner_manage ON public.property_images
  FOR ALL TO authenticated
  USING (
    property_id IN (SELECT id FROM properties WHERE owner_id = auth.uid())
  );

-- =======================================================
-- 4. PAYMENTS TABLE
-- =======================================================
-- Essential for full property management platform

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  tenant_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_for TEXT NOT NULL, -- e.g., 'rent', 'service_fee', 'deposit', 'utilities'
  status TEXT CHECK (status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT, -- e.g., 'credit_card', 'bank_transfer', 'cash'
  transaction_id TEXT,
  due_date DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_payments_property_id ON public.payments(property_id);
CREATE INDEX IF NOT EXISTS idx_payments_tenant_id ON public.payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_owner_id ON public.payments(owner_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON public.payments(due_date);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY payments_admin_all ON public.payments
  FOR ALL TO authenticated
  USING (current_user_role() = 'admin');

CREATE POLICY payments_owner_read ON public.payments
  FOR SELECT TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY payments_tenant_read ON public.payments
  FOR SELECT TO authenticated
  USING (tenant_id = auth.uid());

CREATE POLICY payments_owner_create ON public.payments
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY payments_owner_update ON public.payments
  FOR UPDATE TO authenticated
  USING (owner_id = auth.uid());

-- Add trigger for updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =======================================================
-- MIGRATION COMPLETE
-- =======================================================
-- Summary of improvements:
-- 1. ✅ 14 performance indexes added
-- 2. ✅ Normalized amenities with 14 common amenities pre-loaded
-- 3. ✅ Normalized property images with sort order and primary flag
-- 4. ✅ Payments table with full RLS policies
-- 5. ✅ All new tables have proper RLS and indexes
--
-- Benefits:
-- - Faster queries as data grows (indexes)
-- - Better amenity filtering (e.g., "find properties with pool")
-- - Better image management (sort order, primary image)
-- - Full payment tracking for rent and fees
-- - Maintains security with RLS on all new tables
--
-- Next steps:
-- 1. Update frontend to use new amenities and images tables
-- 2. Migrate existing property amenities/images from TEXT[] arrays
-- 3. Build payment UI for rent collection
-- =======================================================
