import { createClient } from '@/utils/supabase/server';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CityContent from '@/features/properties/components/CityContent';

interface CityPageProps {
  params: Promise<{ path: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ITEMS_PER_PAGE = 10;

async function getCityData(path: string, page: number = 1) {
  const supabase = await createClient();

  // Fetch city details
  const { data: cityData } = await supabase
    .from('cities')
    .select('*')
    .eq('path', path)
    .single();

  if (!cityData) return null;

  // Get total count
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('city_id', cityData.id);

  // Fetch paginated properties in this city
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
    .eq('city_id', cityData.id)
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
    .order('created_at', { ascending: false });

  return {
    city: cityData,
    properties: propertiesData || [],
    totalCount: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
}

export default async function CityPage(props: CityPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const pageParam = searchParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  
  const data = await getCityData(params.path, isNaN(page) || page < 1 ? 1 : page);

  if (!data) return <div>City not found</div>;
  const { city, properties, totalCount, currentPage, totalPages } = data;

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

      <CityContent 
        city={city} 
        properties={properties}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
