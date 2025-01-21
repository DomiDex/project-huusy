import { ReactNode } from 'react';
import { Metadata } from 'next';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Properties | Huusy - Real Estate Marketplace',
  description:
    'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
  keywords:
    'real estate, properties, homes for sale, homes for rent, real estate listings',
};

export default function PropertiesLayout({
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
