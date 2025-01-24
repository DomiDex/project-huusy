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
  alternates: {
    canonical: 'https://huusy.com/search',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Search Properties | Huusy',
    description:
      'Search through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com/search',
    images: [
      {
        url: '/images/open-graph@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Huusy Property Search',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Properties | Huusy',
    description:
      'Search through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
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
