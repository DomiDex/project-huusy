import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties by Type | Huusy - Real Estate Marketplace',
  description:
    'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
  keywords:
    'property types, apartments, houses, villas, real estate categories, property listings by type',
  alternates: {
    canonical: 'https://huusy.com/properties/property-type',
  },
  openGraph: {
    title: 'Properties by Type | Huusy',
    description:
      'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com/properties/property-type',
    images: [
      {
        url: '/images/open-graph@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Huusy Property Types',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties by Type | Huusy',
    description:
      'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
  },
};

export default function PropertyTypeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
