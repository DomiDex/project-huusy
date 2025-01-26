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

const propertyTypePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://huusy.com/properties/property-type#webpage',
  name: 'Properties by Type | Huusy',
  description:
    'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
  url: 'https://huusy.com/properties/property-type',
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
      'Browse properties by type. Find apartments, houses, villas, and more real estate listings categorized by property type.',
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
        '@type': 'PropertyValue',
        name: 'Property Types',
        description:
          'Explore real estate listings across different property types including apartments, houses, villas, and more.',
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

export default function PropertyTypeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyTypePageSchema),
        }}
      />
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
