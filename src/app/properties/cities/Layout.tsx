import { ReactNode } from 'react';

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
    images: [
      {
        url: '/images/open-graph@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Huusy Properties by City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties by City | Huusy',
    description:
      'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
  },
};

export default function CitiesLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
