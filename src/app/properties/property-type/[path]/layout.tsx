import { ReactNode } from 'react';
import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { PropertyType } from '@/types';

type Props = {
  children: ReactNode;
  params: { path: string };
};

async function getPropertyType(path: string): Promise<PropertyType | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('property_types')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const propertyTypeData = await getPropertyType(params.path);
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
      images: [
        {
          url: propertyTypeData?.og_image_url || '/images/open-graph@2x.webp',
          width: 1200,
          height: 630,
          alt: `${propertyType} Properties`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${propertyType} Properties | Huusy`,
      description: `Browse our collection of ${propertyType.toLowerCase()} properties. Find the perfect ${propertyType.toLowerCase()} for sale or rent.`,
      images: [propertyTypeData?.og_image_url || '/images/open-graph@2x.webp'],
      creator: '@huusy',
      site: '@huusy',
    },
  };
}

export default function PropertyTypeLayout({ children }: Props) {
  return <>{children}</>;
}
