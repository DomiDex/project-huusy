import { ReactNode } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties by Type | Huusy - Real Estate Marketplace',
  description:
    'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
  keywords:
    'property types, apartments, houses, villas, real estate categories, property listings by type',
  openGraph: {
    title: 'Properties by Type | Huusy',
    description:
      'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
  },
};

export default function PropertyTypeLayout({
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
