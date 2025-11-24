# Content Security Policy and Security Headers Configuration

## Overview

This document explains the security headers configuration in `vercel.json` and how to troubleshoot CSP-related issues.

## Current Configuration

### Content Security Policy (CSP)

The CSP is configured in `vercel.json` to allow only trusted sources:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https: blob:;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co wss://*.supabase.in;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

#### Directive Explanations:

- **default-src 'self'**: Default policy - only allow resources from same origin
- **script-src**: JavaScript sources
  - `'self'`: Scripts from same origin
  - `'unsafe-inline'`: Inline scripts (needed for some UI libraries)
  - `'unsafe-eval'`: eval() usage (needed for some dependencies)
  - `https://cdn.jsdelivr.net`: CDN for external libraries
- **style-src**: CSS sources
  - `'self'`: Stylesheets from same origin
  - `'unsafe-inline'`: Inline styles (needed for Tailwind and component libraries)
  - `https://fonts.googleapis.com`: Google Fonts CSS
- **img-src**: Image sources
  - `'self'`: Images from same origin
  - `data:`: Data URIs for inline images
  - `https:`: Any HTTPS image source
  - `blob:`: Blob URLs for dynamically generated images
- **font-src**: Font sources
  - `'self'`: Fonts from same origin
  - `data:`: Data URIs for embedded fonts
  - `https://fonts.gstatic.com`: Google Fonts files
- **connect-src**: API/WebSocket connections
  - `'self'`: Same origin API calls
  - `https://*.supabase.co`: Supabase API (primary domain)
  - `https://*.supabase.in`: Supabase API (alternative domain for some regions)
  - `wss://*.supabase.co`: Supabase WebSocket (primary domain)
  - `wss://*.supabase.in`: Supabase WebSocket (alternative domain)
- **frame-ancestors 'none'**: Prevent embedding in iframes (clickjacking protection)
- **base-uri 'self'**: Restrict base tag URLs to same origin
- **form-action 'self'**: Forms can only submit to same origin

### Additional Security Headers

- **X-Content-Type-Options: nosniff**: Prevent MIME type sniffing
- **X-Frame-Options: DENY**: Prevent clickjacking (redundant with CSP frame-ancestors)
- **X-XSS-Protection: 1; mode=block**: Enable browser XSS protection
- **Referrer-Policy: strict-origin-when-cross-origin**: Control referrer information

## Common CSP Issues and Solutions

### Issue 1: Vercel Live Feedback Script Blocked (404 + CSP Violation)

**Symptoms:**
- Console errors: `Refused to load the script 'https://vercel.live/_next-live/feedback/feedback.js'`
- 404 errors for Vercel Live resources
- CSP violation warnings

**Root Cause:**
Vercel deployment automatically tries to inject the Live feedback feature, but:
1. The script doesn't exist (404 error)
2. Our CSP doesn't allow `https://vercel.live` (CSP violation)
3. We don't need this feature for our application

**Solution:**
1. **Keep CSP Strict** (RECOMMENDED): Don't add `https://vercel.live` to CSP
   - This is the current configuration
   - Prevents unauthorized scripts from loading
   - May show console warnings but won't affect app functionality

2. **Disable Vercel Live in Deployment** (OPTIONAL):
   - Go to Vercel Dashboard → Project Settings
   - Look for "Vercel Toolbar" or "Live Feedback" settings
   - Disable the feature
   - This eliminates the warnings completely

3. **Allow Vercel Live** (NOT RECOMMENDED):
   - Only if you specifically need the Vercel Live feedback feature
   - Add to script-src: `https://vercel.live https://*.vercel.app`
   - Security risk: allows Vercel to inject arbitrary scripts

### Issue 2: Supabase Authentication Failing

**Symptoms:**
- Login requests failing
- CORS errors
- Network errors to Supabase

**Solution:**
Ensure environment variables are correctly set:

```bash
# .env.local (create this file, don't commit to git)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Verify CSP includes both `.supabase.co` and `.supabase.in` domains (already configured).

### Issue 3: Images Not Loading

**Symptoms:**
- External images blocked
- CSP violation for img-src

**Solution:**
Current configuration allows:
- Same origin images: `'self'`
- Data URIs: `data:`
- All HTTPS images: `https:`
- Blob URLs: `blob:`

If specific image domains need restriction, replace `https:` with specific domains.

### Issue 4: External Scripts Blocked

**Symptoms:**
- Third-party scripts not loading
- CSP violation for script-src

**Solution:**
Add specific domains to script-src in `vercel.json`:
```json
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://trusted-domain.com"
```

## Environment Variables

### Required Variables

```bash
VITE_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Setting Variables

**Development (.env.local):**
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials
3. Never commit `.env.local` to git

**Vercel Deployment:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Set for Production, Preview, and Development environments
4. Redeploy after adding variables

## Testing CSP Configuration

### Local Testing

```bash
npm run dev
```

Open browser DevTools → Console and check for CSP violations.

### Production Testing

After deploying to Vercel:
1. Open the deployed site
2. Open browser DevTools → Console
3. Check for CSP violations
4. Verify all features work (login, image loading, etc.)

## Security Best Practices

1. **Keep CSP Strict**: Only allow necessary sources
2. **Avoid 'unsafe-inline' and 'unsafe-eval'**: Currently needed for some libraries, but minimize usage when possible
3. **Use Specific Domains**: Replace wildcards with specific domains when possible
4. **Regular Audits**: Review CSP regularly as dependencies change
5. **Test Thoroughly**: Ensure CSP doesn't break functionality
6. **Monitor Console**: Watch for CSP violations in production

## Troubleshooting Checklist

When encountering CSP issues:

- [ ] Check browser console for specific CSP violation messages
- [ ] Verify environment variables are set correctly
- [ ] Confirm Supabase domains (.co and .in) are allowed
- [ ] Check if Vercel Live is causing issues (see Issue 1 above)
- [ ] Ensure all required resource domains are in CSP
- [ ] Test in incognito mode to rule out browser extensions
- [ ] Clear browser cache and cookies
- [ ] Check Vercel deployment logs for errors

## References

- [MDN CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Vercel Headers Documentation](https://vercel.com/docs/projects/project-configuration#headers)
- [Supabase Authentication](https://supabase.com/docs/guides/auth)
