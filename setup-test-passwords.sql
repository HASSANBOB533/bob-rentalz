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

-- Ensure profiles exist for all test users with correct roles
-- Use UPSERT (INSERT ... ON CONFLICT) to create or update profiles
INSERT INTO public.profiles (id, email, role, full_name, created_at, updated_at)
SELECT 
  u.id,
  u.email,
  CASE 
    WHEN u.email = 'admin@example.com' THEN 'admin'::text
    WHEN u.email = 'owner@example.com' THEN 'owner'::text
    WHEN u.email = 'agent@example.com' THEN 'agent'::text
    WHEN u.email = 'tenant@example.com' THEN 'tenant'::text
    WHEN u.email = 'hassanahmed533@gmail.com' THEN 'admin'::text
  END as role,
  CASE 
    WHEN u.email = 'admin@example.com' THEN 'Admin User'
    WHEN u.email = 'owner@example.com' THEN 'Owner User'
    WHEN u.email = 'agent@example.com' THEN 'Agent User'
    WHEN u.email = 'tenant@example.com' THEN 'Tenant User'
    WHEN u.email = 'hassanahmed533@gmail.com' THEN 'Hassan Ahmed'
  END as full_name,
  NOW() as created_at,
  NOW() as updated_at
FROM auth.users u
WHERE u.email IN (
  'admin@example.com',
  'owner@example.com',
  'agent@example.com',
  'tenant@example.com',
  'hassanahmed533@gmail.com'
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name,
  updated_at = NOW();

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

-- Verify profiles
SELECT 
  id,
  email,
  role,
  full_name
FROM public.profiles
WHERE email IN (
  'admin@example.com',
  'owner@example.com',
  'agent@example.com',
  'tenant@example.com',
  'hassanahmed533@gmail.com'
)
ORDER BY email;
