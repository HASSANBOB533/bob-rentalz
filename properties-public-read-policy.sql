-- =======================================================
-- PUBLIC READ ACCESS POLICY FOR PROPERTIES TABLE
-- Allows unauthenticated users to view verified & available properties
-- =======================================================

-- Create public read policy for verified and available properties
CREATE POLICY properties_public_read_available
ON public.properties
FOR SELECT
TO anon
USING (
  verified = true
  AND status = 'available'
);

-- =======================================================
-- VERIFICATION
-- =======================================================
-- Run this to verify the policy is correct:
-- SELECT policyname, cmd, roles, qual 
-- FROM pg_policies 
-- WHERE schemaname = 'public' 
--   AND tablename = 'properties' 
--   AND policyname = 'properties_public_read_available';

-- =======================================================
-- EXPLANATION
-- =======================================================
-- This policy allows unauthenticated (anon) users to view properties ONLY if:
-- 1. The property is verified (verified = true)
-- 2. The property is available for rent (status = 'available')
--
-- This enables public browsing of property listings on the landing page
-- without requiring users to log in.
--
-- Properties with status = 'rented' or 'maintenance', or properties that are
-- not verified, will NOT be visible to unauthenticated users.
--
-- =======================================================
-- SUPABASE ROLES EXPLAINED
-- =======================================================
-- In Supabase, there are two built-in roles for unauthenticated users:
--
-- 1. `anon` (anonymous) - The recommended role for unauthenticated users
--    - This is the role used by the Supabase client when no user is logged in
--    - Use `TO anon` for policies that should apply to unauthenticated users
--
-- 2. `public` - A PostgreSQL built-in role
--    - In Supabase, `public` includes both `anon` and `authenticated` roles
--    - Use `TO public` if you want the policy to apply to EVERYONE (both logged in and logged out)
--
-- For this use case, we use `TO anon` because:
-- - We want to allow unauthenticated users to browse listings
-- - Authenticated users already have access via other policies
-- - Using `anon` is more explicit and follows Supabase best practices
--
-- =======================================================
-- EXISTING POLICIES (UNCHANGED)
-- =======================================================
-- The following policies remain unchanged and continue to work:
--
-- 1. properties_admin_read_all (authenticated, admin only)
--    - Admins can read all properties regardless of status
--
-- 2. properties_owner_read_self (authenticated, owner only)
--    - Owners can read their own properties regardless of status
--
-- 3. properties_tenant_read_verified (authenticated, tenants)
--    - Authenticated tenants can read all verified properties
--    - (Note: This is broader than the public policy, which also requires status = 'available')
--
-- This new policy is ADDITIVE - it doesn't weaken any existing access controls.
-- It only adds read access for unauthenticated users to a specific subset of properties.
--
-- =======================================================
-- FRONTEND USAGE
-- =======================================================
-- Now your public landing page can fetch properties without authentication:
--
-- const { data: properties } = await supabase
--   .from('properties')
--   .select('*')
--   .eq('status', 'available')
--   .eq('featured', true);
--
-- This will work for unauthenticated users because the RLS policy
-- automatically filters to verified = true AND status = 'available'.
