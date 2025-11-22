-- =======================================================
-- UPDATED TENANT READ POLICY FOR PROPERTY-IMAGES BUCKET
-- Requires: verified = true AND status = 'available'
-- =======================================================

-- Drop existing policy
DROP POLICY IF EXISTS property_images_tenant_read_verified ON storage.objects;

-- Create updated policy with verified AND available requirement
CREATE POLICY property_images_tenant_read_verified
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'property-images'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text
    FROM public.properties
    WHERE verified = true
      AND status = 'available'
  )
);

-- =======================================================
-- VERIFICATION
-- =======================================================
-- Run this to verify the policy is correct:
-- SELECT policyname, cmd, qual 
-- FROM pg_policies 
-- WHERE schemaname = 'storage' 
--   AND tablename = 'objects' 
--   AND policyname = 'property_images_tenant_read_verified';

-- =======================================================
-- EXPLANATION
-- =======================================================
-- This policy allows tenants to view property images ONLY if:
-- 1. The property is verified (verified = true)
-- 2. The property is available for rent (status = 'available')
--
-- Properties with status = 'rented' or 'maintenance' will NOT be visible to tenants
-- even if they are verified.
--
-- Admin and owner policies remain unchanged.
