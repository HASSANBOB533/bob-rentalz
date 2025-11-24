-- =====================================================
-- ADD VIDEO, LOCATION, AND APPROVAL STATUS TO PROPERTIES
-- =====================================================
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add video_url column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Add latitude and longitude for map location
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Update status enum to include pending_approval
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS properties_status_check;

ALTER TABLE properties 
ADD CONSTRAINT properties_status_check 
CHECK (status IN ('available', 'rented', 'maintenance', 'pending_approval'));

-- Create property-videos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-videos', 'property-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for videos
CREATE POLICY "Authenticated users can upload property videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-videos');

CREATE POLICY "Anyone can view property videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-videos');

CREATE POLICY "Owners can update own property videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Owners can delete own property videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_properties_location 
ON properties(latitude, longitude);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_properties_status 
ON properties(status);

-- Add comment
COMMENT ON COLUMN properties.video_url IS 'URL to property video tour';
COMMENT ON COLUMN properties.latitude IS 'Property latitude coordinate';
COMMENT ON COLUMN properties.longitude IS 'Property longitude coordinate';
