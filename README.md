# BOB Rentalz - Best of Bedz Property Rental Platform

A comprehensive property rental platform built with React, Vite, and Supabase.

## Features

- **Multi-Role Dashboard**: Admin, Owner, Agent, and Tenant dashboards
- **Property Management**: List, search, and manage properties
- **Authentication**: Secure user authentication with Supabase
- **Real-time Database**: Property listings, inquiries, and service requests
- **Responsive Design**: Mobile-friendly interface
- **Advanced Search**: Filter properties by location, type, price, and more

## Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 6.3
- **UI Framework**: Radix UI + Tailwind CSS
- **Backend**: Supabase (Authentication + Database)
- **Deployment**: Vercel
- **Version Control**: GitHub

## Live Website

🌐 **Production**: https://bob-rentalz.vercel.app

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A Supabase account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HASSANBOB533/bob-rentalz.git
   cd bob-rentalz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Copy the contents of `.env.example` into `.env`.
   - Get your Supabase project URL and anon key from your Supabase project settings and update the `.env` file:
     ```
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Set up the database:**
   - Go to your Supabase project's SQL Editor.
   - Copy and run the entire script from `supabase-complete-setup.sql` to create all tables, policies, and sample data.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

## Database Schema

The database schema is defined in `supabase-complete-setup.sql` and includes the following tables:

- `profiles`: Stores user profile information (linked to `auth.users`).
- `properties`: Contains all property listings and details.
- `inquiries`: Manages inquiries from potential tenants.
- `service_requests`: Tracks maintenance and service requests.

### `profiles` Table

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key, references `auth.users` |
| `email` | `TEXT` | User's email (unique) |
| `full_name` | `TEXT` | User's full name |
| `phone` | `TEXT` | User's phone number |
| `role` | `TEXT` | User role (`admin`, `owner`, `agent`, `tenant`) |
| `avatar_url` | `TEXT` | URL for user's avatar image |
| `created_at` | `TIMESTAMPTZ` | Timestamp of creation |
| `updated_at` | `TIMESTAMPTZ` | Timestamp of last update |

### `properties` Table

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `owner_id` | `UUID` | Foreign key to `profiles.id` |
| `title` | `TEXT` | Property title |
| `description` | `TEXT` | Property description |
| `property_type` | `TEXT` | Type of property (e.g., 'Apartment', 'Villa') |
| `location` | `TEXT` | General location (e.g., 'New Cairo') |
| `address` | `TEXT` | Full address |
| `price` | `DECIMAL` | Rental price |
| `bedrooms` | `INTEGER` | Number of bedrooms |
| `bathrooms` | `INTEGER` | Number of bathrooms |
| `area` | `DECIMAL` | Area in square meters |
| `furnishing` | `TEXT` | Furnishing status ('Furnished', 'Semi-Furnished', 'Unfurnished') |
| `status` | `TEXT` | Property status ('available', 'rented', 'maintenance') |
| `reference_code` | `TEXT` | Unique reference code for the property |
| `images` | `TEXT[]` | Array of image URLs |
| `amenities` | `TEXT[]` | Array of amenities |
| `verified` | `BOOLEAN` | Whether the property is verified |
| `featured` | `BOOLEAN` | Whether the property is featured |
| `created_at` | `TIMESTAMPTZ` | Timestamp of creation |
| `updated_at` | `TIMESTAMPTZ` | Timestamp of last update |

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Deployment

This project is configured for automatic deployment on Vercel. Every push to the `main` branch triggers a new deployment.

## Original Design

The original Figma design is available at: https://www.figma.com/design/bTCsAslQXHVuywaAsm56Kv/Design-BOB-Rentalz-Website

## License

All rights reserved © 2025 BOB Rentalz
