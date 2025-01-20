import { ReactNode } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Details | Huusy - Real Estate Marketplace',
  description:
    'Explore detailed information about this property including photos, features, pricing, and location details.',
  keywords:
    'property details, real estate listing, home details, property features, house information',
  openGraph: {
    title: 'Property Details | Huusy',
    description:
      'Explore detailed information about this property including photos, features, pricing, and location details.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
  },
};

export default function PropertyDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
