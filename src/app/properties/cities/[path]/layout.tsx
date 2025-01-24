import { ReactNode } from 'react';
import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { City } from '@/types';

type Props = {
  children: ReactNode;
  params: { path: string };
};

async function getCity(path: string): Promise<City | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('cities')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await getCity(params.path);
  const cityName = params.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title:
      city?.meta_title ||
      `Properties in ${cityName} | Huusy - Real Estate Marketplace`,
    description:
      city?.meta_description ||
      `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
    keywords: `${cityName} real estate, ${cityName} properties, homes in ${cityName}, apartments in ${cityName}, real estate listings ${cityName}`,
    alternates: {
      canonical: `https://huusy.com/properties/cities/${params.path}`,
    },
    openGraph: {
      title: city?.meta_title || `Properties in ${cityName} | Huusy`,
      description:
        city?.meta_description ||
        `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/cities/${params.path}`,
      images: [
        {
          url: city?.og_image_url || '/images/open-graph@2x.webp',
          width: 1200,
          height: 630,
          alt: `Real Estate Properties in ${cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: city?.meta_title || `Properties in ${cityName} | Huusy`,
      description:
        city?.meta_description ||
        `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
      images: [city?.og_image_url || '/images/open-graph@2x.webp'],
      creator: '@huusy',
      site: '@huusy',
    },
  };
}

export default function CityLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
