// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CityContent from '@/features/properties/components/CityContent';

interface CityPageProps {
  params: { path: string };
}

async function getCityData(path: string) {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client

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

export default async function CityPage({ params }: CityPageProps) {
  const data = await getCityData(params.path);

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

      <CityContent city={city} properties={properties} />
    </main>
  );
}
