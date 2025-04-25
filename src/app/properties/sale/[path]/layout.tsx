import { ReactNode } from 'react';
import { Metadata } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import type { SaleType } from '@/types';

type Props = {
  children: ReactNode;
  params: Promise<{ path: string }>;
};

async function getSaleType(path: string): Promise<SaleType | null> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('sale_types')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const saleTypeData = await getSaleType(params.path);
  const saleTypeName = params.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${saleTypeName} Properties | Huusy - Real Estate Marketplace`,
    description: `Browse ${saleTypeName.toLowerCase()} properties. Find homes and real estate listings available for ${saleTypeName.toLowerCase()}.`,
    keywords: `${saleTypeName} properties, homes for ${saleTypeName.toLowerCase()}, real estate ${saleTypeName.toLowerCase()}, ${saleTypeName.toLowerCase()} listings`,
    alternates: {
      canonical: `https://huusy.com/properties/sale/${params.path}`,
    },
    openGraph: {
      title: `${saleTypeName} Properties | Huusy`,
      description: `Browse ${saleTypeName.toLowerCase()} properties. Find homes and real estate listings available for ${saleTypeName.toLowerCase()}.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/sale/${params.path}`,
      images: [
        {
          url: saleTypeData?.og_image_url || '/images/open-graph@2x.webp',
          width: 1200,
          height: 630,
          alt: `${saleTypeName} Properties`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${saleTypeName} Properties | Huusy`,
      description: `Browse ${saleTypeName.toLowerCase()} properties. Find homes and real estate listings available for ${saleTypeName.toLowerCase()}.`,
      images: [saleTypeData?.og_image_url || '/images/open-graph@2x.webp'],
      creator: '@huusy',
      site: '@huusy',
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
