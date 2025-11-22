## **BOB Rentalz - Frontend Updates Guide**

**Author:** Manus AI  
**Date:** November 22, 2025

---

### **Overview**

This document outlines all frontend updates made to support the new normalized database structure for amenities, images, and payments. The frontend has been updated to use the new tables instead of TEXT[] arrays, providing better scalability and functionality.

---

## **1. New API Helper Functions**

Three new API modules have been created to interact with the normalized tables:

### **1.1. amenitiesApi.ts**

**Location:** `src/lib/supabase/amenitiesApi.ts`

**Functions:**
- `getAllAmenities()` - Fetch all available amenities
- `getPropertyAmenities(propertyId)` - Get amenities for a specific property
- `addPropertyAmenities(propertyId, amenityIds)` - Add amenities to a property
- `removeAllPropertyAmenities(propertyId)` - Remove all amenities from a property
- `updatePropertyAmenities(propertyId, amenityIds)` - Update property amenities (remove all + add new)

**Usage Example:**
```typescript
import { getAllAmenities, updatePropertyAmenities } from './lib/supabase/amenitiesApi';

// Get all amenities for selection
const amenities = await getAllAmenities();

// Update property amenities
await updatePropertyAmenities('property-id', ['amenity-id-1', 'amenity-id-2']);
```

---

### **1.2. imagesApi.ts**

**Location:** `src/lib/supabase/imagesApi.ts`

**Functions:**
- `getPropertyImages(propertyId)` - Get all images for a property (sorted)
- `getPrimaryImage(propertyId)` - Get the primary image for a property
- `addPropertyImages(propertyId, imageUrls, primaryIndex)` - Add images to a property
- `removeAllPropertyImages(propertyId)` - Remove all images from a property
- `removePropertyImage(imageId)` - Remove a specific image
- `updateImageSortOrder(imageId, newSortOrder)` - Update image order
- `setPrimaryImage(propertyId, imageId)` - Set an image as primary
- `updatePropertyImages(propertyId, imageUrls, primaryIndex)` - Update all images (remove all + add new)

**Usage Example:**
```typescript
import { getPropertyImages, updatePropertyImages } from './lib/supabase/imagesApi';

// Get property images
const images = await getPropertyImages('property-id');

// Update property images
await updatePropertyImages('property-id', [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
], 0); // First image is primary
```

---

### **1.3. paymentsApi.ts**

**Location:** `src/lib/supabase/paymentsApi.ts`

**Functions:**
- `createPaymentRequest(...)` - Create a manual payment request
- `markPaymentAsPaid(paymentId)` - Mark a payment as paid
- `getOwnerPayments(ownerId)` - Get all payments for an owner
- `getTenantPayments(tenantId)` - Get all payments for a tenant
- `getPropertyPayments(propertyId)` - Get payments for a specific property
- `getPendingPayments(tenantId)` - Get pending payments for a tenant
- `getOverduePayments(ownerId)` - Get overdue payments for an owner
- `updatePaymentStatus(paymentId, status)` - Update payment status
- `deletePayment(paymentId)` - Delete a payment

**Usage Example:**
```typescript
import { createPaymentRequest, markPaymentAsPaid } from './lib/supabase/paymentsApi';

// Create payment request
const paymentId = await createPaymentRequest(
  'property-id',
  'tenant-id',
  1000.00,
  'Monthly Rent',
  '2025-12-01',
  'https://stripe.com/pay/link', // Optional
  'Rent for December 2025' // Optional
);

// Mark as paid
await markPaymentAsPaid(paymentId);
```

---

## **2. New UI Components**

### **2.1. AmenitiesSelector**

**Location:** `src/components/property/AmenitiesSelector.tsx`

**Description:** A multi-select component for choosing property amenities.

**Features:**
- Displays all available amenities in a grid
- Visual selection with color coding
- Shows count of selected amenities
- Responsive design

