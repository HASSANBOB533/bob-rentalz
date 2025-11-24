import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { WhatsAppFloat } from './WhatsAppFloat';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 lg:pt-32">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
