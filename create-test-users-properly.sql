-- Delete existing test users (except hassanahmed533 which works)
DELETE FROM auth.users WHERE email IN (
  'admin@example.com',
  'owner@example.com', 
  'agent@example.com',
  'tenant@example.com'
);

-- Create test users with proper password hashing
-- Note: These INSERT statements will create users with hashed passwords
-- The passwords are: Admin123, Owner123, Agent123, Tenant123

-- Admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  crypt('Admin123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Owner user  
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'owner@example.com',
  crypt('Owner123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Agent user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000000',
  'agent@example.com',
  crypt('Agent123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Tenant user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000000',
  'tenant@example.com',
  crypt('Tenant123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create corresponding profiles for each user
-- First, clean up any existing profiles for these test users
DELETE FROM public.profiles WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004'
);

-- Insert profiles with appropriate roles
INSERT INTO public.profiles (id, email, role, full_name, created_at, updated_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', 'admin', 'Admin User', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'owner@example.com', 'owner', 'Owner User', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'agent@example.com', 'agent', 'Agent User', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'tenant@example.com', 'tenant', 'Tenant User', NOW(), NOW());

-- Verify all users have passwords set
SELECT 
  email,
  CASE 
    WHEN encrypted_password IS NOT NULL AND encrypted_password != '' 
    THEN 'Password Set ✅' 
    ELSE 'No Password ❌' 
  END as password_status,
  email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users 
WHERE email IN (
  'admin@example.com',
  'owner@example.com',
  'agent@example.com',
  'tenant@example.com',
  'hassanahmed533@gmail.com'
)
ORDER BY email;

-- Verify all profiles are created with correct roles
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
