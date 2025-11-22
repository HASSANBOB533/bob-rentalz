-- =======================================================
-- CORRECTED TENANT READ POLICY FOR DOCUMENTS BUCKET
-- Restricts tenants to ONLY contract and tenancy agreement documents
-- =======================================================

-- Drop existing (incorrect) tenant read policy
DROP POLICY IF EXISTS documents_tenant_read_contracts ON storage.objects;

-- Create corrected policy that enforces "contracts only" rule
CREATE POLICY documents_tenant_read_contracts
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = (auth.uid())::text
  AND name IN (
    SELECT file_path
    FROM public.documents
    WHERE user_id = auth.uid()
      AND document_type IN ('contract', 'tenancy_agreement')
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
--   AND policyname = 'documents_tenant_read_contracts';

-- =======================================================
-- EXPLANATION
-- =======================================================
-- This policy allows tenants to read storage objects ONLY if:
-- 1. The bucket is 'documents'
-- 2. The folder's first segment matches their user ID (auth.uid())
-- 3. The storage object name matches a file_path in public.documents where:
--    - user_id = auth.uid() (their own documents)
--    - document_type IN ('contract', 'tenancy_agreement') (tenancy documents only)
--
-- This prevents tenants from accessing:
-- - Other users' documents
-- - Their own non-tenancy documents (e.g., 'id_document', 'proof_of_income', etc.)
--
-- Admin and owner policies remain unchanged.
--
-- =======================================================
-- OTHER POLICIES (UNCHANGED)
-- =======================================================
-- - documents_admin_all: Admins can read/write all documents
-- - documents_owner_read_property_docs: Owners can read documents for their properties
-- - documents_user_read_self: General users can read their own documents
-- - documents_user_insert_self: Users can upload their own documents
