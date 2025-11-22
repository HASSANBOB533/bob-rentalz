# RLS Soft Delete Implementation - Documents Table

## ✅ **Implementation Complete**

Soft-deleted documents are now **invisible** to all users via Row Level Security (RLS) policies.

---

## 🎯 **What Was Implemented**

### **Updated RLS Policies:**

All **SELECT policies** on the `public.documents` table now include `AND deleted = false` filter:

1. ✅ **`documents_admin_read_all`** - Admins can only see non-deleted documents
2. ✅ **`documents_user_read_self`** - Users can only see their own non-deleted documents
3. ✅ **`documents_owner_read_property_docs`** - Owners can only see non-deleted property documents
4. ✅ **`documents_tenant_read_limited`** - Tenants can only see non-deleted contracts/agreements

---

## 📋 **Policy Details**

### **1. Admin Read All Documents**

```sql
CREATE POLICY documents_admin_read_all
ON public.documents
FOR SELECT
TO authenticated
USING (
  current_user_role() = 'admin'
  AND deleted = false
);
```

**Before:** Admins could see all documents including deleted ones  
**After:** Admins can only see non-deleted documents

---

### **2. Users Read Their Own Documents**

```sql
CREATE POLICY documents_user_read_self
ON public.documents
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  AND deleted = false
);
```

**Before:** Users could see all their documents including deleted ones  
**After:** Users can only see their own non-deleted documents

---

### **3. Owners Read Property Documents**

```sql
CREATE POLICY documents_owner_read_property_docs
ON public.documents
FOR SELECT
TO authenticated
USING (
  property_id IN (
    SELECT id FROM public.properties
    WHERE owner_id = auth.uid()
  )
  AND deleted = false
);
```

**Before:** Owners could see all property documents including deleted ones  
**After:** Owners can only see non-deleted property documents

---

### **4. Tenants Read Limited Documents**

```sql
CREATE POLICY documents_tenant_read_limited
ON public.documents
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  AND document_type IN ('contract', 'tenancy_agreement')
  AND deleted = false
);
```

**Before:** Tenants could see their contracts/agreements including deleted ones  
**After:** Tenants can only see non-deleted contracts/agreements

---

## 🔒 **Security Guarantee**

### **What Happens When a Document is Soft-Deleted:**

1. **Admin calls** `soft_delete_document(doc_id)`
2. **Database sets** `deleted = true` on the document
3. **RLS policies filter** the document out of all SELECT queries
4. **Result:** Document becomes **invisible** to all users

### **Who Can See Deleted Documents:**

- ❌ **Admins:** Cannot see deleted documents
- ❌ **Owners:** Cannot see deleted documents
- ❌ **Agents:** Cannot see deleted documents
- ❌ **Tenants:** Cannot see deleted documents
- ❌ **Anyone:** Cannot see deleted documents via normal queries

### **How to Restore a Deleted Document:**

Only admins can restore documents using the `restore_document()` function:

```typescript
import { restoreDocument } from '@/lib/supabase/adminApi';

// Admin only
const result = await restoreDocument(documentId);
```

This sets `deleted = false` and the document becomes visible again.

---

## 🧪 **Testing the Implementation**

### **Test 1: Soft Delete a Document**

```sql
-- As admin, soft delete a document
SELECT soft_delete_document('some-document-uuid');
-- Returns: true
```

### **Test 2: Verify Document is Invisible**

```sql
-- Try to query the document
SELECT * FROM documents WHERE id = 'some-document-uuid';
-- Returns: 0 rows (even for admins!)
```

### **Test 3: Restore the Document**

```sql
-- As admin, restore the document
SELECT restore_document('some-document-uuid');
-- Returns: true

-- Now query again
SELECT * FROM documents WHERE id = 'some-document-uuid';
-- Returns: 1 row (document is visible again)
```

---

## 📊 **Verification**

### **Check Current Policies:**

```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'documents' AND cmd = 'SELECT'
ORDER BY policyname;
```

**Expected Result:**

| policyname | cmd | qual |
|------------|-----|------|
| documents_admin_read_all | SELECT | `(current_user_role() = 'admin') AND (deleted = false)` |
| documents_owner_read_property_docs | SELECT | `(property_id IN (...)) AND (deleted = false)` |
| documents_tenant_read_limited | SELECT | `(user_id = auth.uid()) AND (...) AND (deleted = false)` |
| documents_user_read_self | SELECT | `(user_id = auth.uid()) AND (deleted = false)` |

✅ **All policies include** `AND (deleted = false)`

---

## 🎯 **Use Cases**

### **1. Admin Deletes a Tenant's Document**

```typescript
// Admin dashboard
const handleDelete = async (documentId: string) => {
  const { success } = await softDeleteDocument(documentId);
  
  if (success) {
    // Document is now invisible to everyone
    toast.success('Document deleted successfully');
  }
};
```

**Result:**
- Document is marked as `deleted = true`
- Tenant can no longer see the document
- Owner can no longer see the document
- Admin can no longer see the document (via normal queries)

### **2. Admin Restores a Document**

```typescript
// Admin dashboard
const handleRestore = async (documentId: string) => {
  const { success } = await restoreDocument(documentId);
  
  if (success) {
    // Document is now visible again
    toast.success('Document restored successfully');
  }
};
```

**Result:**
- Document is marked as `deleted = false`
- Document becomes visible to authorized users again

---

## ⚠️ **Important Notes**

### **1. Soft Delete vs Hard Delete**

- **Soft Delete:** Sets `deleted = true`, document remains in database but invisible
- **Hard Delete:** Permanently removes document from database (not implemented)

### **2. INSERT/UPDATE Policies Unchanged**

Only **SELECT policies** were modified. INSERT and UPDATE policies remain unchanged:

- ✅ `documents_user_insert_self` - Users can insert their own documents
- ✅ Other INSERT/UPDATE policies - Not affected

### **3. Admin Access to Deleted Documents**

If admins need to view deleted documents for audit purposes, create a separate function:

```sql
CREATE FUNCTION admin_view_deleted_documents()
RETURNS SETOF documents
SECURITY DEFINER
AS $$
BEGIN
  IF current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  
  RETURN QUERY SELECT * FROM documents WHERE deleted = true;
END;
$$ LANGUAGE plpgsql;
```

---

## ✅ **Summary**

✅ **RLS policies updated** - All SELECT policies include `deleted = false`  
✅ **Soft-deleted documents invisible** - Cannot be queried by anyone  
✅ **Admin functions working** - `soft_delete_document()` and `restore_document()`  
✅ **Database-level enforcement** - Cannot be bypassed  
✅ **Applied to Supabase** - Live in production database  
✅ **Documented** - SQL file in repository  

**Soft-deleted documents are now completely invisible via RLS!** 🎉

---

**Implementation Date:** November 22, 2025  
**Status:** ✅ Complete and Active
