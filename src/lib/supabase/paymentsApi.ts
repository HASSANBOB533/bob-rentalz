import { supabase } from './api';

export interface Payment {
  id: string;
  property_id: string;
  tenant_id: string;
  owner_id: string;
  amount: number;
  payment_for: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';
  payment_method?: string;
  payment_link?: string;
  transaction_id?: string;
  due_date: string;
  paid_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a manual payment request
 */
export const createPaymentRequest = async (
  propertyId: string,
  tenantId: string,
  amount: number,
  paymentFor: string,
  dueDate: string,
  paymentLink?: string,
  notes?: string
): Promise<string> => {
  const { data, error } = await supabase.rpc('create_manual_payment_request', {
    p_property_id: propertyId,
    p_tenant_id: tenantId,
    p_amount: amount,
    p_payment_for: paymentFor,
    p_due_date: dueDate,
    p_payment_link: paymentLink || null,
    p_notes: notes || null,
  });

  if (error) {
    console.error('Error creating payment request:', error);
    throw error;
  }

  return data; // Returns payment ID
};

/**
 * Mark a payment as paid manually
 */
export const markPaymentAsPaid = async (paymentId: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc('mark_payment_as_paid_manually', {
    p_payment_id: paymentId,
  });

  if (error) {
    console.error('Error marking payment as paid:', error);
    throw error;
  }

  return data;
};

/**
 * Get all payments for an owner
 */
export const getOwnerPayments = async (ownerId: string): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('owner_id', ownerId)
    .order('due_date', { ascending: false });

  if (error) {
    console.error('Error fetching owner payments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get all payments for a tenant
 */
export const getTenantPayments = async (tenantId: string): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('due_date', { ascending: false });

  if (error) {
    console.error('Error fetching tenant payments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get payments for a specific property
 */
export const getPropertyPayments = async (propertyId: string): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('property_id', propertyId)
    .order('due_date', { ascending: false });

  if (error) {
    console.error('Error fetching property payments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get pending payments for a tenant
 */
export const getPendingPayments = async (tenantId: string): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('status', 'pending')
    .order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching pending payments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get overdue payments for an owner
 */
export const getOverduePayments = async (ownerId: string): Promise<Payment[]> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('status', 'pending')
    .lt('due_date', today)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching overdue payments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Update payment status
 */
export const updatePaymentStatus = async (
  paymentId: string,
  status: Payment['status']
): Promise<void> => {
  const updateData: any = { status };

  // If marking as paid, set paid_at timestamp
  if (status === 'paid') {
    updateData.paid_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('payments')
    .update(updateData)
    .eq('id', paymentId);

  if (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

/**
 * Delete a payment
 */
export const deletePayment = async (paymentId: string): Promise<void> => {
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', paymentId);

  if (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};
