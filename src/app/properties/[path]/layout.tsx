import { ReactNode } from 'react';
import { Metadata } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import type { AccountPro, Property } from '@/types'; // Include AccountPro for agent type

type Props = {
  children: ReactNode;
  params: { path: string };
};

async function getProperty(path: string): Promise<Property | null> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('properties')
    // Select nested data according to Property type
    .select(
      `
      *,
      property_type:property_type_id (*),
      city:city_id (*),
      sale_type:sale_type_id (*),
      agent:agent_id (*)
    `
    )
    .eq('path', path)
    .single();

  // Cast needed because Supabase select("*") might not infer nested types perfectly
  return data as Property | null;
}

async function generatePropertySchema(property: Property) {
  // Agent details are now part of the property object if fetched correctly
  const agent = property.agent;

  // No need for separate Supabase client or fetch here if agent is included in property

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://huusy.com/properties/${property.path}#listing`,
    name: property.property_name,
    description: property.excerpt,
    url: `https://huusy.com/properties/${property.path}`,
    datePosted: new Date().toISOString(),
    image: property.images?.[0] || '/images/open-graph@2x.webp',
    numberOfRooms: property.bedrooms,
    numberOfBathrooms: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.property_size,
      unitText: 'sq ft',
    },
    price: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: property.price,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city?.title || 'Unknown City',
      addressCountry: 'US',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    broker: {
      '@type': 'RealEstateAgent',
      name: agent?.full_name || 'Huusy Agent', // Use agent from property
      image: agent?.profile_image_url || '/images/open-graph@2x.webp', // Use agent from property
      telephone: agent?.phone, // Use agent from property
      email: (agent as AccountPro | null)?.email, // Use agent from property, cast might be needed if email isn't in the base agent type selected
      url: `https://huusy.com/agents/${agent?.id}`, // Use agent from property
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'propertyType',
        value: property.property_type?.title || 'Property',
      },
      {
        '@type': 'PropertyValue',
        name: 'listingType',
        value: property.sale_type?.title || '',
      },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = params;
  const property = await getProperty(awaitedParams.path);

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
      canonical: `https://huusy.com/properties/${awaitedParams.path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/properties/${awaitedParams.path}`,
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

export default async function PropertyDetailsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { path: string };
}) {
  const awaitedParams = params;
  const property = await getProperty(awaitedParams.path);
  const propertySchema = property
    ? await generatePropertySchema(property)
    : null;

  return (
    <div className='min-h-screen flex flex-col'>
      {propertySchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
        />
      )}
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
