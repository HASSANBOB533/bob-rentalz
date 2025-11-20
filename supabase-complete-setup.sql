-- =====================================================
-- BOB RENTALZ - COMPLETE DATABASE SETUP
-- =====================================================
-- Run this entire script in Supabase SQL Editor
-- =====================================================

-- 1. CREATE PROFILES TABLE (Extended User Info)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('admin', 'owner', 'agent', 'tenant')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- 2. CREATE PROPERTIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT CHECK (property_type IN ('Apartment', 'Villa', 'Chalet', 'Studio', 'Duplex', 'Penthouse', 'Townhouse', 'Twinhouse', 'Cabin', 'Loft', 'Serviced Apartment', 'Serviced Studio')),
  location TEXT NOT NULL,
  address TEXT,
  price DECIMAL(10,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10,2),
  furnishing TEXT CHECK (furnishing IN ('Furnished', 'Semi-Furnished', 'Unfurnished')),
  status TEXT CHECK (status IN ('available', 'rented', 'maintenance')) DEFAULT 'available',
  reference_code TEXT UNIQUE,
  images TEXT[], -- Array of image URLs
  amenities TEXT[], -- Array of amenities
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policies for properties
CREATE POLICY "Anyone can view available properties" ON properties
  FOR SELECT USING (status = 'available' OR auth.uid() = owner_id);

CREATE POLICY "Owners can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = owner_id);

-- =====================================================
-- 3. CREATE INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES profiles(id),
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'responded', 'closed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for inquiries
CREATE POLICY "Users can view own inquiries" ON inquiries
  FOR SELECT USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT owner_id FROM properties WHERE id = property_id
  ));

CREATE POLICY "Tenants can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (auth.uid() = tenant_id);

-- =====================================================
-- 4. CREATE SERVICE REQUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Policies for service requests
CREATE POLICY "Users can view own service requests" ON service_requests
  FOR SELECT USING (auth.uid() = tenant_id OR auth.uid() IN (
    SELECT owner_id FROM properties WHERE id = property_id
  ));

CREATE POLICY "Tenants can create service requests" ON service_requests
  FOR INSERT WITH CHECK (auth.uid() = tenant_id);

-- =====================================================
-- 5. CREATE STORAGE BUCKET FOR PROPERTY IMAGES
-- =====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- 6. INSERT SAMPLE PROPERTIES
-- =====================================================
-- First, create a sample owner (you'll need to sign up first, then update this)
-- For now, we'll insert properties without owner_id (you can update later)

INSERT INTO properties (
  title, description, property_type, location, address, price, 
  bedrooms, bathrooms, area, furnishing, status, reference_code,
  images, amenities, verified, featured
) VALUES
(
  'Modern Villa in New Cairo',
  'Stunning 4-bedroom villa with private garden and pool in the heart of New Cairo. Perfect for families looking for luxury living.',
  'Villa',
  'New Cairo',
  'Fifth Settlement, New Cairo',
  45000.00,
  4,
  3,
  350.00,
  'Furnished',
  'available',
  'MVNC001-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4'
  ],
  ARRAY['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 'Maid Room'],
  true,
  true
),
(
  'Luxurious Apartment in Maadi',
  'Beautiful 3-bedroom apartment in prime Maadi location. Close to schools, restaurants, and metro station.',
  'Apartment',
  'Maadi',
  'Maadi Degla, Cairo',
  28000.00,
  3,
  2,
  200.00,
  'Furnished',
  'available',
  'LAM002-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
  ],
  ARRAY['Balcony', 'Parking', 'Elevator', 'Security', 'Central AC'],
  true,
  true
),
(
  'Beachfront Chalet in North Coast',
  'Amazing 2-bedroom chalet with direct beach access. Fully furnished with modern amenities.',
  'Chalet',
  'North Coast – Sahel',
  'Hacienda Bay, North Coast',
  35000.00,
  2,
  2,
  150.00,
  'Furnished',
  'available',
  'BCNC003-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    'https://images.unsplash.com/photo-1506059612708-99d6c258160e',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
  ],
  ARRAY['Beach Access', 'Swimming Pool', 'Parking', 'Security', 'Garden'],
  true,
  true
),
(
  'Spacious Studio in Zamalek',
  'Cozy studio apartment in the heart of Zamalek. Perfect for young professionals.',
  'Studio',
  'Zamalek',
  'Zamalek, Cairo',
  15000.00,
  1,
  1,
  65.00,
  'Furnished',
  'available',
  'SSZ004-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9'
  ],
  ARRAY['Balcony', 'Elevator', 'Security', 'Central AC'],
  true,
  false
),
(
  'Penthouse in Sheikh Zayed',
  'Luxury 5-bedroom penthouse with panoramic views. Private terrace and premium finishes.',
  'Penthouse',
  'Sheikh Zayed',
  'Beverly Hills, Sheikh Zayed',
  75000.00,
  5,
  4,
  450.00,
  'Furnished',
  'available',
  'PSZ005-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'
  ],
  ARRAY['Private Terrace', 'Parking', 'Elevator', 'Security', 'Gym', 'Swimming Pool', 'Jacuzzi'],
  true,
  true
),
(
  'Townhouse in 6th of October',
  'Modern 3-bedroom townhouse in gated community. Family-friendly neighborhood.',
  'Townhouse',
  '6th of October',
  'Palm Hills, 6th of October',
  32000.00,
  3,
  3,
  220.00,
  'Semi-Furnished',
  'available',
  'T6O006-2024',
  ARRAY[
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
  ],
  ARRAY['Garden', 'Parking', 'Security', 'Clubhouse', 'Playground'],
  true,
  false
);

-- =====================================================
-- 7. CREATE FUNCTION TO UPDATE updated_at TIMESTAMP
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Sign up on your website to create your first user
-- 2. Go to Supabase Authentication tab to see your user
-- 3. Copy your user ID
-- 4. Update properties to assign them to your user:
--    UPDATE properties SET owner_id = 'YOUR_USER_ID_HERE';
-- =====================================================
