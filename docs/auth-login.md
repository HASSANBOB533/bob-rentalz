# Authentication & Login Flow Documentation

## Overview

BOB Rentalz uses Supabase for authentication, with role-based access control (RBAC) to redirect users to appropriate dashboards after login.

## Login Flow

### 1. User Authentication
- Users navigate to `/login`
- Enter their email and password
- System calls `supabase.auth.signInWithPassword()` with credentials
- Email is automatically trimmed and converted to lowercase for consistency

### 2. Profile & Role Retrieval
- After successful authentication, the system queries the `profiles` table
- Retrieves the user's `role` field from their profile
- Roles available: `admin`, `owner`, `agent`, `tenant`

### 3. Role-based Redirect
Based on the retrieved role, users are redirected to:

| Role   | Redirect URL          | Dashboard Access                           |
|--------|----------------------|-------------------------------------------|
| admin  | `/dashboard/admin`   | Full system access, user management       |
| owner  | `/dashboard/owner`   | Property management, tenant oversight     |
| agent  | `/dashboard/agent`   | Lead management, property viewings        |
| tenant | `/dashboard/tenant`  | Property browsing, inquiry submission     |

### 4. Error Handling
- Invalid credentials: Display error message from Supabase
- Missing profile: Redirect to `/dashboard/tenant` (default)
- Network errors: Display "An unexpected error occurred" message

## Components Involved

### LoginPage.tsx
- Location: `src/pages/LoginPage.tsx`
- Handles the login form UI and submission
- Performs authentication and role-based redirect
- Displays error messages to users

### AppRouter.tsx
- Location: `src/router/AppRouter.tsx`
- Defines all application routes
- Protects dashboard routes with `ProtectedRoute` component
- Ensures only authenticated users with correct roles can access dashboards

### AuthRedirect.tsx
- Location: `src/router/AuthRedirect.tsx`
- Prevents authenticated users from accessing login/signup pages
- Redirects logged-in users to their appropriate dashboard
- Shows loading state during authentication check

### ProtectedRoute Component
- Location: `src/components/auth/ProtectedRoute.tsx`
- Wraps protected routes to ensure user has required role
- Redirects unauthorized users to `/unauthorized`
- Handles authentication state checks

## Test Accounts

For development and testing, the following test accounts are available:

### Admin Account
```
Email: admin@example.com
Password: Admin123
Dashboard: /dashboard/admin
```

**Capabilities:**
- Full system administration
- User management (view/edit all users)
- Property verification and management
- System-wide reports and analytics

### Owner Account
```
Email: owner@example.com
Password: Owner123
Dashboard: /dashboard/owner
```

**Capabilities:**
- Add and manage properties
- View and respond to inquiries
- Track rental income and payments
- Manage current and past tenants

### Agent Account
```
Email: agent@example.com
Password: Agent123
Dashboard: /dashboard/agent
```

**Capabilities:**
- View assigned properties
- Manage leads and inquiries
- Schedule and track property viewings
- Communicate with potential tenants

### Tenant Account
```
Email: tenant@example.com
Password: Tenant123
Dashboard: /dashboard/tenant
```

**Capabilities:**
- Browse available properties
- Submit inquiries and viewing requests
- Save favorite properties
- Track rental applications

### Personal Admin Account
```
Email: hassanahmed533@gmail.com
Password: Admin123
Dashboard: /dashboard/admin
```

Owner's personal administrative account.

## Setting Up Test Accounts

### For Local Development (Supabase CLI)

If using Supabase locally, you can create test users with the migration files:

1. Ensure Supabase is running locally:
   ```bash
   supabase start
   ```

2. Run the seed file to create test users:
   ```bash
   supabase db reset
   ```

Or manually execute the SQL in `create-test-users-properly.sql`

### For Production/Hosted Supabase

