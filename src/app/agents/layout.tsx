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

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
