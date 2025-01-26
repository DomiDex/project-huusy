import type { Metadata } from 'next';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Real Estate Agents | Huusy',
  description:
    'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
  keywords:
    'real estate agents, realtors, property agents, real estate professionals',
  alternates: {
    canonical: 'https://huusy.com/agents',
  },
  openGraph: {
    title: 'Real Estate Agents | Huusy',
    description:
      'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com/agents',
    images: [
      {
        url: '/images/open-graph@2x.webp',
        width: 1200,
        height: 630,
        alt: 'Huusy Real Estate Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Agents | Huusy',
    description:
      'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
    images: ['/images/open-graph@2x.webp'],
    creator: '@huusy',
    site: '@huusy',
  },
};

// Add this schema markup before the AgentsLayout component
const agentsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://huusy.com/agents#webpage',
  name: 'Real Estate Agents | Huusy',
  description:
    'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
  url: 'https://huusy.com/agents',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://huusy.com/#website',
    name: 'Huusy - Real Estate Marketplace',
    url: 'https://huusy.com',
  },
  about: {
    '@type': 'RealEstateAgent',
    name: 'Huusy Real Estate Agents',
    description:
      'Professional real estate agents helping clients buy, sell, and rent properties.',
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
        '@type': 'RealEstateAgent',
        name: 'Huusy Real Estate Professionals',
        description:
          'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
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

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentsPageSchema) }}
      />
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
