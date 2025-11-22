# Security Migration Guide - BOB Rentalz

This document explains the security enhancements made to protect admin-only functions in the BOB Rentalz application.

---

## 🔒 **Security Issue Addressed**

The following functions were previously vulnerable to unauthorized access:

1. **`verify_property(property_id)`** - Could be called by any authenticated user to mark properties as verified
2. **`soft_delete_document(doc_id)`** - Could be called by any authenticated user to delete documents
3. **Dashboard stats functions** - Could expose sensitive data to non-admin users

**Risk:** Any logged-in tenant, owner, or agent could potentially:
- Mark any property as "verified" without admin approval
- Delete documents belonging to other users
- Access admin-level statistics and data

---

## ✅ **Security Fixes Implemented**

### 1. **Role-Based Authorization Checks**

All admin-only functions now include a hard check at the beginning:

```sql
IF public.current_user_role() <> 'admin' THEN
  RAISE EXCEPTION 'Not authorized: Admin access required';
END IF;
```

This ensures that:
- The function immediately checks the user's role
- If the user is not an admin, the function raises an exception
- The operation is aborted before any data is modified

### 2. **Permission Restrictions**

All admin functions have been secured with proper PostgreSQL permissions:

```sql
REVOKE EXECUTE ON FUNCTION public.verify_property(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_property(UUID) TO authenticated;
```

This ensures:
- Anonymous users cannot call these functions
- Only authenticated users can attempt to call them
- The role check inside the function provides the final authorization

### 3. **Helper Function for Role Detection**

A new `current_user_role()` function has been created:

```sql
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid();
  
  RETURN user_role;
END;
$$;
```

This function:
- Safely retrieves the role of the currently authenticated user
- Is used by all other functions to check authorization
- Uses `SECURITY DEFINER` to ensure it runs with the necessary privileges

---

## 📋 **Secure Functions Created**

### **Admin-Only Functions**

1. **`verify_property(property_id UUID)`**
   - Marks a property as verified
   - Only callable by admins
   - Returns `true` if successful

2. **`unverify_property(property_id UUID)`**
   - Marks a property as unverified
   - Only callable by admins
   - Returns `true` if successful

3. **`soft_delete_document(doc_id UUID)`**
   - Soft deletes a document by setting `deleted_at` timestamp
   - Only callable by admins
   - Returns `true` if successful

4. **`restore_document(doc_id UUID)`**
   - Restores a soft-deleted document
   - Only callable by admins
   - Returns `true` if successful

5. **`admin_dashboard_stats()`**
   - Returns comprehensive admin dashboard statistics
   - Only callable by admins
   - Returns JSON with counts of properties, users, inquiries, etc.

6. **`update_user_role(user_id UUID, new_role TEXT)`**
   - Updates a user's role
   - Only callable by admins
   - Validates the new role before updating

### **Role-Specific Functions**

7. **`owner_dashboard_stats()`**
   - Returns owner-specific dashboard statistics
   - Only callable by owners and admins
   - Returns JSON with owner's property counts and inquiries

8. **`tenant_dashboard_stats()`**
   - Returns tenant-specific dashboard statistics
   - Only callable by tenants and admins
   - Returns JSON with tenant's inquiry and service request counts

---

## 🚀 **How to Apply the Migration**

### **Step 1: Run the SQL Migration**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase-security-migration.sql`
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **Run** to execute the migration

### **Step 2: Verify the Functions**

After running the migration, verify that the functions were created:

```sql
-- Check if functions exist
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'current_user_role',
  'verify_property',
  'soft_delete_document',
  'admin_dashboard_stats'
);
```

### **Step 3: Test Authorization**

Test that non-admin users cannot call admin functions:

```sql
-- This should fail if you're not logged in as an admin
SELECT verify_property('some-property-uuid');
```

Expected error: `Not authorized: Admin access required`

---

## 💻 **Using the Secure Functions in Your Code**

### **Import the Admin API**

```typescript
import { adminApi } from '@/lib/supabase/adminApi';
```

### **Example: Verify a Property**

```typescript
const handleVerifyProperty = async (propertyId: string) => {
  const { success, error } = await adminApi.verifyProperty(propertyId);
  
  if (success) {
    console.log('Property verified successfully!');
  } else {
    console.error('Failed to verify property:', error);
  }
};
```

### **Example: Get Admin Dashboard Stats**

```typescript
const loadAdminStats = async () => {
  const { data, error } = await adminApi.getAdminDashboardStats();
  
  if (data) {
    console.log('Admin stats:', data);
  } else {
    console.error('Failed to load stats:', error);
  }
};
```

