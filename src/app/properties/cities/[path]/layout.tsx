import { ReactNode } from 'react';
import { Metadata } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import type { City } from '@/types';

type Props = {
  children: ReactNode;
  params: { path: string };
};

async function getCity(path: string): Promise<City | null> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('cities')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

async function generateCitySchema(city: City, cityName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://huusy.com/properties/cities/${city?.path}#webpage`,
    name: `Properties in ${cityName}`,
    description:
      city?.meta_description ||
      `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
    url: `https://huusy.com/properties/cities/${city?.path}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://huusy.com/#website',
      name: 'Huusy - Real Estate Marketplace',
      url: 'https://huusy.com',
    },
    about: {
      '@type': 'Place',
      name: cityName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: 'US',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: {
        '@type': 'ListItem',
        item: {
          '@type': 'RealEstateOrganization',
          name: `Real Estate in ${cityName}`,
          description: `Find properties for sale and rent in ${cityName}`,
          areaServed: {
            '@type': 'City',
            name: cityName,
          },
        },
      },
    },
    image: {
      '@type': 'ImageObject',
      url: city?.og_image_url || '/images/open-graph@2x.webp',
      width: '1200',
      height: '630',
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = params;
  const city = await getCity(awaitedParams.path);
  const cityName = awaitedParams.path
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
      canonical: `https://huusy.com/properties/cities/${awaitedParams.path}`,
    },
    openGraph: {
      title: city?.meta_title || `Properties in ${cityName} | Huusy`,
      description:
        city?.meta_description ||
        `Browse real estate listings in ${cityName}. Find homes, apartments, and properties for sale or rent in ${cityName}.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/cities/${awaitedParams.path}`,
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

export default async function CityLayout({ children, params }: Props) {
  const awaitedParams = params;
  const city = await getCity(awaitedParams.path);
  const cityName = awaitedParams.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const citySchema = city ? await generateCitySchema(city, cityName) : null;

  return (
    <div className='min-h-screen flex flex-col'>
      {citySchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
        />
      )}
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
