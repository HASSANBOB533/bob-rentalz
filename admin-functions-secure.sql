-- =====================================================
-- SECURE ADMIN FUNCTIONS FOR BOB RENTALZ
-- =====================================================
-- These functions include admin role checks to prevent
-- unauthorized access. Copy and paste these into your
-- supabase-complete-setup.sql file.
-- =====================================================

-- =====================================================
-- 1. HELPER FUNCTION: current_user_role()
-- =====================================================
-- This function is required by the admin functions below.
-- It returns the role of the currently authenticated user.

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

-- =====================================================
-- 2. ADMIN FUNCTION: verify_property()
-- =====================================================
-- Marks a property as verified.
-- Only admins can call this function.

CREATE OR REPLACE FUNCTION public.verify_property(property_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  
  -- Update the property to mark it as verified
  UPDATE public.properties
  SET verified = true, updated_at = NOW()
  WHERE id = property_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- =====================================================
-- 3. ADMIN FUNCTION: soft_delete_document()
-- =====================================================
-- Soft deletes a document by setting deleted = true.
-- Only admins can call this function.

CREATE OR REPLACE FUNCTION public.soft_delete_document(doc_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  
  -- Soft delete the document by setting deleted = true
  UPDATE public.documents
  SET deleted = true, updated_at = NOW()
  WHERE id = doc_id;
  
  -- Return true if the update was successful
  RETURN FOUND;
END;
$$;

-- =====================================================
-- OPTIONAL: REVOKE/GRANT PERMISSIONS
-- =====================================================
-- These statements ensure only authenticated users can
-- attempt to call these functions. The role check inside
-- each function provides the final authorization.

REVOKE EXECUTE ON FUNCTION public.verify_property(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_property(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.soft_delete_document(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_document(UUID) TO authenticated;

GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;

-- =====================================================
-- USAGE NOTES
-- =====================================================
-- 1. Copy the three function definitions above into your
--    supabase-complete-setup.sql file.
--
-- 2. Run the entire file in Supabase SQL Editor.
--
-- 3. Test with an admin user:
--    SELECT verify_property('some-property-uuid');
--
-- 4. Test with a non-admin user (should fail):
--    SELECT verify_property('some-property-uuid');
--    -- Error: Not authorized
--
-- 5. The functions will only work for users with
--    role = 'admin' in the profiles table.
-- =====================================================
