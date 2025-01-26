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
  alternates: {
    canonical: 'https://huusy.com/properties',
  },
  openGraph: {
    title: 'Properties | Huusy - Real Estate Marketplace',
    description:
      'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com/properties',
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

const propertiesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://huusy.com/properties#webpage',
  name: 'Properties | Huusy',
  description:
    'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
  url: 'https://huusy.com/properties',
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
      'Browse through our extensive collection of properties for sale and rent. Find your perfect home with Huusy.',
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
        '@type': 'RealEstateListing',
        name: 'Real Estate Listings',
        description:
          'Explore our collection of properties including homes, apartments, and more for sale and rent.',
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

export default function PropertiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertiesPageSchema),
        }}
      />
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
