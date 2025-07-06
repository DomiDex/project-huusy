import { createClient } from '@/utils/supabase/server';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AgentPropertiesList from '@/features/properties/components/AgentPropertiesList';
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

const ITEMS_PER_PAGE = 10;

async function getAgentWithProperties(id: string, page: number = 1) {
  const supabase = await createClient();

  // Fetch agent details
  const { data: agent } = await supabase
    .from('account_pro')
    .select('*')
    .eq('id', id)
    .single();

  if (!agent) return null;

  // Get total count of properties
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('agent_id', id);

  // Fetch paginated properties for this agent
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
    .eq('agent_id', id)
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
    .order('created_at', { ascending: false });

  // Get counts for sale types
  const { data: allProperties } = await supabase
    .from('properties')
    .select(`
      id,
      sale_type:sale_type_id (
        title
      )
    `)
    .eq('agent_id', id);

  type PropertyWithSaleType = {
    id: string;
    sale_type: { title: string } | null;
  };

  const typedProperties = allProperties as PropertyWithSaleType[] | null;

  const forSaleCount = typedProperties?.filter(
    (p) => p.sale_type?.title === 'For Sale'
  ).length || 0;
  const forRentCount = typedProperties?.filter(
    (p) => p.sale_type?.title === 'For Rent'
  ).length || 0;

  return {
    agent,
    properties: properties || [],
    totalCount: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
    forSaleCount,
    forRentCount,
  };
}

export default async function AgentPage(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const pageParam = searchParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  
  const data = await getAgentWithProperties(params.id, isNaN(page) || page < 1 ? 1 : page);

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

  const { agent, properties, totalCount, currentPage, totalPages, forSaleCount, forRentCount } = data;

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
                value: totalCount,
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

            <AgentPropertiesList
              properties={properties}
              totalCount={totalCount}
              currentPage={currentPage}
              totalPages={totalPages}
              forSaleCount={forSaleCount}
              forRentCount={forRentCount}
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
