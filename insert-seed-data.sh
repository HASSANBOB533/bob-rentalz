#!/bin/bash

# Insert remaining properties
echo "Inserting properties..."

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO properties (id, owner_id, title, description, property_type, location, address, price, bedrooms, bathrooms, area, furnishing, status, reference_code, images, amenities, verified, featured) VALUES ('\''11111111-0000-0000-0000-000000000003'\'', '\''00000000-0000-0000-0000-000000000002'\'', '\''Family Home with Garden'\'', '\''Spacious 4-bedroom villa with private garden and pool.'\'', '\''Villa'\'', '\''New Cairo'\'', '\''789 Garden St, New Cairo'\'', 12000, 4, 3, 250, '\''Semi-Furnished'\'', '\''occupied'\'', '\''REF-2024-003'\'', ARRAY['\''https://images.unsplash.com/photo-1564013799919-ab600027ffc6'\''], ARRAY['\''Garden'\'', '\''Pool'\'', '\''Parking'\'', '\''Security'\''], TRUE, TRUE);"}'

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO properties (id, owner_id, title, description, property_type, location, address, price, bedrooms, bathrooms, area, furnishing, status, reference_code, images, amenities, verified, featured) VALUES ('\''11111111-0000-0000-0000-000000000004'\'', '\''00000000-0000-0000-0000-000000000002'\'', '\''Modern Penthouse Downtown'\'', '\''Luxury penthouse with panoramic city views.'\'', '\''Penthouse'\'', '\''Downtown Cairo'\'', '\''101 Sky Tower, Downtown'\'', 18000, 3, 2, 180, '\''Fully Furnished'\'', '\''available'\'', '\''REF-2024-004'\'', ARRAY['\''https://images.unsplash.com/photo-1512917774080-9991f1c4c750'\''], ARRAY['\''Gym'\'', '\''Pool'\'', '\''Concierge'\'', '\''Parking'\''], TRUE, TRUE);"}'

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO properties (id, owner_id, title, description, property_type, location, address, price, bedrooms, bathrooms, area, furnishing, status, reference_code, images, amenities, verified, featured) VALUES ('\''11111111-0000-0000-0000-000000000005'\'', '\''00000000-0000-0000-0000-000000000002'\'', '\''Affordable 2BR Apartment'\'', '\''Great value apartment in a quiet neighborhood.'\'', '\''Apartment'\'', '\''Heliopolis'\'', '\''234 Quiet St, Heliopolis'\'', 5500, 2, 1, 90, '\''Unfurnished'\'', '\''available'\'', '\''REF-2024-005'\'', ARRAY['\''https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'\''], ARRAY['\''Elevator'\'', '\''Security'\''], TRUE, FALSE);"}'

echo "Inserting inquiries..."

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO inquiries (id, property_id, user_id, message, status, created_at) VALUES ('\''22222222-0000-0000-0000-000000000002'\'', '\''11111111-0000-0000-0000-000000000002'\'', '\''00000000-0000-0000-0000-000000000004'\'', '\''Can I schedule a viewing for this weekend?'\'', '\''responded'\'', NOW() - INTERVAL '\''5 days'\'');"}'

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO inquiries (id, property_id, user_id, message, status, created_at) VALUES ('\''22222222-0000-0000-0000-000000000003'\'', '\''11111111-0000-0000-0000-000000000004'\'', '\''00000000-0000-0000-0000-000000000004'\'', '\''Is the penthouse pet-friendly?'\'', '\''pending'\'', NOW() - INTERVAL '\''1 day'\'');"}'

echo "Inserting payments..."

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO payments (id, property_id, tenant_id, amount, payment_date, payment_method, status, payment_type, created_at) VALUES ('\''33333333-0000-0000-0000-000000000001'\'', '\''11111111-0000-0000-0000-000000000003'\'', '\''00000000-0000-0000-0000-000000000004'\'', 12000, NOW() - INTERVAL '\''5 days'\'', '\''bank_transfer'\'', '\''completed'\'', '\''rent'\'', NOW() - INTERVAL '\''5 days'\'');"}'

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO payments (id, property_id, tenant_id, amount, payment_date, payment_method, status, payment_type, created_at) VALUES ('\''33333333-0000-0000-0000-000000000002'\'', '\''11111111-0000-0000-0000-000000000003'\'', '\''00000000-0000-0000-0000-000000000004'\'', 12000, NOW() - INTERVAL '\''35 days'\'', '\''bank_transfer'\'', '\''completed'\'', '\''rent'\'', NOW() - INTERVAL '\''35 days'\'');"}'

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "INSERT INTO payments (id, property_id, tenant_id, amount, payment_date, payment_method, status, payment_type, created_at) VALUES ('\''33333333-0000-0000-0000-000000000003'\'', '\''11111111-0000-0000-0000-000000000003'\'', '\''00000000-0000-0000-0000-000000000004'\'', 12000, NOW() + INTERVAL '\''25 days'\'', '\''bank_transfer'\'', '\''pending'\'', '\''rent'\'', NOW());"}'

echo "Done! Verifying counts..."

manus-mcp-cli tool call execute_sql --server supabase --input '{"project_id": "ptjttzbtmyklfvwrdhdb", "query": "SELECT '\''Properties'\'' as table_name, COUNT(*) as count FROM properties UNION ALL SELECT '\''Inquiries'\'', COUNT(*) FROM inquiries UNION ALL SELECT '\''Payments'\'', COUNT(*) FROM payments UNION ALL SELECT '\''Documents'\'', COUNT(*) FROM documents;"}'
