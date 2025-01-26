import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LenisProvider from '@/components/ui/LenisProvider';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Huusy - Real Estate Marketplace',
  description:
    'Find your dream home with Huusy. Browse through our extensive collection of properties for sale and rent.',
  keywords:
    'real estate, properties, homes for sale, homes for rent, real estate marketplace',
  alternates: {
    canonical: 'https://huusy.com',
  },
  openGraph: {
    title: 'Huusy - Real Estate Marketplace',
    description:
      'Find your dream home with Huusy. Browse through our extensive collection of properties for sale and rent.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com',
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
    title: 'Huusy - Real Estate Marketplace',
    description:
      'Find your dream home with Huusy. Browse through our extensive collection of properties for sale and rent.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
  },
};

// Add this schema markup before the RootLayout component
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://huusy.com/#organization',
  name: 'Huusy',
  url: 'https://huusy.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://huusy.com/images/logo.png',
    width: '180',
    height: '60',
  },
  description:
    'Find your dream home with Huusy. Browse through our extensive collection of properties for sale and rent.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  sameAs: [
    'https://twitter.com/huusy',
    // Add other social media URLs here
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className='bg-primary-50'>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
