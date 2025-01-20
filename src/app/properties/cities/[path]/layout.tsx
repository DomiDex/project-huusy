import { ReactNode } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { path: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = params.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Properties in ${cityName} | Huusy - Real Estate Marketplace`,
    description: `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
    keywords: `${cityName} real estate, ${cityName} properties, homes in ${cityName}, apartments in ${cityName}, real estate listings ${cityName}`,
    openGraph: {
      title: `Properties in ${cityName} | Huusy`,
      description: `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
    },
  };
}

export default function CityLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
