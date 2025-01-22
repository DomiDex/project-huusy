import { use } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MainCardWide from '@/features/properties/components/MainCardWide';
import CityFilterSidebar from '@/features/filters/components/CityFilterSidebar';

interface CityPageProps {
  params: {
    path: string;
  };
}

async function getCityData(path: string) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch city details
  const { data: cityData } = await supabase
    .from('cities')
    .select('*')
    .eq('path', path)
    .single();

  if (!cityData) return null;

  // Fetch properties in this city
  const { data: propertiesData } = await supabase
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
    .eq('city_id', cityData.id);

  return {
    city: cityData,
    properties: propertiesData || [],
  };
}

export default function CityPage({ params }: CityPageProps) {
  const data = use(Promise.resolve(getCityData(params.path)));

  if (!data) return <div>City not found</div>;
  const { city, properties } = data;

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16 text-primary-950'>
        <Breadcrumb
          currentPage={city.title}
          firstPageName='Cities'
          baseUrl='/properties/cities'
        />
        <h1 className='text-4xl font-medium mt-4'>{city.title}</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Browse all properties in {city.title}
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <CityFilterSidebar cityId={city.id} />
          </div>
          <div className='flex-1'>
            <div className='space-y-6'>
              {properties.map((property) => (
                <MainCardWide key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
