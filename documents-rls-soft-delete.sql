-- =======================================================
-- UPDATED RLS POLICIES FOR DOCUMENTS TABLE
-- Add deleted = false filter to hide soft-deleted documents
-- =======================================================

-- Drop existing SELECT policies
DROP POLICY IF EXISTS documents_admin_read_all ON public.documents;
DROP POLICY IF EXISTS documents_user_read_self ON public.documents;
DROP POLICY IF EXISTS documents_owner_read_property_docs ON public.documents;
DROP POLICY IF EXISTS documents_tenant_read_limited ON public.documents;

-- =======================================================
-- 1. ADMIN READ ALL DOCUMENTS (non-deleted only)
-- =======================================================
CREATE POLICY documents_admin_read_all
ON public.documents
FOR SELECT
TO authenticated
USING (
  current_user_role() = 'admin'
  AND deleted = false
);

-- =======================================================
-- 2. USERS READ THEIR OWN DOCUMENTS (non-deleted only)
-- =======================================================
CREATE POLICY documents_user_read_self
ON public.documents
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  AND deleted = false
);

-- =======================================================
-- 3. OWNERS READ DOCUMENTS RELATED TO THEIR PROPERTIES (non-deleted only)
-- =======================================================
CREATE POLICY documents_owner_read_property_docs
ON public.documents
FOR SELECT
TO authenticated
USING (
  property_id IN (
    SELECT id FROM public.properties
    WHERE owner_id = auth.uid()
  )
  AND deleted = false
);

-- =======================================================
-- 4. TENANTS READ LIMITED TENANCY DOCUMENTS (non-deleted only)
-- =======================================================
CREATE POLICY documents_tenant_read_limited
ON public.documents
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  AND document_type IN ('contract', 'tenancy_agreement')
  AND deleted = false
);

-- =======================================================
-- VERIFICATION QUERY
-- =======================================================
-- Run this to verify the policies are updated:
-- SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'documents' AND cmd = 'SELECT';
