import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * AuthLayout - Layout wrapper for authentication pages (login, signup)
 * Includes Navbar and proper padding to prevent header overlap
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 lg:pt-32">{children}</main>
    </>
  );
}
