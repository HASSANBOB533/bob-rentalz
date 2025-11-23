# 🔑 Test Login Credentials for BOB Rentalz

## Setup Instructions

### Option 1: Run SQL Script (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com
2. Select your **BOB Rentalz** project
3. Navigate to **SQL Editor**
4. Open the file `setup-test-passwords.sql` from this repository
5. Copy and paste the entire SQL script
6. Click **Run** to execute
7. You should see a verification table showing all accounts with "Password Set ✅"

### Option 2: Manual Setup via Supabase Dashboard

For each test account:

1. Go to **Authentication** → **Users**
2. Find the user by email
3. Click on the user
4. Click **Reset Password**
5. Set the password according to the list below

---

## 📋 Test Account Credentials

### 1. Admin Account
```
Email: admin@example.com
Password: Admin123
Role: Admin Dashboard
```

**What you can test:**
- Full admin access
- Manage all properties
- View all users
- System-wide settings

---

### 2. Owner Account
```
Email: owner@example.com
Password: Owner123
Role: Owner Dashboard
```

**What you can test:**
- Property owner features
- List properties
- Manage own properties
- View inquiries

---

### 3. Agent Account
```
Email: agent@example.com
Password: Agent123
Role: Agent Dashboard
```

**What you can test:**
- Agent features
- View assigned properties
- Manage leads
- Schedule viewings

---

### 4. Tenant Account
```
Email: tenant@example.com
Password: Tenant123
Role: Tenant Dashboard
```

**What you can test:**
- Tenant features
- Browse properties
- Submit inquiries
- View favorites
- Request viewings

---

### 5. Personal Admin Account
```
Email: hassanahmed533@gmail.com
Password: Admin123
Role: Admin Dashboard
```

**Your personal account** with full admin access.

---

## 🧪 Testing Workflow

### Test Login Flow

1. Go to https://bob-rentalz.vercel.app/login
2. Enter one of the test account credentials
3. Click **Sign in**
4. You should be redirected to the appropriate dashboard based on role

### Expected Redirects

| Role | Redirect URL |
|------|-------------|
| Admin | `/admin/dashboard` |
| Owner | `/owner/dashboard` |
| Agent | `/agent/dashboard` |
| Tenant | `/dashboard` |

### Test Different Roles

1. **Admin Testing:**
   - Log in with `admin@example.com`
   - Verify admin dashboard loads
   - Check access to all features

2. **Owner Testing:**
   - Log in with `owner@example.com`
   - Verify owner dashboard loads
   - Test property management

3. **Agent Testing:**
   - Log in with `agent@example.com`
   - Verify agent dashboard loads
   - Test lead management

4. **Tenant Testing:**
   - Log in with `tenant@example.com`
   - Verify tenant dashboard loads
   - Test property browsing

---

## 🔍 Debugging Login Issues

If login doesn't work, open browser console (F12) and check for:

### Success Logs:
```
Login form submitted { email: "admin@example.com" }
Supabase auth response: { data: {...}, error: null }
User authenticated: 00000000-0000-0000-0000-000000000001
Profile fetch result: { profile: { role: "admin" }, error: null }
Redirecting based on role: admin
```

### Common Errors:

**"Invalid login credentials"**
- Password not set correctly
- Run the SQL script again

**"Email not confirmed"**
- `email_confirmed_at` is null
- Run the SQL script to set it

**"Profile fetch error"**
- Profile doesn't exist in `profiles` table
- Check that profile exists with correct role

---

## 📝 Notes

- All passwords are set to simple values for testing
- **DO NOT use these credentials in production**
- Change passwords after testing if needed
- These accounts have profiles already created in the database

---

## ✅ Verification Checklist

After running the SQL script, verify:

- [ ] All 5 accounts show "Password Set ✅" in verification query
- [ ] All accounts have `email_confirmed_at` set
- [ ] Can log in with `admin@example.com` / `Admin123`
- [ ] Can log in with `owner@example.com` / `Owner123`
- [ ] Can log in with `agent@example.com` / `Agent123`
- [ ] Can log in with `tenant@example.com` / `Tenant123`
- [ ] Can log in with `hassanahmed533@gmail.com` / `Admin123`
- [ ] Each account redirects to correct dashboard

---

## 🚀 Quick Start

**Fastest way to test:**

1. Run `setup-test-passwords.sql` in Supabase SQL Editor
2. Go to https://bob-rentalz.vercel.app/login
3. Log in with `tenant@example.com` / `Tenant123`
4. Start browsing properties!

---

Last Updated: November 23, 2025
