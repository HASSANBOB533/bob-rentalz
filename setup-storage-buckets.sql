-- =====================================================
-- SETUP STORAGE BUCKETS FOR PROPERTY MEDIA
-- =====================================================
-- Run this in Supabase SQL Editor to create storage buckets
-- for property images and videos
-- =====================================================

-- Create property-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create property-videos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-videos',
  'property-videos',
  true,
  104857600, -- 100MB limit
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE POLICIES FOR PROPERTY IMAGES
-- =====================================================

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Allow public to view images
CREATE POLICY "Public can view property images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Allow owners to update their own property images
CREATE POLICY "Owners can update their property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow owners to delete their own property images
CREATE POLICY "Owners can delete their property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- STORAGE POLICIES FOR PROPERTY VIDEOS
-- =====================================================

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload property videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-videos');

-- Allow public to view videos
CREATE POLICY "Public can view property videos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-videos');

-- Allow owners to update their own property videos
CREATE POLICY "Owners can update their property videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow owners to delete their own property videos
CREATE POLICY "Owners can delete their property videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if buckets were created
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id IN ('property-images', 'property-videos');

-- Check storage policies
SELECT policyname, tablename, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'objects'
AND policyname LIKE '%property%';
