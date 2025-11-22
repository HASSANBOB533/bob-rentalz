// =======================================================
// ADMIN API - Secure Admin-Only Functions
// =======================================================
// This file contains TypeScript wrappers for secure admin functions
// All functions include server-side role checks
// =======================================================

import { supabase } from './api';

// =======================================================
// 1. PROPERTY VERIFICATION
// =======================================================

/**
 * Verify a property (Admin only)
 * @param propertyId - UUID of the property to verify
 * @returns Promise with success status
 */
export async function verifyProperty(propertyId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('verify_property', {
      property_id: propertyId
    });

    if (error) {
      console.error('Error verifying property:', error);
      return { success: false, error: error.message };
    }

    return { success: data === true };
  } catch (err) {
    console.error('Exception verifying property:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * Unverify a property (Admin only)
 * @param propertyId - UUID of the property to unverify
 * @returns Promise with success status
 */
export async function unverifyProperty(propertyId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('unverify_property', {
      property_id: propertyId
    });

    if (error) {
      console.error('Error unverifying property:', error);
      return { success: false, error: error.message };
    }

    return { success: data === true };
  } catch (err) {
    console.error('Exception unverifying property:', err);
    return { success: false, error: String(err) };
  }
}

// =======================================================
// 2. DOCUMENT MANAGEMENT
// =======================================================

/**
 * Soft delete a document (Admin only)
 * @param documentId - UUID of the document to soft delete
 * @returns Promise with success status
 */
export async function softDeleteDocument(documentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('soft_delete_document', {
      doc_id: documentId
    });

    if (error) {
      console.error('Error soft deleting document:', error);
      return { success: false, error: error.message };
    }

    return { success: data === true };
  } catch (err) {
    console.error('Exception soft deleting document:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * Restore a soft-deleted document (Admin only)
 * @param documentId - UUID of the document to restore
 * @returns Promise with success status
 */
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

// =======================================================
// 3. DASHBOARD STATISTICS
// =======================================================

/**
 * Get admin dashboard statistics (Admin only)
 * @returns Promise with dashboard stats or error
 */
export async function getAdminDashboardStats(): Promise<{ data?: any; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('admin_dashboard_stats');

    if (error) {
      console.error('Error fetching admin dashboard stats:', error);
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    console.error('Exception fetching admin dashboard stats:', err);
    return { error: String(err) };
  }
}

/**
 * Get owner dashboard statistics (Owner only)
 * @returns Promise with dashboard stats or error
 */
export async function getOwnerDashboardStats(): Promise<{ data?: any; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('owner_dashboard_stats');

    if (error) {
      console.error('Error fetching owner dashboard stats:', error);
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    console.error('Exception fetching owner dashboard stats:', err);
    return { error: String(err) };
  }
}

/**
 * Get tenant dashboard statistics (Tenant only)
 * @returns Promise with dashboard stats or error
 */
export async function getTenantDashboardStats(): Promise<{ data?: any; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('tenant_dashboard_stats');

    if (error) {
      console.error('Error fetching tenant dashboard stats:', error);
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    console.error('Exception fetching tenant dashboard stats:', err);
    return { error: String(err) };
  }
}

// =======================================================
// 4. USER ROLE MANAGEMENT
// =======================================================

/**
 * Update a user's role (Admin only)
 * @param userId - UUID of the user
 * @param newRole - New role to assign (admin, owner, agent, tenant)
 * @returns Promise with success status
 */
export async function updateUserRole(
  userId: string,
  newRole: 'admin' | 'owner' | 'agent' | 'tenant'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.rpc('update_user_role', {
      user_id: userId,
      new_role: newRole
    });

    if (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: error.message };
    }

    return { success: data === true };
  } catch (err) {
    console.error('Exception updating user role:', err);
    return { success: false, error: String(err) };
  }
}

// =======================================================
// 5. EXPORT ALL ADMIN API FUNCTIONS
// =======================================================

export const adminApi = {
  // Property verification
  verifyProperty,
  unverifyProperty,
  
  // Document management
  softDeleteDocument,
  restoreDocument,
  
  // Dashboard statistics
  getAdminDashboardStats,
  getOwnerDashboardStats,
  getTenantDashboardStats,
  
  // User management
  updateUserRole
};
