import { ReactNode } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties by City | Huusy - Real Estate Marketplace',
  description:
    'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
  keywords:
    'real estate by city, properties by location, city real estate, local properties',
  openGraph: {
    title: 'Properties by City | Huusy',
    description:
      'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
  },
};

export default function CitiesLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
