-- =====================================================
-- SUPABASE STORAGE SETUP FOR PROPERTY IMAGES
-- =====================================================
-- Run this in Supabase SQL Editor to create storage bucket
-- =====================================================

-- Create storage bucket for property images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Allow anyone to view property images (public bucket)
CREATE POLICY "Anyone can view property images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Allow owners to update their own property images
CREATE POLICY "Owners can update own property images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow owners to delete their own property images
CREATE POLICY "Owners can delete own property images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);
