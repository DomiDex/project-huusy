import { ReactNode } from 'react';
import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { AccountPro } from '@/types';

type Props = {
  children: ReactNode;
  params: { id: string };
};

async function getAgent(id: string): Promise<AccountPro | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('account_pro')
    .select('*')
    .eq('id', id)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = await getAgent(params.id);

  if (!agent) {
    return {
      title: 'Agent Not Found | Huusy',
      description: 'The requested agent profile could not be found.',
    };
  }

  const title = `${agent.full_name} - Real Estate Agent | Huusy`;
  const description =
    agent.description ||
    `Contact ${agent.full_name} from ${agent.agency_name}. Professional real estate agent helping clients buy, sell, and rent properties.`;

  return {
    title,
    description,
    keywords: `${agent.full_name}, ${agent.agency_name}, real estate agent, realtor, property agent`,
    alternates: {
      canonical: `https://huusy.com/agents/${params.id}`,
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      siteName: 'Huusy - Real Estate Marketplace',
      url: `https://huusy.com/agents/${params.id}`,
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
  };
}

export default function AgentLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
