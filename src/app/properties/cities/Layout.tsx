import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties by City | Huusy - Real Estate Marketplace',
  description:
    'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
  keywords:
    'real estate by city, properties by location, city real estate, local properties',
  alternates: {
    canonical: 'https://huusy.com/properties/cities',
  },
  openGraph: {
    title: 'Properties by City | Huusy',
    description:
      'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com/properties/cities',
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

// Add this schema markup before the CitiesLayout component
const citiesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://huusy.com/properties/cities#webpage',
  name: 'Properties by City | Huusy',
  description:
    'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
  url: 'https://huusy.com/properties/cities',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://huusy.com/#website',
    name: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com',
  },
  about: {
    '@type': 'RealEstateOrganization',
    name: 'Huusy Real Estate',
    description:
      'Browse properties by city. Find homes, apartments, and real estate listings in your preferred location.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: {
      '@type': 'ListItem',
      item: {
        '@type': 'Place',
        name: 'Cities with Real Estate Listings',
        description:
          'Explore real estate listings across different cities in the United States.',
      },
    },
  },
  image: {
    '@type': 'ImageObject',
    url: 'https://huusy.com/images/open-graph@2x.webp',
    width: '1200',
    height: '630',
  },
};

export default function CitiesLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citiesPageSchema) }}
      />
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