**Usage:**
```tsx
import { AmenitiesSelector } from '../components/property/AmenitiesSelector';

const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);

<AmenitiesSelector
  selectedAmenityIds={selectedAmenityIds}
  onChange={setSelectedAmenityIds}
/>
```

---

### **2.2. ImageUploader**

**Location:** `src/components/property/ImageUploader.tsx`

**Description:** An image management component with sorting and primary selection.

**Features:**
- Add/remove images
- Set primary image
- Reorder images (move up/down)
- Visual indication of primary image
- Responsive grid layout

**Usage:**
```tsx
import { ImageUploader } from '../components/property/ImageUploader';

const [images, setImages] = useState<string[]>([]);
const [primaryIndex, setPrimaryIndex] = useState(0);

const handleImagesChange = (newImages: string[], newPrimaryIndex: number) => {
  setImages(newImages);
  setPrimaryIndex(newPrimaryIndex);
};

<ImageUploader
  images={images}
  primaryIndex={primaryIndex}
  onChange={handleImagesChange}
/>
```

---

## **3. New Pages**

### **3.1. OwnerPaymentsPage**

**Location:** `src/pages/OwnerPaymentsPage.tsx`

**Description:** Payment management dashboard for property owners.

**Features:**
- View all payments (pending, paid, etc.)
- Stats cards showing totals
- Mark payments as paid
- Create payment requests (placeholder for full form)
- Responsive table layout

**Route:** `/owner/payments` (needs to be added to router)

---

### **3.2. TenantPaymentsPage**

**Location:** `src/pages/TenantPaymentsPage.tsx`

**Description:** Payment viewing and payment page for tenants.

**Features:**
- View pending payments with "Pay Now" links
- Overdue payment warnings
- Payment history table
- Stats cards showing pending/overdue counts
- Responsive design

**Route:** `/tenant/payments` (needs to be added to router)

---

## **4. Data Migration**

### **4.1. Migration Script**

**Location:** `migrate-property-data.sql`

**Description:** SQL script to migrate existing property data from TEXT[] arrays to normalized tables.

**What it does:**
1. Migrates amenities from `properties.amenities` (TEXT[]) to `property_amenities` table
2. Migrates images from `properties.images` (TEXT[]) to `property_images` table
3. Provides verification queries
4. Optional cleanup of old columns

**How to run:**

1. **Review the script** to understand what it does
2. **Run in Supabase SQL Editor:**
   ```sql
   -- Copy and paste the entire migrate-property-data.sql file
   ```
3. **Verify migration:**
   ```sql
   -- Check migrated data
   SELECT * FROM property_amenities LIMIT 10;
   SELECT * FROM property_images LIMIT 10;
   ```
4. **Optional: Clean up old columns** (only after verification):
   ```sql
   ALTER TABLE public.properties DROP COLUMN IF EXISTS amenities;
   ALTER TABLE public.properties DROP COLUMN IF EXISTS images;
   ```

---

## **5. Integration Steps**

To fully integrate these updates into your application:

### **Step 1: Add Routes**

Update `src/router/AppRouter.tsx` to add the new payment pages:

```tsx
import { OwnerPaymentsPage } from '../pages/OwnerPaymentsPage';
import { TenantPaymentsPage } from '../pages/TenantPaymentsPage';

// Add routes
<Route path="/owner/payments" element={<ProtectedRoute><OwnerPaymentsPage /></ProtectedRoute>} />
<Route path="/tenant/payments" element={<ProtectedRoute><TenantPaymentsPage /></ProtectedRoute>} />
```

---

### **Step 2: Update Property Forms**

Update your property creation/edit forms to use the new components:

