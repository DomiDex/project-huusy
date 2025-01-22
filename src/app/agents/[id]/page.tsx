import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MainCardWide from '@/features/properties/components/MainCardWide';
import type { AccountPro, Property } from '@/types';
import Image from 'next/image';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

interface AgentPageProps {
  params: {
    id: string;
  };
}

async function getAgentWithProperties(id: string) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch agent details
  const { data: agent } = await supabase
    .from('account_pro')
    .select('*')
    .eq('id', id)
    .single();

  if (!agent) return null;

  // Fetch properties for this agent
  const { data: properties } = await supabase
    .from('properties')
    .select(
      `
      *,
      property_type:property_type_id (*),
      city:city_id (*),
      sale_type:sale_type_id (*),
      agent:agent_id (*)
    `
    )
    .eq('agent_id', id);

  return {
    agent,
    properties: properties || [],
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const data = await getAgentWithProperties(params.id);

  if (!data) {
    return (
      <main className='bg-background min-h-screen'>
        <Section className='bg-primary-50 mt-16'>
          <h1 className='text-4xl font-medium text-primary-950'>
            Agent Not Found
          </h1>
        </Section>
      </main>
    );
  }

  const { agent, properties } = data;

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage={agent.full_name}
          firstPageName='Agents'
          baseUrl='/agents'
        />
        {/* Hero Section */}
        <div className='mt-8 bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='relative h-48 bg-gradient-to-r from-primary-400 to-primary-200'>
            <div className='absolute -bottom-16 left-8'>
              <div className='relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg'>
                <Image
                  src={agent.profile_image_url || '/default-avatar.png'}
                  alt={agent.full_name}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
          <div className='pt-20 pb-8 px-8'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <div>
                <h1 className='text-3xl font-medium text-primary-950'>
                  {agent.full_name}
                </h1>
                <p className='text-lg text-primary-800 mt-1'>
                  {agent.agency_name}
                </p>
              </div>
              <div className='mt-4 md:mt-0'>
                <WhatsAppButton
                  phoneNumber={agent.phone}
                  className='w-full md:w-auto justify-center'
                />
              </div>
            </div>
            {agent.description && (
              <p className='mt-6 text-foreground/80 max-w-3xl'>
                {agent.description}
              </p>
            )}
          </div>
        </div>

        {/* Properties Section */}
        <div className='mt-12'>
          <h2 className='text-2xl font-medium text-primary-950 mb-6'>
            Properties Listed by {agent.full_name}
          </h2>
          <div className='space-y-6'>
            {properties.map((property) => (
              <MainCardWide key={property.id} property={property} />
            ))}
            {properties.length === 0 && (
              <div className='bg-white rounded-lg p-8 text-center'>
                <p className='text-primary-800 text-lg'>
                  No properties listed by this agent yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
