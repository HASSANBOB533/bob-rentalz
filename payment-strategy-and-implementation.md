## **BOB Rentalz - Payment Strategy & Implementation Guide**

**Author:** Manus AI  
**Date:** November 22, 2025

---

### **1. Payment Collection Strategy: Phased Approach**

This document outlines the phased approach for payment collection in the BOB Rentalz platform, designed for flexibility and future scalability.

#### **Phase 1: Manual & Payment Link Tracking (Current Stage)**

For the current stage, all rent and fee collection will be handled **manually** or through **external payment links** (e.g., Stripe, PayPal, bank transfers). The platform will not process payments directly but will serve as a robust **payment tracking and management system**.

**How it works:**
1.  **Owner creates payment request:** The property owner creates a payment request in the system for a tenant (e.g., monthly rent).
2.  **Add payment link (optional):** The owner can add an external payment link to the request.
3.  **Tenant is notified:** The tenant receives a notification with the payment details and link.
4.  **Tenant pays externally:** The tenant pays using the provided link or other manual methods.
5.  **Owner confirms payment:** Once payment is received, the owner manually updates the payment status in the system to "paid".

**Benefits of this approach:**
-   **Rapid implementation:** No need for complex payment gateway integration at this stage.
-   **Flexibility:** Supports any payment method (cash, bank transfer, payment links).
-   **Low cost:** No transaction fees from payment gateways.
-   **Full tracking:** All payments are tracked in the database, providing a clear financial overview.

#### **Phase 2: Integrated Payment Gateway (Future Scalability)**

In the future, the platform can be upgraded to integrate directly with a payment gateway like Stripe. The `payments` table is already designed to support this.

**Future enhancements:**
-   **Automated payment processing:** Tenants can pay directly on the platform with credit cards.
-   **Automatic status updates:** Payment status is updated automatically via webhooks.
-   **Recurring payments:** Set up automatic monthly rent payments.
-   **Payouts to owners:** Automatically transfer funds to property owners.

**The current database schema is fully compatible with this future upgrade.**

---

### **2. Database Implementation for Manual Tracking**

To support the manual payment strategy, the following changes have been made to the `payments` table:

#### **2.1. Updated `payments` Table Schema**

A `payment_link` field has been added to the `payments` table:

```sql
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS payment_link TEXT;
```

**Updated Schema:**
| Column | Type | Purpose |
|---|---|---|
| `id` | UUID | Primary key |
| `property_id` | UUID | Associated property |
| `tenant_id` | UUID | Who is paying |
| `owner_id` | UUID | Who receives payment |
| `amount` | DECIMAL | Payment amount |
| `payment_for` | TEXT | rent, service_fee, etc. |
| `status` | TEXT | pending, paid, failed, etc. |
| `payment_method` | TEXT | manual, payment_link, etc. |
| `payment_link` | TEXT | **NEW:** External payment link |
| `transaction_id` | TEXT | External transaction ID |
| `due_date` | DATE | When payment is due |
| `paid_at` | TIMESTAMPTZ | When payment was completed |
| `notes` | TEXT | Additional notes |

#### **2.2. Helper Functions for Manual Tracking**

Two new RPC functions have been created to simplify manual payment management:

**1. `mark_payment_as_paid_manually(payment_id UUID)`**

This function allows an owner or admin to mark a payment as paid.

```sql
CREATE OR REPLACE FUNCTION public.mark_payment_as_paid_manually(p_payment_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- RLS policies will ensure only authorized users can call this
  UPDATE public.payments
  SET status = 'paid', paid_at = NOW(), updated_at = NOW()
  WHERE id = p_payment_id;
  
  RETURN FOUND;
END;
$$;
```

**2. `create_manual_payment_request(...)`**

This function allows an owner to create a new payment request for a tenant.

```sql
CREATE OR REPLACE FUNCTION public.create_manual_payment_request(
  p_property_id UUID,
  p_tenant_id UUID,
  p_amount DECIMAL,
  p_payment_for TEXT,
  p_due_date DATE,
  p_payment_link TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  new_payment_id UUID;
BEGIN
  -- RLS policies will ensure only authorized users can call this
  INSERT INTO public.payments (property_id, tenant_id, owner_id, amount, payment_for, due_date, payment_link, notes, status)
  VALUES (p_property_id, p_tenant_id, auth.uid(), p_amount, p_payment_for, p_due_date, p_payment_link, p_notes, 'pending')
  RETURNING id INTO new_payment_id;
  
  RETURN new_payment_id;
END;
$$;
```

---

### **3. Frontend Implementation Guide**

Here’s how to use the new system in your React frontend:

#### **3.1. Creating a Payment Request (Owner Dashboard)**

```typescript
// In your owner dashboard
const createPayment = async () => {
  const { data, error } = await supabase.rpc('create_manual_payment_request', {
    p_property_id: 'property-uuid',
    p_tenant_id: 'tenant-uuid',
    p_amount: 1000.00,
    p_payment_for: 'Monthly Rent',
    p_due_date: '2025-12-01',
    p_payment_link: 'https://stripe.com/pay/some-link',
    p_notes: 'Rent for December 2025'
  });

  if (error) console.error('Error creating payment request:', error);
  else console.log('Payment request created with ID:', data);
};
```

#### **3.2. Marking a Payment as Paid (Owner Dashboard)**

```typescript
// In your owner dashboard, after confirming manual payment
const markAsPaid = async (paymentId) => {
  const { data, error } = await supabase.rpc('mark_payment_as_paid_manually', {
    p_payment_id: paymentId
  });

  if (error) console.error('Error marking payment as paid:', error);
  else console.log('Payment marked as paid:', data);
};
```

#### **3.3. Displaying Payment Link to Tenant (Tenant Dashboard)**

When a tenant views their pending payments, you can display the `payment_link` as a clickable button:

```typescript
// In your tenant dashboard
const PaymentDetails = ({ payment }) => (
  <div>
    <p>Amount: {payment.amount}</p>
    <p>Due Date: {payment.due_date}</p>
    {payment.payment_link && (
      <a href={payment.payment_link} target="_blank" rel="noopener noreferrer">
        <button>Pay Now</button>
      </a>
    )}
  </div>
);
```

---

### **4. Summary of Implementation**

-   ✅ **Payment Strategy:** Manual & payment link tracking for current stage.
-   ✅ **Database:** `payments` table updated with `payment_link` field.
-   ✅ **Helper Functions:** `create_manual_payment_request` and `mark_payment_as_paid_manually` created.
-   ✅ **Frontend Guide:** Clear instructions for frontend integration.
-   ✅ **Scalability:** Database is ready for future payment gateway integration.

**This implementation provides a flexible and robust payment tracking system that meets the current needs of the business while being fully prepared for future growth.**
