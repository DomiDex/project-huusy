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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
