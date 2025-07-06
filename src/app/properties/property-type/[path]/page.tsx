import { createClient } from '@/utils/supabase/server';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PropertyTypeContent from '@/features/properties/components/PropertyTypeContent';

interface PropertyTypePageProps {
  params: Promise<{
    path: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ITEMS_PER_PAGE = 10;

async function getPropertyTypeData(path: string, page: number = 1) {
  const supabase = await createClient();

  // Fetch property type details
  const { data: typeData } = await supabase
    .from('property_types')
    .select('*')
    .eq('path', path)
    .single();

  if (!typeData) return null;

  // Get total count
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('property_type_id', typeData.id);

  // Fetch paginated properties with this property type
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
    .eq('property_type_id', typeData.id)
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
    .order('created_at', { ascending: false });

  return {
    propertyType: typeData,
    properties: propertiesData || [],
    totalCount: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
}

export default async function PropertyTypePage(props: PropertyTypePageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const pageParam = searchParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  
  const data = await getPropertyTypeData(params.path, isNaN(page) || page < 1 ? 1 : page);

  if (!data) return <div>Property type not found</div>;
  const { propertyType, properties, totalCount, currentPage, totalPages } = data;

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16 text-primary-950'>
        <Breadcrumb
          currentPage={propertyType.title}
          firstPageName='Property Types'
          baseUrl='/properties/property-type'
        />
        <h1 className='text-4xl font-medium mt-4'>{propertyType.title}</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Browse all {propertyType.title.toLowerCase()} properties
        </p>
      </Section>

      <PropertyTypeContent
        propertyType={propertyType}
        properties={properties}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