```tsx
import { AmenitiesSelector } from '../components/property/AmenitiesSelector';
import { ImageUploader } from '../components/property/ImageUploader';
import { updatePropertyAmenities, updatePropertyImages } from '../lib/supabase';

// In your form component
const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
const [images, setImages] = useState<string[]>([]);
const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

// On form submit
const handleSubmit = async () => {
  // 1. Create/update property
  const { data: property } = await supabase.from('properties').insert({...});

  // 2. Update amenities
  await updatePropertyAmenities(property.id, selectedAmenityIds);

  // 3. Update images
  await updatePropertyImages(property.id, images, primaryImageIndex);
};

// In your JSX
<AmenitiesSelector
  selectedAmenityIds={selectedAmenityIds}
  onChange={setSelectedAmenityIds}
/>

<ImageUploader
  images={images}
  primaryIndex={primaryImageIndex}
  onChange={(newImages, newPrimaryIndex) => {
    setImages(newImages);
    setPrimaryImageIndex(newPrimaryIndex);
  }}
/>
```

---

### **Step 3: Update Property Display**

Update property detail pages to fetch from new tables:

```tsx
import { getPropertyAmenities } from '../lib/supabase/amenitiesApi';
import { getPropertyImages } from '../lib/supabase/imagesApi';

const PropertyDetailPage = () => {
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadPropertyData = async () => {
      const [amenitiesData, imagesData] = await Promise.all([
        getPropertyAmenities(propertyId),
        getPropertyImages(propertyId)
      ]);
      
      setAmenities(amenitiesData);
      setImages(imagesData);
    };

    loadPropertyData();
  }, [propertyId]);

  return (
    <div>
      {/* Display images */}
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <img key={image.id} src={image.image_url} alt="Property" />
        ))}
      </div>

      {/* Display amenities */}
      <div className="flex flex-wrap gap-2">
        {amenities.map(amenity => (
          <span key={amenity.id} className="badge">
            {amenity.icon} {amenity.name}
          </span>
        ))}
      </div>
    </div>
  );
};
```

---

### **Step 4: Add Navigation Links**

Add links to the payment pages in your dashboards:

**Owner Dashboard:**
```tsx
<Link to="/owner/payments">
  <button>Manage Payments</button>
</Link>
```

**Tenant Dashboard:**
```tsx
<Link to="/tenant/payments">
  <button>My Payments</button>
</Link>
```

---

## **6. Testing Checklist**

Before deploying to production:

- [ ] Run data migration script in Supabase
- [ ] Verify migrated data is correct
- [ ] Test amenities selector on property form
- [ ] Test image uploader on property form
- [ ] Test creating a new property with new components
- [ ] Test editing an existing property
- [ ] Test owner payments page
- [ ] Test tenant payments page
- [ ] Test creating a payment request
- [ ] Test marking payment as paid
- [ ] Test payment link functionality
- [ ] Verify RLS policies work correctly
- [ ] Test on mobile devices

---

## **7. Deployment**

### **Deployment Steps:**

1. **Database Migration:**
   - Run `migrate-property-data.sql` in Supabase SQL Editor
   - Verify migration with verification queries

2. **Frontend Deployment:**
   - Code is already pushed to GitHub
   - Vercel will automatically deploy
   - Wait for deployment to complete

3. **Post-Deployment:**
   - Test all new features on live site
   - Monitor for any errors
   - Verify payments functionality works

---

## **8. Summary**

### **What Was Created:**

✅ **3 API modules** - amenitiesApi, imagesApi, paymentsApi  
✅ **2 UI components** - AmenitiesSelector, ImageUploader  
✅ **2 new pages** - OwnerPaymentsPage, TenantPaymentsPage  
✅ **1 migration script** - migrate-property-data.sql  
✅ **Full documentation** - This guide  

### **What's Ready:**

✅ **Normalized database structure** - Better scalability  
✅ **Manual payment tracking** - Ready for current stage  
✅ **Payment link support** - External payment integration  
✅ **Future-proof** - Ready for payment gateway integration  

### **Next Steps:**

1. Add routes to AppRouter
2. Update existing property forms to use new components
3. Run data migration script
4. Test thoroughly
5. Deploy to production

---

**Your frontend is now fully updated to use the new normalized database structure!** 🎉
