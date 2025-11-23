-- Seed data for BOB Rentalz dashboards
-- This adds test properties, inquiries, and payments for all test users

-- Get user IDs (for reference)
-- owner@example.com: 00000000-0000-0000-0000-000000000002
-- agent@example.com: 00000000-0000-0000-0000-000000000003
-- tenant@example.com: 00000000-0000-0000-0000-000000000004
-- admin@example.com: 00000000-0000-0000-0000-000000000001

-- Insert additional properties for owner@example.com
INSERT INTO properties (
  id,
  owner_id,
  title,
  description,
  property_type,
  location,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  furnishing,
  status,
  reference_code,
  images,
  amenities,
  verified,
  featured
) VALUES
-- Property 2
(
  '11111111-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'Cozy Studio Near Campus',
  'Perfect for students, close to universities and public transport.',
  'Studio',
  'Nasr City',
  '456 University Ave, Nasr City',
  3500,
  1,
  1,
  45,
  'Furnished',
  'available',
  'REF-2024-002',
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
  ARRAY['WiFi', 'AC', 'Parking'],
  TRUE,
  FALSE
),
-- Property 3
(
  '11111111-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'Family Home with Garden',
  'Spacious 4-bedroom villa with private garden and pool.',
  'Villa',
  'New Cairo',
  '789 Garden St, New Cairo',
  12000,
  4,
  3,
  250,
  'Semi-Furnished',
  'occupied',
  'REF-2024-003',
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6'],
  ARRAY['Garden', 'Pool', 'Parking', 'Security'],
  TRUE,
  TRUE
),
-- Property 4
(
  '11111111-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000002',
  'Modern Penthouse Downtown',
  'Luxury penthouse with panoramic city views.',
  'Penthouse',
  'Downtown Cairo',
  '101 Sky Tower, Downtown',
  18000,
  3,
  2,
  180,
  'Fully Furnished',
  'available',
  'REF-2024-004',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
  ARRAY['Gym', 'Pool', 'Concierge', 'Parking'],
  TRUE,
  TRUE
),
-- Property 5
(
  '11111111-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000002',
  'Affordable 2BR Apartment',
  'Great value apartment in a quiet neighborhood.',
  'Apartment',
  'Heliopolis',
  '234 Quiet St, Heliopolis',
  5500,
  2,
  1,
  90,
  'Unfurnished',
  'available',
  'REF-2024-005',
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
  ARRAY['Elevator', 'Security'],
  TRUE,
  FALSE
);

-- Insert inquiries from tenant@example.com
INSERT INTO inquiries (
  id,
  property_id,
  user_id,
  message,
  status,
  created_at
) VALUES
(
  '22222222-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000004',
  'I am interested in viewing this property. Is it still available?',
  'pending',
  NOW() - INTERVAL '2 days'
),
(
  '22222222-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000004',
  'Can I schedule a viewing for this weekend?',
  'responded',
  NOW() - INTERVAL '5 days'
),
(
  '22222222-0000-0000-0000-000000000003',
  '11111111-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000004',
  'Is the penthouse pet-friendly?',
  'pending',
  NOW() - INTERVAL '1 day'
);

-- Insert payments for occupied property
INSERT INTO payments (
  id,
  property_id,
  tenant_id,
  amount,
  payment_date,
  payment_method,
  status,
  payment_type,
  created_at
) VALUES
(
  '33333333-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  12000,
  NOW() - INTERVAL '5 days',
  'bank_transfer',
  'completed',
  'rent',
  NOW() - INTERVAL '5 days'
),
(
  '33333333-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  12000,
  NOW() - INTERVAL '35 days',
  'bank_transfer',
  'completed',
  'rent',
  NOW() - INTERVAL '35 days'
),
(
  '33333333-0000-0000-0000-000000000003',
  '11111111-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  12000,
  NOW() + INTERVAL '25 days',
  'bank_transfer',
  'pending',
  'rent',
  NOW()
);

-- Insert documents
INSERT INTO documents (
  id,
  property_id,
  user_id,
  document_type,
  file_name,
  file_url,
  created_at
) VALUES
(
  '44444444-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  'lease_agreement',
  'lease-family-home.pdf',
  'https://example.com/documents/lease-family-home.pdf',
  NOW() - INTERVAL '60 days'
),
(
  '44444444-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'property_deed',
  'deed-luxury-apartment.pdf',
  'https://example.com/documents/deed-luxury-apartment.pdf',
  NOW() - INTERVAL '90 days'
);

-- Verify the seed data
SELECT 'Properties' as table_name, COUNT(*) as count FROM properties
UNION ALL
SELECT 'Inquiries', COUNT(*) FROM inquiries
UNION ALL
SELECT 'Payments', COUNT(*) FROM payments
UNION ALL
SELECT 'Documents', COUNT(*) FROM documents;
