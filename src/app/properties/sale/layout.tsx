import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties for Sale | Huusy - Real Estate Marketplace',
  description:
    'Browse our extensive collection of properties for sale. Find your perfect home, from apartments to luxury houses.',
  keywords:
    'properties for sale, homes for sale, real estate listings, buy property, buy home, real estate for sale',
  openGraph: {
    title: 'Properties for Sale | Huusy',
    description:
      'Browse our extensive collection of properties for sale. Find your perfect home, from apartments to luxury houses.',
    type: 'website',
    siteName: 'Huusy - Real Estate Marketplace',
  },
};

export default function SaleLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
