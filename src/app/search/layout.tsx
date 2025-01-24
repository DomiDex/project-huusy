import { ReactNode } from 'react';
import { Metadata } from 'next';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Search Properties | Huusy - Real Estate Marketplace',
  description:
    'Search through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
  keywords:
    'property search, real estate search, find homes, search properties, real estate listings',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
