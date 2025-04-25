// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MainCardWide from '@/features/properties/components/MainCardWide';
import Image from 'next/image';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import {
  PhoneIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  HomeIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface AgentPageProps {
  params: {
    id: string;
  };
}

async function getAgentWithProperties(id: string) {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client

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
        <Section className='bg-primary-50/50 mt-16'>
          <div className='max-w-2xl mx-auto text-center'>
            <h1 className='text-4xl font-medium text-primary-950'>
              Agent Not Found
            </h1>
            <p className='mt-4 text-primary-800'>
              The agent you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </Section>
      </main>
    );
  }

  const { agent, properties } = data;
  const forSaleCount = properties.filter(
    (p) => p.sale_type.title === 'For Sale'
  ).length;
  const forRentCount = properties.filter(
    (p) => p.sale_type.title === 'For Rent'
  ).length;

  return (
    <main className='bg-background min-h-screen'>
      {/* Hero Section */}
      <div className='h-[400px] bg-primary-50 relative '>
        <div className='absolute inset-0 bg-[url("/patterns/texture.png")] opacity-20' />
        <div className='absolute inset-0 bg-gradient-to-t to-transparent' />
        <Section className='relative z-10 h-full'>
          <div className='h-full flex flex-col justify-between py-[2.5rem] space-y-8'>
            <Breadcrumb
              currentPage={agent.full_name}
              firstPageName='Agents'
              baseUrl='/agents'
              className='text-primary-600 mt-16'
            />
            <div className='flex items-end gap-8'>
              <div className='relative w-40 h-40 rounded-2xl overflow-hidden ring-2 ring-white shadow-xl'>
                <Image
                  src={agent.profile_image_url || '/default-avatar.png'}
                  alt={agent.full_name}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <div className='mb-4'>
                <h1 className='text-4xl font-medium text-primary-950'>
                  {agent.full_name}
                </h1>
                <p className='text-xl text-primary-600 mt-2'>
                  {agent.agency_name}
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Stats Bar */}
      <div className='bg-white border-b border-primary-100'>
        <Section>
          <div className='grid grid-cols-3 -mt-8'>
            {[
              {
                icon: HomeIcon,
                label: 'Total Properties',
                value: properties.length,
              },
              { icon: TagIcon, label: 'For Sale', value: forSaleCount },
              { icon: UserGroupIcon, label: 'For Rent', value: forRentCount },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className='flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm'
              >
                <div className='w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center'>
                  <Icon className='w-6 h-6 text-primary-600' />
                </div>
                <div>
                  <p className='text-2xl font-medium text-primary-950'>
                    {value}
                  </p>
                  <p className='text-sm text-primary-800'>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Main Content */}
      <Section className='py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <div className='bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden sticky top-20'>
              <div className='p-6'>
                <h3 className='text-lg font-medium text-primary-950 mb-4'>
                  Contact Information
                </h3>
                <div className='space-y-4'>
                  {[
                    { icon: BuildingOfficeIcon, value: agent.agency_name },
                    { icon: PhoneIcon, value: agent.phone },
                    { icon: EnvelopeIcon, value: agent.email },
                  ].map(({ icon: Icon, value }) => (
                    <div
                      key={value}
                      className='flex items-center gap-3 text-primary-800'
                    >
                      <Icon className='w-5 h-5 text-primary-600' />
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                <WhatsAppButton
                  phoneNumber={agent.phone}
                  className='w-full justify-center mt-8 bg-primary-600 hover:bg-primary-700'
                />
              </div>
            </div>
          </div>

          {/* Properties */}
          <div className='lg:col-span-2 space-y-8'>
            {agent.description && (
              <div className='bg-white rounded-xl shadow-sm border border-primary-100 p-6'>
                <h2 className='text-2xl font-medium text-primary-950 mb-4'>
                  About Me
                </h2>
                <p className='text-primary-800 leading-relaxed'>
                  {agent.description}
                </p>
              </div>
            )}

            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-medium text-primary-950'>
                  Listed Properties
                </h2>
                <div className='flex gap-3'>
                  {forSaleCount > 0 && (
                    <span className='px-4 py-2 bg-primary-50 text-primary-800 rounded-full text-sm'>
                      {forSaleCount} For Sale
                    </span>
                  )}
                  {forRentCount > 0 && (
                    <span className='px-4 py-2 bg-secondary-50 text-secondary-800 rounded-full text-sm'>
                      {forRentCount} For Rent
                    </span>
                  )}
                </div>
              </div>
              <div className='space-y-4'>
                {properties.map((property) => (
                  <MainCardWide key={property.id} property={property} />
                ))}
                {properties.length === 0 && (
                  <div className='bg-white rounded-xl shadow-sm border border-primary-100 p-8 text-center'>
                    <p className='text-primary-800 text-lg'>
                      No properties listed by this agent yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
