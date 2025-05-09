import { ReactNode } from 'react';
import { Metadata } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import type { PropertyType } from '@/types';

type Props = {
  children: ReactNode;
  params: Promise<{ path: string }>;
};

async function getPropertyType(path: string): Promise<PropertyType | null> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('property_types')
    .select('*')
    .eq('path', path)
    .single();

  return data;
}

async function generatePropertyTypeSchema(
  propertyType: PropertyType,
  typeName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://huusy.com/properties/property-type/${propertyType?.path}#webpage`,
    name: `${typeName} Properties`,
    description:
      propertyType?.meta_description ||
      `Browse our collection of ${typeName.toLowerCase()} properties. Find the perfect ${typeName.toLowerCase()} for sale or rent.`,
    url: `https://huusy.com/properties/property-type/${propertyType?.path}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://huusy.com/#website',
      name: 'Huusy - Real Estate Marketplace',
      url: 'https://huusy.com',
    },
    about: {
      '@type': 'PropertyValue',
      name: typeName,
      description: `Collection of ${typeName.toLowerCase()} properties available for sale and rent`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: {
        '@type': 'ListItem',
        item: {
          '@type': 'RealEstateOrganization',
          name: `${typeName} Properties`,
          description: `Find ${typeName.toLowerCase()} properties for sale and rent`,
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
        },
      },
    },
    image: {
      '@type': 'ImageObject',
      url: propertyType?.og_image_url || '/images/open-graph@2x.webp',
      width: '1200',
      height: '630',
    },
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const awaitedParams = params;
  const propertyTypeData = await getPropertyType(awaitedParams.path);
  const propertyType = awaitedParams.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${propertyType} Properties | Huusy - Real Estate Marketplace`,
    description: `Browse our collection of ${propertyType.toLowerCase()} properties. Find the perfect ${propertyType.toLowerCase()} for sale or rent.`,
    keywords: `${propertyType} properties, ${propertyType.toLowerCase()} for sale, ${propertyType.toLowerCase()} for rent, real estate listings, ${propertyType.toLowerCase()} real estate`,
    alternates: {
      canonical: `https://huusy.com/properties/property-type/${awaitedParams.path}`,
    },
    openGraph: {
      title: `${propertyType} Properties | Huusy`,
      description: `Browse our collection of ${propertyType.toLowerCase()} properties. Find the perfect ${propertyType.toLowerCase()} for sale or rent.`,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/property-type/${awaitedParams.path}`,
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

export default async function PropertyTypeLayout(props: Props) {
  const params = await props.params;

  const {
    children
  } = props;

  const awaitedParams = params;
  const propertyType = await getPropertyType(awaitedParams.path);
  const typeName = awaitedParams.path
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const propertyTypeSchema = propertyType
    ? await generatePropertyTypeSchema(propertyType, typeName)
    : null;

  return (
    <div className='min-h-screen flex flex-col'>
      {propertyTypeSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertyTypeSchema),
          }}
        />
      )}
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
