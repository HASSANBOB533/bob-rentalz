-- =====================================================
-- BOB RENTALZ - SECURITY MIGRATION
-- =====================================================
-- This migration adds secure admin-only functions with proper role checks
-- Run this in Supabase SQL Editor AFTER the main setup
-- =====================================================

-- =====================================================
-- 1. CREATE HELPER FUNCTION TO GET CURRENT USER ROLE
-- =====================================================
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Get the role of the currently authenticated user
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid();
  
  RETURN user_role;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;

-- =====================================================
-- 2. CREATE ADMIN-ONLY FUNCTION: VERIFY PROPERTY
-- =====================================================
CREATE OR REPLACE FUNCTION public.verify_property(property_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Update the property to mark it as verified
  UPDATE public.properties
  SET verified = true, updated_at = NOW()
  WHERE id = property_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.verify_property(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_property(UUID) TO authenticated;

-- =====================================================
-- 3. CREATE ADMIN-ONLY FUNCTION: UNVERIFY PROPERTY
-- =====================================================
CREATE OR REPLACE FUNCTION public.unverify_property(property_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Update the property to mark it as unverified
  UPDATE public.properties
  SET verified = false, updated_at = NOW()
  WHERE id = property_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.unverify_property(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.unverify_property(UUID) TO authenticated;

-- =====================================================
-- 4. CREATE DOCUMENTS TABLE (IF NOT EXISTS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  document_type TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Policies for documents
CREATE POLICY "Users can view own documents" ON public.documents
  FOR SELECT USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can insert own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 5. CREATE ADMIN-ONLY FUNCTION: SOFT DELETE DOCUMENT
-- =====================================================
CREATE OR REPLACE FUNCTION public.soft_delete_document(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Soft delete the document by setting deleted_at timestamp
  UPDATE public.documents
  SET deleted_at = NOW(), updated_at = NOW()
  WHERE id = doc_id AND deleted_at IS NULL;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.soft_delete_document(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_document(UUID) TO authenticated;

-- =====================================================
-- 6. CREATE ADMIN-ONLY FUNCTION: RESTORE DOCUMENT
-- =====================================================
CREATE OR REPLACE FUNCTION public.restore_document(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Restore the document by clearing deleted_at timestamp
  UPDATE public.documents
  SET deleted_at = NULL, updated_at = NOW()
  WHERE id = doc_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.restore_document(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.restore_document(UUID) TO authenticated;

-- =====================================================
-- 7. CREATE ADMIN-ONLY FUNCTION: GET DASHBOARD STATS
-- =====================================================
CREATE OR REPLACE FUNCTION public.admin_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSON;
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Build the stats JSON object
  SELECT json_build_object(
    'total_properties', (SELECT COUNT(*) FROM public.properties),
    'verified_properties', (SELECT COUNT(*) FROM public.properties WHERE verified = true),
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'total_owners', (SELECT COUNT(*) FROM public.profiles WHERE role = 'owner'),
    'total_agents', (SELECT COUNT(*) FROM public.profiles WHERE role = 'agent'),
    'total_tenants', (SELECT COUNT(*) FROM public.profiles WHERE role = 'tenant'),
    'pending_inquiries', (SELECT COUNT(*) FROM public.inquiries WHERE status = 'pending'),
    'pending_service_requests', (SELECT COUNT(*) FROM public.service_requests WHERE status = 'pending')
  ) INTO stats;
  
  RETURN stats;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.admin_dashboard_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_dashboard_stats() TO authenticated;

-- =====================================================
-- 8. CREATE OWNER-ONLY FUNCTION: GET DASHBOARD STATS
-- =====================================================
CREATE OR REPLACE FUNCTION public.owner_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSON;
  user_role TEXT;
BEGIN
  -- Get the current user's role
  user_role := public.current_user_role();
  
  -- Check if the current user is an owner or admin
  IF user_role NOT IN ('owner', 'admin') THEN
    RAISE EXCEPTION 'Not authorized: Owner access required';
  END IF;
  
  -- Build the stats JSON object for the current owner
  SELECT json_build_object(
    'my_properties', (SELECT COUNT(*) FROM public.properties WHERE owner_id = auth.uid()),
    'available_properties', (SELECT COUNT(*) FROM public.properties WHERE owner_id = auth.uid() AND status = 'available'),
    'rented_properties', (SELECT COUNT(*) FROM public.properties WHERE owner_id = auth.uid() AND status = 'rented'),
    'pending_inquiries', (
      SELECT COUNT(*) FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid() AND i.status = 'pending'
    ),
    'pending_service_requests', (
      SELECT COUNT(*) FROM public.service_requests sr
      JOIN public.properties p ON sr.property_id = p.id
      WHERE p.owner_id = auth.uid() AND sr.status = 'pending'
    )
  ) INTO stats;
  
  RETURN stats;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.owner_dashboard_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.owner_dashboard_stats() TO authenticated;

-- =====================================================
-- 9. CREATE TENANT-ONLY FUNCTION: GET DASHBOARD STATS
-- =====================================================
CREATE OR REPLACE FUNCTION public.tenant_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSON;
  user_role TEXT;
BEGIN
  -- Get the current user's role
  user_role := public.current_user_role();
  
  -- Check if the current user is a tenant or admin
  IF user_role NOT IN ('tenant', 'admin') THEN
    RAISE EXCEPTION 'Not authorized: Tenant access required';
  END IF;
  
  -- Build the stats JSON object for the current tenant
  SELECT json_build_object(
    'my_inquiries', (SELECT COUNT(*) FROM public.inquiries WHERE tenant_id = auth.uid()),
    'pending_inquiries', (SELECT COUNT(*) FROM public.inquiries WHERE tenant_id = auth.uid() AND status = 'pending'),
    'my_service_requests', (SELECT COUNT(*) FROM public.service_requests WHERE tenant_id = auth.uid()),
    'pending_service_requests', (SELECT COUNT(*) FROM public.service_requests WHERE tenant_id = auth.uid() AND status = 'pending')
  ) INTO stats;
  
  RETURN stats;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.tenant_dashboard_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.tenant_dashboard_stats() TO authenticated;

-- =====================================================
-- 10. CREATE ADMIN-ONLY FUNCTION: UPDATE USER ROLE
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_user_role(user_id UUID, new_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;
  
  -- Validate the new role
  IF new_role NOT IN ('admin', 'owner', 'agent', 'tenant') THEN
    RAISE EXCEPTION 'Invalid role: Must be admin, owner, agent, or tenant';
  END IF;
  
  -- Update the user's role
  UPDATE public.profiles
  SET role = new_role, updated_at = NOW()
  WHERE id = user_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- Revoke public access and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.update_user_role(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_user_role(UUID, TEXT) TO authenticated;

-- =====================================================
-- 11. CREATE STORAGE BUCKET FOR DOCUMENTS (IF NOT EXISTS)
-- =====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents
CREATE POLICY "Users can view own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- SECURITY MIGRATION COMPLETE!
-- =====================================================
-- Summary of secure admin functions:
-- 1. current_user_role() - Helper to get current user's role
-- 2. verify_property(property_id) - Admin-only property verification
-- 3. unverify_property(property_id) - Admin-only property unverification
-- 4. soft_delete_document(doc_id) - Admin-only soft delete
-- 5. restore_document(doc_id) - Admin-only restore
-- 6. admin_dashboard_stats() - Admin-only dashboard stats
-- 7. owner_dashboard_stats() - Owner-only dashboard stats
-- 8. tenant_dashboard_stats() - Tenant-only dashboard stats
-- 9. update_user_role(user_id, new_role) - Admin-only role management
--
-- All functions include role checks and will raise exceptions
-- if called by unauthorized users.
-- =====================================================
