-- =====================================================
-- UPDATE STATUS ENUM TO INCLUDE REJECTED
-- =====================================================
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop existing constraint
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS properties_status_check;

-- Add new constraint with all status values
ALTER TABLE properties 
ADD CONSTRAINT properties_status_check 
CHECK (status IN ('available', 'rented', 'maintenance', 'pending_approval', 'rejected'));