### **Example: Update User Role**

```typescript
const handleUpdateRole = async (userId: string, newRole: 'admin' | 'owner' | 'agent' | 'tenant') => {
  const { success, error } = await adminApi.updateUserRole(userId, newRole);
  
  if (success) {
    console.log('User role updated successfully!');
  } else {
    console.error('Failed to update role:', error);
  }
};
```

---

## 🛡️ **Security Best Practices**

### **1. Always Check User Roles on the Frontend**

While the backend enforces security, you should also check roles on the frontend to provide a better user experience:

```typescript
import { getCurrentRole } from '@/lib/supabase/api';

const role = await getCurrentRole();

if (role === 'admin') {
  // Show admin-only UI elements
}
```

### **2. Handle Errors Gracefully**

When a non-admin tries to call an admin function, the error message will be clear:

```typescript
const { success, error } = await adminApi.verifyProperty(propertyId);

if (!success && error?.includes('Not authorized')) {
  // Show user-friendly message
  toast.error('You do not have permission to perform this action');
}
```

### **3. Never Expose Admin Functions via Public RPC**

The functions are already protected, but ensure you don't accidentally expose them in public-facing APIs or routes.

---

## 🧪 **Testing the Security**

### **Test 1: Admin Can Call Functions**

1. Log in as an admin user
2. Try calling `adminApi.verifyProperty(propertyId)`
3. Should succeed

### **Test 2: Non-Admin Cannot Call Functions**

1. Log in as a tenant, owner, or agent
2. Try calling `adminApi.verifyProperty(propertyId)`
3. Should fail with "Not authorized" error

### **Test 3: Unauthenticated Users Cannot Call Functions**

1. Log out
2. Try calling any admin function
3. Should fail with authentication error

---

## 📊 **Database Schema Changes**

### **New Tables**

- **`documents`** - Stores user documents with soft delete support

### **New Functions**

- `current_user_role()` - Helper function
- `verify_property(property_id)` - Admin function
- `unverify_property(property_id)` - Admin function
- `soft_delete_document(doc_id)` - Admin function
- `restore_document(doc_id)` - Admin function
- `admin_dashboard_stats()` - Admin function
- `owner_dashboard_stats()` - Owner function
- `tenant_dashboard_stats()` - Tenant function
- `update_user_role(user_id, new_role)` - Admin function

### **New Storage Bucket**

- **`documents`** - Private storage for user documents

---

## ⚠️ **Important Notes**

1. **Existing Data:** This migration does not modify existing data, only adds new functions and tables
2. **Backward Compatibility:** Existing functions remain unchanged
3. **No Breaking Changes:** The migration is additive and does not break existing functionality
4. **Testing Required:** Test all admin functions after applying the migration
5. **Role Assignment:** Ensure at least one user has the 'admin' role before testing

---

## 🔄 **Rollback Instructions**

If you need to rollback this migration:

```sql
-- Drop all created functions
DROP FUNCTION IF EXISTS public.current_user_role();
DROP FUNCTION IF EXISTS public.verify_property(UUID);
DROP FUNCTION IF EXISTS public.unverify_property(UUID);
DROP FUNCTION IF EXISTS public.soft_delete_document(UUID);
DROP FUNCTION IF EXISTS public.restore_document(UUID);
DROP FUNCTION IF EXISTS public.admin_dashboard_stats();
DROP FUNCTION IF EXISTS public.owner_dashboard_stats();
DROP FUNCTION IF EXISTS public.tenant_dashboard_stats();
DROP FUNCTION IF EXISTS public.update_user_role(UUID, TEXT);

-- Drop documents table (if you want to remove it)
DROP TABLE IF EXISTS public.documents;

-- Drop storage bucket (if you want to remove it)
DELETE FROM storage.buckets WHERE id = 'documents';
```

---

## ✅ **Verification Checklist**

After applying the migration, verify:

- [ ] All functions created successfully
- [ ] Admin user can call admin functions
- [ ] Non-admin users cannot call admin functions
- [ ] Error messages are clear and informative
- [ ] Frontend code updated to use new admin API
- [ ] Dashboard stats functions return correct data
- [ ] Document soft delete works correctly
- [ ] Property verification works correctly
- [ ] Role updates work correctly

---

## 📞 **Support**

If you encounter any issues with the security migration:

1. Check the Supabase logs for detailed error messages
2. Verify that your user has the correct role assigned
3. Ensure the migration SQL ran without errors
4. Review the function definitions in the SQL Editor

---

**Migration Created:** November 22, 2025  
**Version:** 1.0  
**Status:** Ready for Production
