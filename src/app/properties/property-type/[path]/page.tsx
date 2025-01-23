import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PropertyTypeContent from '@/features/properties/components/PropertyTypeContent';

interface PropertyTypePageProps {
  params: {
    path: string;
  };
}

async function getPropertyTypeData(path: string) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch property type details
  const { data: typeData } = await supabase
    .from('property_types')
    .select('*')
    .eq('path', path)
    .single();

  if (!typeData) return null;

  // Fetch properties with this property type
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
    .eq('property_type_id', typeData.id);

  return {
    propertyType: typeData,
    properties: propertiesData || [],
  };
}

export default async function PropertyTypePage({
  params,
}: PropertyTypePageProps) {
  const data = await getPropertyTypeData(params.path);

  if (!data) return <div>Property type not found</div>;
  const { propertyType, properties } = data;

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
      />
    </main>
  );
}
