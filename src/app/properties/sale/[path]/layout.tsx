import { ReactNode } from 'react';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { path: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const saleTypeName = params.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${saleTypeName} Properties | Huusy - Real Estate Marketplace`,
    description: `Browse ${saleTypeName.toLowerCase()} properties. Find homes and real estate listings available for ${saleTypeName.toLowerCase()}.`,
    keywords: `${saleTypeName} properties, homes for ${saleTypeName.toLowerCase()}, real estate ${saleTypeName.toLowerCase()}, ${saleTypeName.toLowerCase()} listings`,
    openGraph: {
      title: `${saleTypeName} Properties | Huusy`,
      description: `Browse ${saleTypeName.toLowerCase()} properties. Find homes and real estate listings available for ${saleTypeName.toLowerCase()}.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
    },
  };
}

export default function SaleTypeLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
