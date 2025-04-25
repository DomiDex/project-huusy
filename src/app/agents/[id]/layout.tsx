import { ReactNode } from 'react';
import { Metadata } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import type { AccountPro } from '@/types';

// Define distinct prop types for generateMetadata and the Layout component

// Props for generateMetadata (receives resolved params object)
interface GenerateMetadataProps {
  params: Promise<{ id: string }>; // Changed to Promise to match LayoutProps expectation
  // searchParams: { [key: string]: string | string[] | undefined }; // Uncomment if needed
}

// Props for Layout component (receives params as a Promise in Next.js 15)
interface LayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>; // Changed back to Promise
}

async function getAgent(id: string): Promise<AccountPro | null> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('account_pro')
    .select('*')
    .eq('id', id)
    .single();

  return data;
}

// Use the specific GenerateMetadataProps type
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  // <-- Use GenerateMetadataProps
  // No need to await params here, it's already resolved
  const resolvedParams = await params; // Added await as params is now a Promise
  const agent = await getAgent(resolvedParams.id); // <-- Use resolvedParams

  if (!agent) {
    return {
      title: 'Agent Not Found | Huusy',
      description: 'The requested agent profile could not be found.',
    };
  }

  // Fetch property counts for schema within generateMetadata
  const supabase = await createClient();
  const { data: properties } = await supabase
    .from('properties')
    .select('*, sale_type:sale_type_id(title)') // Ensure title is selected directly
    .eq('agent_id', agent.id);

  const forSaleCount =
    properties?.filter((p) => p.sale_type?.title === 'For Sale').length || 0;
  const forRentCount =
    properties?.filter((p) => p.sale_type?.title === 'For Rent').length || 0;

  // Construct schema data
  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `https://huusy.com/agents/${agent.id}#agent`,
    name: agent.full_name,
    description:
      agent.description ||
      `Professional real estate agent helping clients buy, sell, and rent properties.`,
    image: agent.profile_image_url || '/images/open-graph@2x.webp',
    url: `https://huusy.com/agents/${agent.id}`,
    telephone: agent.phone || undefined,
    email: agent.email || undefined,
    jobTitle: 'Real Estate Agent',
    worksFor: {
      '@type': 'RealEstateOrganization',
      name: agent.agency_name || 'Huusy',
      url: 'https://huusy.com',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Property Sales',
          description: `${forSaleCount} properties for sale`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Property Rentals',
          description: `${forRentCount} properties for rent`,
        },
      },
    ],
  };

  const title = `${agent.full_name} - Real Estate Agent | Huusy`;
  const description =
    agent.description ||
    `Contact ${agent.full_name} from ${agent.agency_name}. Professional real estate agent helping clients buy, sell, and rent properties.`;

  return {
    title,
    description,
    keywords: `${agent.full_name}, ${agent.agency_name}, real estate agent, realtor, property agent`,
    alternates: {
      canonical: `https://huusy.com/agents/${resolvedParams.id}`, // <-- Use resolvedParams
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/agents/${resolvedParams.id}`, // <-- Use resolvedParams
      images: agent.profile_image_url
        ? [
            {
              url: agent.profile_image_url,
              width: 1200,
              height: 630,
              alt: `${agent.full_name} - Real Estate Agent`,
            },
          ]
        : [
            {
              url: '/images/open-graph@2x.webp',
              width: 1200,
              height: 630,
              alt: 'Huusy Real Estate Agent',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: agent.profile_image_url
        ? [agent.profile_image_url]
        : ['/images/open-graph@2x.webp'],
      creator: '@huusy',
      site: '@huusy',
    },
    // Add the schema.org data using the 'other' property
    other: {
      'application/ld+json': JSON.stringify(agentSchema),
    },
  };
}

// Use the specific LayoutProps type for the component
export default async function AgentLayout({ children, params }: LayoutProps) {
  // <-- Use LayoutProps
  // Await the params since it's a Promise in Next.js 15 layouts
  const resolvedParams = await params; // Reinstate await
  console.log('Agent Layout Params:', resolvedParams); // Use resolvedParams
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
