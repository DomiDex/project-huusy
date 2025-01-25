import { ReactNode } from 'react';
import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Property } from '@/types';

type Props = {
  children: ReactNode;
  params: { path: string };
};

async function getProperty(path: string): Promise<Property | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getProperty(params.path);

  if (!property) {
    return {
      title: 'Property Not Found | Huusy',
      description: 'The requested property could not be found.',
    };
  }

  // Safely access nested properties
  const cityTitle = property.city?.title || 'Unknown City';
  const propertyTypeTitle = property.property_type?.title || 'Property';
  const saleTypeTitle = property.sale_type?.title || '';

  const title = `${property.property_name} | Huusy - Real Estate Marketplace`;
  const description = `${property.excerpt} Located in ${cityTitle}. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, ${property.property_size} sq ft.`;

  return {
    title,
    description,
    keywords: `${property.property_name}, ${cityTitle} real estate, ${propertyTypeTitle}, ${saleTypeTitle}`,
    alternates: {
      canonical: `https://huusy.com/properties/${params.path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/${params.path}`,
      images:
        property.images?.length > 0
          ? [
              {
                url: property.images[0],
                width: 1200,
                height: 630,
                alt: property.property_name,
              },
            ]
          : [
              {
                url: '/images/open-graph@2x.webp',
                width: 1200,
                height: 630,
                alt: 'Huusy Property',
              },
            ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images:
        property.images?.length > 0
          ? [property.images[0]]
          : ['/images/open-graph@2x.webp'],
      creator: '@huusy',
      site: '@huusy',
    },
  };
}

export default function PropertyDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
