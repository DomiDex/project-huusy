import { ReactNode } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { path: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const propertyType = params.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${propertyType} Properties | Huusy - Real Estate Marketplace`,
    description: `Browse our collection of ${propertyType.toLowerCase()} properties. Find the perfect ${propertyType.toLowerCase()} for sale or rent.`,
    keywords: `${propertyType} properties, ${propertyType.toLowerCase()} for sale, ${propertyType.toLowerCase()} for rent, real estate listings, ${propertyType.toLowerCase()} real estate`,
    openGraph: {
      title: `${propertyType} Properties | Huusy`,
      description: `Browse our collection of ${propertyType.toLowerCase()} properties. Find the perfect ${propertyType.toLowerCase()} for sale or rent.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
    },
  };
}

export default function PropertyTypeLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
