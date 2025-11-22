# BOB Rentalz - Testing Checklist

**Date:** November 22, 2025
**Tester:** Manus AI

## Overview

This document provides a comprehensive testing checklist for the BOB Rentalz platform. All tests should be performed on the live deployment at [https://bob-rentalz.vercel.app](https://bob-rentalz.vercel.app).

---

## 1. Property Creation Flow

### 1.1 Owner Add Property (Authenticated)

**Prerequisites:** Must be logged in as an owner

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Navigate to form | Go to `/owner/dashboard` → Click "Add New Property" | Form loads successfully | ⏸️ |
| Fill basic info | Enter title, description | Fields accept input | ⏸️ |
| Select property type | Choose from dropdown | Type is selected | ⏸️ |
| Enter property details | Add bedrooms, bathrooms, area | Numbers are validated | ⏸️ |
| Set location & price | Enter city and monthly rent | Required fields validated | ⏸️ |
| Select amenities | Use AmenitiesSelector component | Multiple amenities can be selected | ⏸️ |
| Upload images | Use ImageUploader component | Images upload to Supabase Storage | ⏸️ |
| Save as draft | Click "Save as Draft" | Property saved with status='draft' | ⏸️ |
| Publish property | Click "Publish Property" | Property saved with status='active' | ⏸️ |
| Verify in database | Check Supabase dashboard | Property exists with correct data | ⏸️ |
| Verify amenities | Check property_amenities table | Amenities are linked correctly | ⏸️ |
| Verify images | Check property_images table | Images are stored with correct order | ⏸️ |

### 1.2 List Property (Public Form)

**Prerequisites:** No authentication required

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Navigate to form | Go to `/list-property` | 4-step wizard loads | ⏸️ |
| Step 1: Basic Info | Fill title, location, type, description | Can proceed to step 2 | ⏸️ |
| Step 2: Details | Fill bedrooms, bathrooms, price | Can proceed to step 3 | ⏸️ |
| Step 3: Features | Select amenities | Can proceed to step 4 | ⏸️ |
| Step 4: Media | Upload images | Can submit form | ⏸️ |
| Submit property | Complete all steps and submit | Success message displayed | ⏸️ |
| Verify draft status | Check database | Property created with status='draft' | ⏸️ |
| Reset form | Click "List Another Property" | Form resets to step 1 | ⏸️ |

---

## 2. Property Display & Viewing

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| View property list | Navigate to properties page | Properties display correctly | ⏸️ |
| View property details | Click on a property | Details page shows all information | ⏸️ |
| Display amenities | Check amenities section | Icons and names display from normalized table | ⏸️ |
| Display images | Check image gallery | Images display in correct order, primary image first | ⏸️ |
| Image carousel | Navigate through images | All images are accessible | ⏸️ |

---

## 3. Payment Management

### 3.1 Owner Payment Dashboard

**Prerequisites:** Logged in as owner

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Navigate to payments | Go to `/owner/payments` | Payment dashboard loads | ⏸️ |
| View payment requests | Check list of payments | All payments for owner's properties display | ⏸️ |
| Create payment request | Fill form and submit | Payment request created in database | ⏸️ |
| Add payment link | Include Stripe/PayPal link | Link is saved correctly | ⏸️ |
| Mark as paid | Click "Mark as Paid" button | Payment status updates to 'paid' | ⏸️ |
| Filter payments | Use status filters | Payments filter correctly | ⏸️ |

### 3.2 Tenant Payment Dashboard

**Prerequisites:** Logged in as tenant

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Navigate to payments | Go to `/tenant/payments` | Payment dashboard loads | ⏸️ |
| View payment requests | Check list of payments | All payments for tenant's properties display | ⏸️ |
| View payment link | Click on payment link | Link opens in new tab | ⏸️ |
| Payment status display | Check payment cards | Status badges display correctly | ⏸️ |

---

## 4. Admin Functions & Security

### 4.1 Admin-Only Functions

**Prerequisites:** Logged in as admin

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Verify property | Call verify_property() function | Property verified flag set to true | ⏸️ |
| Soft delete document | Call soft_delete_document() function | Document marked as deleted | ⏸️ |
| Create manual payment | Call create_manual_payment_request() | Payment created successfully | ⏸️ |
| Mark payment as paid | Call mark_payment_as_paid_manually() | Payment status updated | ⏸️ |

### 4.2 Role-Based Security

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Non-admin verify attempt | Try verify_property() as owner | Error: "Only admins can verify properties" | ⏸️ |
| Non-admin delete attempt | Try soft_delete_document() as tenant | Error: "Only admins can delete documents" | ⏸️ |
| Unauthorized property edit | Try editing another owner's property | Error or no access | ⏸️ |
| RLS policy enforcement | Query properties table directly | Only authorized data returned | ⏸️ |

---

## 5. Dashboard Navigation

### 5.1 Owner Dashboard

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Payment link visibility | Check quick actions | "Manage Payments" button visible | ✅ |
| Payment link navigation | Click "Manage Payments" | Navigates to `/owner/payments` | ⏸️ |
| Stats display | Check dashboard stats | Property counts display correctly | ⏸️ |

### 5.2 Tenant Dashboard

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Payment link visibility | Check quick actions | "Manage Payments" button visible | ✅ |
| Payment link navigation | Click "Manage Payments" | Navigates to `/tenant/payments` | ⏸️ |
| Saved properties | Check saved properties section | Displays correctly | ⏸️ |

---

## 6. Authentication & Authorization

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Sign up flow | Create new account | Account created successfully | ⏸️ |
| Sign in flow | Log in with credentials | User authenticated | ⏸️ |
| Protected routes | Access `/owner/payments` without auth | Redirects to login | ✅ |
| Role-based access | Owner tries to access admin page | Access denied | ⏸️ |
| Sign out | Click sign out | User logged out, redirected | ⏸️ |

---

## 7. Database Integrity

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Normalized amenities | Check property_amenities table | No duplicate entries | ⏸️ |
| Image ordering | Check property_images table | sort_order is sequential | ✅ |
| Primary image flag | Check property_images table | Only one is_primary per property | ✅ |
| Foreign key constraints | Try deleting referenced data | Constraint prevents deletion | ⏸️ |
| RLS policies | Check policy count | All 36+ policies active | ✅ |
| Performance indexes | Check pg_indexes | All 19+ indexes exist | ✅ |

---

## 8. User Experience

| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| Responsive design | Test on mobile, tablet, desktop | Layout adapts correctly | ⏸️ |
| Loading states | Submit forms | Loading indicators display | ⏸️ |
| Error messages | Submit invalid data | Clear error messages shown | ⏸️ |
| Success feedback | Complete actions | Toast notifications appear | ⏸️ |
| Image upload feedback | Upload large files | Progress indication shown | ⏸️ |

---

## Testing Status Legend

- ✅ **Passed** - Test completed successfully
- ❌ **Failed** - Test failed, issue identified
- ⏸️ **Pending** - Test not yet performed
- ⚠️ **Partial** - Test partially passed with minor issues

---

## Next Steps

1. **Perform Manual Testing**: Execute all pending tests on the live deployment
2. **Document Issues**: Record any bugs or unexpected behavior
3. **Fix Critical Issues**: Address any blocking problems
4. **Retest**: Verify fixes work as expected
5. **Update Status**: Mark tests as passed/failed
6. **Final Sign-off**: Complete testing documentation

---

## Notes

- All tests should be performed on the production environment: [https://bob-rentalz.vercel.app](https://bob-rentalz.vercel.app)
- Database queries can be verified using Supabase dashboard or MCP CLI
- Screenshots should be taken for any failed tests
- Performance testing should be done with realistic data volumes
