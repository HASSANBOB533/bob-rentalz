-- ============================================================================
-- Data Migration Script: TEXT[] Arrays to Normalized Tables
-- ============================================================================
-- This script migrates existing property amenities and images from TEXT[] 
-- arrays to the new normalized amenities and property_images tables.
--
-- Run this script ONCE after deploying the new table structure.
-- ============================================================================

-- Step 1: Migrate property amenities from TEXT[] to property_amenities table
-- ----------------------------------------------------------------------------

DO $$
DECLARE
  prop RECORD;
  amenity_name TEXT;
  amenity_rec RECORD;
BEGIN
  -- Loop through all properties that have amenities in TEXT[] format
  FOR prop IN 
    SELECT id, amenities 
    FROM public.properties 
    WHERE amenities IS NOT NULL AND array_length(amenities, 1) > 0
  LOOP
    -- Loop through each amenity name in the array
    FOREACH amenity_name IN ARRAY prop.amenities
    LOOP
      -- Find the amenity ID by name (case-insensitive match)
      SELECT id INTO amenity_rec
      FROM public.amenities
      WHERE LOWER(name) = LOWER(amenity_name)
      LIMIT 1;

      -- If amenity exists, create the relationship
      IF amenity_rec.id IS NOT NULL THEN
        -- Insert into property_amenities if not already exists
        INSERT INTO public.property_amenities (property_id, amenity_id)
        VALUES (prop.id, amenity_rec.id)
        ON CONFLICT DO NOTHING; -- Avoid duplicates
        
        RAISE NOTICE 'Migrated amenity "%" for property %', amenity_name, prop.id;
      ELSE
        RAISE WARNING 'Amenity "%" not found in amenities table for property %', amenity_name, prop.id;
      END IF;
    END LOOP;
  END LOOP;

  RAISE NOTICE 'Amenities migration completed';
END $$;


-- Step 2: Migrate property images from TEXT[] to property_images table
-- ----------------------------------------------------------------------------

DO $$
DECLARE
  prop RECORD;
  image_url TEXT;
  image_index INT;
BEGIN
  -- Loop through all properties that have images in TEXT[] format
  FOR prop IN 
    SELECT id, images 
    FROM public.properties 
    WHERE images IS NOT NULL AND array_length(images, 1) > 0
  LOOP
    -- Loop through each image URL in the array with index
    FOR image_index IN 1..array_length(prop.images, 1)
    LOOP
      image_url := prop.images[image_index];
      
      -- Insert into property_images
      INSERT INTO public.property_images (property_id, image_url, sort_order, is_primary)
      VALUES (
        prop.id,
        image_url,
        image_index - 1, -- Zero-indexed sort order
        image_index = 1  -- First image is primary
      )
      ON CONFLICT DO NOTHING; -- Avoid duplicates
      
    END LOOP;

    RAISE NOTICE 'Migrated % images for property %', array_length(prop.images, 1), prop.id;
  END LOOP;

  RAISE NOTICE 'Images migration completed';
END $$;


-- Step 3: Verification Queries
-- ----------------------------------------------------------------------------

-- Count properties with amenities in TEXT[] format
SELECT 
  COUNT(*) as properties_with_old_amenities
FROM public.properties
WHERE amenities IS NOT NULL AND array_length(amenities, 1) > 0;

-- Count migrated amenity relationships
SELECT 
  COUNT(*) as migrated_amenity_relationships
FROM public.property_amenities;

-- Count properties with images in TEXT[] format
SELECT 
  COUNT(*) as properties_with_old_images
FROM public.properties
WHERE images IS NOT NULL AND array_length(images, 1) > 0;

-- Count migrated images
SELECT 
  COUNT(*) as migrated_images
FROM public.property_images;

-- Sample: View a property's migrated data
SELECT 
  p.id,
  p.title,
  p.amenities as old_amenities,
  p.images as old_images,
  (
    SELECT array_agg(a.name)
    FROM public.property_amenities pa
    JOIN public.amenities a ON pa.amenity_id = a.id
    WHERE pa.property_id = p.id
  ) as new_amenities,
  (
    SELECT array_agg(pi.image_url ORDER BY pi.sort_order)
    FROM public.property_images pi
    WHERE pi.property_id = p.id
  ) as new_images
FROM public.properties p
LIMIT 5;


-- ============================================================================
-- Optional: Clean up old TEXT[] columns after verification
-- ============================================================================
-- IMPORTANT: Only run this after verifying the migration was successful!
-- Uncomment the lines below to remove the old columns:

-- ALTER TABLE public.properties DROP COLUMN IF EXISTS amenities;
-- ALTER TABLE public.properties DROP COLUMN IF EXISTS images;

-- ============================================================================
-- Migration Complete!
-- ============================================================================
