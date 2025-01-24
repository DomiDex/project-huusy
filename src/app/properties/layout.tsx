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
  openGraph: {
    title: 'Properties | Huusy - Real Estate Marketplace',
    description:
      'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    images: [
      {
        url: '/images/open-graph@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Huusy Real Estate Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties | Huusy - Real Estate Marketplace',
    description:
      'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
  },
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
