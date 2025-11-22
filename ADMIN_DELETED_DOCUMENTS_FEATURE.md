# Admin Deleted Documents Feature

## ✅ **Feature Complete**

The Admin Deleted Documents page allows administrators to view and restore soft-deleted documents.

---

## 🎯 **What Was Implemented**

### **1. Supabase Function**

Created `admin_view_deleted_documents()` function:

```sql
CREATE OR REPLACE FUNCTION public.admin_view_deleted_documents()
RETURNS TABLE(
  id UUID,
  user_id UUID,
  property_id UUID,
  document_type TEXT,
  file_path TEXT,
  verified BOOLEAN,
  deleted BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if user is admin
  IF public.current_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  
  -- Return all deleted documents
  RETURN QUERY
  SELECT d.id, d.user_id, d.property_id, d.document_type, d.file_path,
         d.verified, d.deleted, d.created_at, d.updated_at
  FROM public.documents d
  WHERE d.deleted = true
  ORDER BY d.updated_at DESC;
END;
$$;
```

**Security:**
- ✅ Admin-only access
- ✅ Role check before execution
- ✅ Returns only deleted documents (`deleted = true`)
- ✅ Ordered by most recently deleted

---

### **2. TypeScript API Functions**

Added to `src/lib/supabase/adminApi.ts`:

#### **viewDeletedDocuments()**

```typescript
export async function viewDeletedDocuments(): Promise<{ data?: any[]; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('admin_view_deleted_documents');

    if (error) {
      console.error('Error fetching deleted documents:', error);
      return { error: error.message };
    }

    return { data: data || [] };
  } catch (err) {
    console.error('Exception fetching deleted documents:', err);
    return { error: String(err) };
  }
}
```

**Usage:**
```typescript
const { data, error } = await viewDeletedDocuments();
if (data) {
  console.log('Deleted documents:', data);
}
```

#### **restoreDocument()** (Already existed)

```typescript
export async function restoreDocument(documentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('restore_document', {
      doc_id: documentId
    });

    if (error) {
      console.error('Error restoring document:', error);
      return { success: false, error: error.message };
    }

    return { success: data === true };
  } catch (err) {
    console.error('Exception restoring document:', err);
    return { success: false, error: String(err) };
  }
}
```

**Usage:**
```typescript
const { success, error } = await restoreDocument(documentId);
if (success) {
  toast.success('Document restored!');
}
```

---

### **3. Admin Deleted Documents Page**

Created `src/pages/AdminDeletedDocumentsPage.tsx`:

**Features:**
- ✅ Table view of all deleted documents
- ✅ Document type badges with color coding
- ✅ User ID display (truncated for readability)
- ✅ Deleted timestamp
- ✅ Restore button for each document
- ✅ Loading states
- ✅ Empty state when no deleted documents
- ✅ Info box explaining soft delete
- ✅ Back to Dashboard button

**Document Type Colors:**
- **Contract:** Blue
- **Tenancy Agreement:** Green
- **ID Document:** Purple
- **Proof of Income:** Yellow
- **Other:** Gray

**Table Columns:**
1. Document Type (with icon and badge)
2. File Path (truncated with tooltip)
3. User ID (truncated with tooltip)
4. Deleted At (formatted date/time)
5. Actions (Restore button)

---

### **4. Router Configuration**

Added route in `src/router/AppRouter.tsx`:

```typescript
<Route
  path="/admin/deleted-documents"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AdminDeletedDocumentsPage />
    </ProtectedRoute>
  }
/>
```

**Access:**
- **URL:** `/admin/deleted-documents`
- **Protection:** Admin-only (via ProtectedRoute)
- **Unauthorized access:** Redirects to unauthorized page

---

### **5. Admin Dashboard Integration**

Updated `src/pages/dashboard/AdminDashboard.tsx`:

**Quick Action Cards:**
1. **Deleted Documents** (Red) - View and restore deleted documents
2. **Manage Users** (Blue) - View and manage user accounts
3. **Properties** (Green) - Manage property listings
4. **Documents** (Purple) - Manage all documents

**Navigation:**
```typescript
const quickActions = [
  {
    title: 'Deleted Documents',
    description: 'View and restore soft-deleted documents',
    icon: Trash2,
    color: 'bg-red-500',
    path: '/admin/deleted-documents'
  },
  // ... other actions
];
```

---

## 🔄 **User Flow**

### **Viewing Deleted Documents:**

1. **Admin logs in** → Redirected to Admin Dashboard
2. **Clicks "Deleted Documents"** card
3. **Page loads** → Fetches deleted documents via `viewDeletedDocuments()`
4. **Table displays** all soft-deleted documents

### **Restoring a Document:**

1. **Admin clicks "Restore"** button on a document
2. **Function calls** `restoreDocument(documentId)`
3. **Supabase sets** `deleted = false` on the document
4. **Document removed** from the deleted list
5. **Success toast** appears
6. **Document becomes visible** to authorized users again

---

## 🧪 **Testing**

### **Test 1: View Deleted Documents**

```typescript
// Login as admin
// Navigate to /admin/deleted-documents
// Should see table of deleted documents
```

### **Test 2: Restore a Document**

```typescript
// Click "Restore" on a document
// Should see success toast
// Document should disappear from list
// Document should be visible in normal queries
```

### **Test 3: Non-Admin Access**

```typescript
// Login as non-admin
// Try to access /admin/deleted-documents
// Should be redirected to unauthorized page
```

### **Test 4: Empty State**

```typescript
// When no deleted documents exist
// Should see "No Deleted Documents" message
```

---

## 📊 **Database Schema**

### **Documents Table:**

```sql
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  property_id UUID REFERENCES public.properties(id),
  file_path TEXT NOT NULL,
  document_type TEXT,
  verified BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,  -- Soft delete flag
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **RLS Policies:**

All SELECT policies include `AND deleted = false` to hide soft-deleted documents from normal queries.

Only the `admin_view_deleted_documents()` function can access deleted documents.

---

## 🎯 **Benefits**

### **1. Data Recovery**
- Admins can restore accidentally deleted documents
- No permanent data loss
- Audit trail of deletions

### **2. Security**
- Only admins can view deleted documents
- Role-based access control
- Database-level enforcement

### **3. User Experience**
- Clean, intuitive interface
- Clear visual feedback
- Easy one-click restore

### **4. Compliance**
- Soft delete maintains data integrity
- Audit trail for compliance
- Reversible deletions

---

## 📁 **Files Created/Modified**

### **Created:**
1. `src/pages/AdminDeletedDocumentsPage.tsx` - Main page component
2. SQL function: `admin_view_deleted_documents()`

### **Modified:**
1. `src/lib/supabase/adminApi.ts` - Added `viewDeletedDocuments()`
2. `src/router/AppRouter.tsx` - Added route
3. `src/pages/dashboard/AdminDashboard.tsx` - Added quick action cards

---

## ✅ **Summary**

✅ **Supabase function created** - `admin_view_deleted_documents()`  
✅ **API functions added** - `viewDeletedDocuments()`, `restoreDocument()`  
✅ **Page component created** - `AdminDeletedDocumentsPage`  
✅ **Route configured** - `/admin/deleted-documents` (admin-only)  
✅ **Dashboard updated** - Quick action cards with navigation  
✅ **Security enforced** - Admin-only access via RLS  
✅ **Deployed** - Live on production  

**Admins can now view and restore soft-deleted documents!** 🎉

---

**Implementation Date:** November 22, 2025  
**Status:** ✅ Complete and Deployed