1. Navigate to your Supabase project dashboard
2. Go to **SQL Editor**
3. Open and run `setup-test-passwords.sql` from the repository
4. Verify users are created by running the verification query at the end of the script

The SQL script will:
- Create user accounts in `auth.users` table
- Hash passwords securely using bcrypt
- Set `email_confirmed_at` to enable immediate login
- Link to profiles in `profiles` table with appropriate roles

## Environment Variables

The application requires the following environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Getting Your Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy **Project URL** (for `VITE_SUPABASE_URL`)
5. Copy **anon/public** key (for `VITE_SUPABASE_ANON_KEY`)

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`

3. **Never commit `.env` to version control** (it's in `.gitignore`)

## Row Level Security (RLS)

The application uses Supabase RLS policies to ensure data security:

### Profiles Table
- Users can read their own profile
- Users can update their own profile
- Admins can read and update all profiles

### Properties Table
- Anyone can read verified, available properties (public browsing)
- Owners can create, read, update their own properties
- Admins can manage all properties
- Agents can read properties assigned to them

### Inquiries Table
- Tenants can create and read their own inquiries
- Owners can read inquiries for their properties
- Admins can read all inquiries

### Service Requests Table
- Tenants can create and read their own requests
- Owners can read requests for their properties
- Admins can read and manage all requests

## Security Notes

1. **Password Requirements**: Supabase enforces minimum password length (6 characters)
2. **Email Validation**: Emails must be valid format and are normalized (lowercase, trimmed)
3. **Session Management**: Sessions are stored in browser local storage
4. **Token Refresh**: Supabase automatically refreshes auth tokens
5. **HTTPS Only**: Production should always use HTTPS
6. **RLS Enabled**: All tables use Row Level Security policies

## Troubleshooting

### "Invalid login credentials" Error
- Verify email and password are correct
- Ensure test accounts are created (run SQL seed script)
- Check that `email_confirmed_at` is set in `auth.users` table

### "Profile fetch error"
- Ensure profile exists in `profiles` table
- Verify profile has correct `role` field
- Check RLS policies allow profile access

### Redirecting to Wrong Dashboard
- Verify user's role in `profiles` table
- Check AppRouter.tsx for correct route definitions
- Ensure ProtectedRoute allows the user's role

### Can't Access Environment Variables
- Verify `.env` file exists in project root
- Ensure variable names start with `VITE_`
- Restart dev server after changing `.env`

### Sign In Button Not Appearing
- Check browser console for React errors
- Verify all required dependencies are installed
- Check that LoginPage component renders correctly

## Testing the Login Flow

### Manual Testing Steps

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to login page:**
   ```
   http://localhost:5173/login
   ```

3. **Test each role:**
   - Log in with admin@example.com
   - Verify redirect to `/dashboard/admin`
   - Log out and repeat for other roles

4. **Test error handling:**
   - Try invalid email format
   - Try wrong password
   - Try non-existent user

### Automated Testing

Currently, the application doesn't have automated tests for the login flow. Consider adding:
- Unit tests for LoginPage component
- Integration tests for authentication flow
- E2E tests with Playwright or Cypress

## Related Files

- `src/pages/LoginPage.tsx` - Login UI and logic
- `src/pages/SignupPage.tsx` - User registration
- `src/router/AppRouter.tsx` - Route definitions
- `src/router/AuthRedirect.tsx` - Auth state handler
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `src/lib/supabase.ts` - Supabase client setup
- `src/lib/supabase/api.ts` - API helper functions
- `setup-test-passwords.sql` - SQL to create test users
- `create-test-users-properly.sql` - Alternative SQL seed script
- `TEST_CREDENTIALS.md` - Test account documentation

## Changelog

### November 23, 2025
- Fixed route mismatch between LoginPage redirects and AppRouter routes
- Updated all role-based redirects to use `/dashboard/{role}` format
- Created comprehensive authentication documentation
- Verified test account SQL scripts are in place
- Documented RLS policies and security considerations
