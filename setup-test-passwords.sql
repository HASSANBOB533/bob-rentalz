-- ============================================
-- Setup Test User Passwords for BOB Rentalz
-- ============================================
-- Run this in Supabase SQL Editor to set passwords for test accounts

-- Update admin user
UPDATE auth.users
SET 
  encrypted_password = crypt('Admin123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmation_token = '',
  recovery_token = '',
  email_change_token_new = '',
  email_change = ''
WHERE email = 'admin@example.com';

-- Update owner user
UPDATE auth.users
SET 
  encrypted_password = crypt('Owner123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmation_token = '',
  recovery_token = '',
  email_change_token_new = '',
  email_change = ''
WHERE email = 'owner@example.com';

-- Update agent user
UPDATE auth.users
SET 
  encrypted_password = crypt('Agent123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmation_token = '',
  recovery_token = '',
  email_change_token_new = '',
  email_change = ''
WHERE email = 'agent@example.com';

-- Update tenant user
UPDATE auth.users
SET 
  encrypted_password = crypt('Tenant123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmation_token = '',
  recovery_token = '',
  email_change_token_new = '',
  email_change = ''
WHERE email = 'tenant@example.com';

-- Update Hassan's admin account
UPDATE auth.users
SET 
  encrypted_password = crypt('Admin123', gen_salt('bf')),
  email_confirmed_at = NOW()
WHERE email = 'hassanahmed533@gmail.com';

-- Verify the updates
SELECT 
  id,
  email,
  email_confirmed_at,
  CASE 
    WHEN encrypted_password IS NOT NULL AND encrypted_password != '' THEN 'Password Set ✅'
    ELSE 'No Password ❌'
  END as password_status
FROM auth.users
WHERE email IN (
  'admin@example.com',
  'owner@example.com',
  'agent@example.com',
  'tenant@example.com',
  'hassanahmed533@gmail.com'
)
ORDER BY email;
