# GitHub Copilot Instructions for BOB Rentalz

This file contains custom instructions for GitHub Copilot to help maintain code quality and consistency in the BOB Rentalz (Best of Bedz) property rental platform.

---

## Project Overview

BOB Rentalz is a comprehensive property rental platform built with:
- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 6.3
- **UI Framework**: Radix UI + Tailwind CSS
- **Backend**: Supabase (Authentication + Database)
- **Deployment**: Vercel

---

## Code Style & Formatting

### TypeScript

- Use TypeScript for all new code files (`.ts`, `.tsx`)
- Enable strict mode - all TypeScript strict checks are enabled
- Avoid using `any` type - use `unknown` or proper types instead
- Use explicit types for function parameters and return values when not obvious
- Prefix unused variables with underscore: `_unusedVar`
- Use modern ES2020+ syntax features

### React

- Use functional components with hooks (no class components)
- Import React as: `import React from 'react'` when needed, but not required for JSX (React 17+)
- Use TypeScript interfaces for component props
- Prefer named exports over default exports for components
- Use React hooks following the Rules of Hooks
- Keep components focused and single-purpose

### Code Formatting

- Follow Prettier configuration in `.prettierrc`:
  - Print width: 100 characters
  - Use 2 spaces for indentation
  - Use single quotes for strings (except JSX attributes)
  - Always use semicolons
  - Trailing commas: `all`
  - Arrow function parentheses: `always`
  - Line endings: LF

### Import Organization

- Organize imports in this order:
  1. Built-in Node modules
  2. External packages
  3. Internal modules
  4. Parent directories
  5. Sibling files
  6. Index files
  7. Type imports
- Sort imports alphabetically within each group (case-insensitive)
- No blank lines between import groups
- Avoid default import/export naming conflicts

---

## File Organization

### Component Structure

- Components are in `src/components/`
- UI primitives are in `src/components/ui/`
- Each major component should be in its own file
- Related components can be grouped in subdirectories
- Component files use PascalCase: `PropertyCard.tsx`

### Pages Structure

- Page components are in `src/pages/`
- Page files use PascalCase with "Page" suffix: `PropertyDetailPage.tsx`
- Pages are organized by user role (Admin, Owner, Agent, Tenant)

### Other Directories

- `src/contexts/` - React contexts for global state
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility libraries and configurations
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/data/` - Static data and constants
- `src/assets/` - Images, icons, and other static assets

---

## Build & Development

### Available Scripts

- **Development**: `npm run dev` - Start Vite dev server
- **Build**: `npm run build` - Build for production
- **Preview**: `npm run preview` - Preview production build
- **Linting**: `npm run lint` - Check for linting errors (uses cache)
- **Lint Fix**: `npm run lint:fix` - Auto-fix linting issues (uses cache)
- **Format**: `npm run format` - Format code with Prettier
- **Format Check**: `npm run format:check` - Check code formatting
- **Type Check**: `npm run typecheck` - Run TypeScript type checking

### Before Committing

Always run these commands before committing:
```bash
npm run lint:fix    # Fix auto-fixable linting issues
npm run format      # Format all code with Prettier
npm run typecheck   # Ensure no type errors
```

---

## Supabase Integration

### Database Access

- Use Supabase client from `src/lib/supabase.ts`
- Never commit actual API keys - use environment variables
- Environment variables are prefixed with `VITE_`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### Database Tables

Main tables:
- `profiles` - User profiles (linked to `auth.users`)
- `properties` - Property listings
- `inquiries` - Tenant inquiries
- `service_requests` - Maintenance requests
- `documents` - Document management
- `tenant_contracts` - Rental contracts

### Row Level Security (RLS)

- All database operations respect RLS policies
- User roles: `admin`, `owner`, `agent`, `tenant`
- Always verify user permissions before operations
- Use soft deletes (deleted_at column) instead of hard deletes where applicable

---

## UI/UX Standards

### Design System

- Follow BOB brand guidelines in `src/BRAND_GUIDELINES.md`
- Primary colors:
  - Light Cream/Beige: `#F9F4D0`
  - Blue: `#2B4682`
  - Green (Teal): `#00AB89`
  - Yellow: `#F9E84C`

### Component Library

- Use Radix UI components for accessible UI primitives
- Use shadcn/ui patterns for component composition
- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Add proper ARIA labels for screen readers

### Responsive Design

- Mobile-first approach
- Use Tailwind CSS responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test layouts on different screen sizes
- Ensure touch targets are at least 44x44px

---

## State Management

### Local State

- Use `useState` for component-local state
- Use `useReducer` for complex state logic

### Global State

- Use React Context for global state (`src/contexts/`)
- Existing contexts:
  - `AuthContext` - User authentication state
  - `CompareContext` - Property comparison state

### Server State

- Use Supabase real-time subscriptions for live data
- Implement proper loading and error states
- Handle data fetching in useEffect with proper cleanup

---

## Error Handling

- Always handle errors from async operations
- Display user-friendly error messages
- Log errors to console for debugging: `console.error()`
- Use try-catch blocks for async/await operations
- Validate user input before processing

---

## Security Best Practices

- Never expose sensitive data in client-side code
- Validate all user inputs
- Use Supabase RLS for data access control
- Sanitize data before rendering (prevent XSS)
- Use environment variables for configuration
- Follow principle of least privilege for database access

---

## Testing

- Test interactive features manually after changes
- Verify authentication flows work correctly
- Check database operations respect RLS policies
- Test responsive layouts on different screen sizes
- Verify accessibility with keyboard navigation

---

## Documentation

- Update README.md for major feature changes
- Document complex logic with clear comments
- Use JSDoc for public functions and utilities
- Keep inline comments minimal and meaningful
- Document environment variables in `.env.example`

---

## Common Patterns

### Property Listings

- Properties have status: `available`, `rented`, `maintenance`
- Use reference codes for unique property identification
- Support multiple images as array
- Include amenities as array of strings
- Support featured and verified flags

### User Roles & Dashboards

- Each role has dedicated dashboard pages
- Admin has full access to all features
- Owners manage their properties
- Agents manage assigned properties and leads
- Tenants view properties and manage rentals

### Forms

- Use `react-hook-form` for form handling
- Validate forms before submission
- Show clear validation errors
- Disable submit buttons during processing
- Show success/error feedback after submission

---

## Performance

- Use dynamic imports for code splitting large pages
- Optimize images before uploading
- Lazy load images below the fold
- Minimize bundle size by importing only needed components
- Use Vite's built-in optimizations

---

## Git Workflow

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issue numbers in commit messages when applicable
- Review changes before committing
- Don't commit `node_modules/`, `dist/`, or `.env` files

---

## Additional Resources

- Project README: `/README.md`
- Linting Guide: `/LINTING_AND_FORMATTING_GUIDE.md`
- Dev Workflow: `/DEV_WORKFLOW_QUICK_REFERENCE.md`
- Brand Guidelines: `/src/BRAND_GUIDELINES.md`
- Database Setup: `/supabase-complete-setup.sql`
