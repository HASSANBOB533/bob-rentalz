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

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Deployment

This project is configured for automatic deployment on Vercel. Every push to the `master` branch triggers a new deployment.

## Original Design

The original Figma design is available at: https://www.figma.com/design/bTCsAslQXHVuywaAsm56Kv/Design-BOB-Rentalz-Website

## License

All rights reserved © 2025 BOB Rentalz
