-- =======================================================
-- OWNER DASHBOARD INQUIRIES RPC FUNCTION
-- Returns inquiry statistics for the current property owner
-- =======================================================

CREATE OR REPLACE FUNCTION public.owner_dashboard_inquiries()
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_build_object(
    'total', COALESCE((
      SELECT COUNT(*)
      FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid()
    ), 0),
    
    'pending', COALESCE((
      SELECT COUNT(*)
      FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid()
        AND i.status = 'pending'
    ), 0),
    
    'contacted', COALESCE((
      SELECT COUNT(*)
      FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid()
        AND i.status = 'contacted'
    ), 0),
    
    'viewing_scheduled', COALESCE((
      SELECT COUNT(*)
      FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid()
        AND i.status = 'viewing_scheduled'
    ), 0),
    
    'closed', COALESCE((
      SELECT COUNT(*)
      FROM public.inquiries i
      JOIN public.properties p ON i.property_id = p.id
      WHERE p.owner_id = auth.uid()
        AND i.status = 'closed'
    ), 0)
  );
$$;

-- =======================================================
-- VERIFICATION
-- =======================================================
-- Test the function (must be logged in as an owner):
-- SELECT owner_dashboard_inquiries();

-- Expected output:
-- {
--   "total": 10,
--   "pending": 5,
--   "contacted": 3,
--   "viewing_scheduled": 1,
--   "closed": 1
-- }

-- =======================================================
-- EXPLANATION
-- =======================================================
-- This function returns a JSON object with inquiry statistics for the current owner.
--
-- It counts inquiries across all properties owned by the current user (auth.uid()).
--
-- The function is STABLE (not SECURITY DEFINER), which means:
-- - It respects RLS policies on the inquiries and properties tables
-- - It only sees data the current user is allowed to see
-- - It cannot bypass security restrictions
--
-- JSON Fields:
-- - total: Total number of inquiries for owner's properties
-- - pending: Inquiries with status = 'pending'
-- - contacted: Inquiries with status = 'contacted'
-- - viewing_scheduled: Inquiries with status = 'viewing_scheduled'
-- - closed: Inquiries with status = 'closed'
--
-- The function uses COALESCE to return 0 instead of NULL when no inquiries exist.
--
-- =======================================================
-- FRONTEND USAGE
-- =======================================================
-- Call from React/TypeScript:
--
-- const { data, error } = await supabase.rpc('owner_dashboard_inquiries');
--
-- if (data) {
--   console.log('Total inquiries:', data.total);
--   console.log('Pending:', data.pending);
--   console.log('Contacted:', data.contacted);
--   console.log('Viewing scheduled:', data.viewing_scheduled);
--   console.log('Closed:', data.closed);
-- }
--
-- =======================================================
-- RELATED FUNCTIONS
-- =======================================================
-- - admin_dashboard_stats(): Admin dashboard statistics
-- - owner_dashboard_stats(): Owner dashboard statistics (general)
-- - tenant_dashboard_stats(): Tenant dashboard statistics
--
-- This function complements owner_dashboard_stats() by providing
-- detailed inquiry breakdowns for property owners.
