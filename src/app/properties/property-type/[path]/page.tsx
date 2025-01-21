import { use } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import MainCardWide from '@/features/properties/components/MainCardWide';
import PropertyTypeFilterSidebar from '@/features/filters/components/PropertyTypeFilterSidebar';

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

export default function PropertyTypePage({ params }: PropertyTypePageProps) {
  const data = use(Promise.resolve(getPropertyTypeData(params.path)));

  if (!data) return <div>Property type not found</div>;
  const { propertyType, properties } = data;

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16 text-primary-950'>
        <h1 className='text-4xl font-medium'>{propertyType.title}</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Browse all {propertyType.title.toLowerCase()} properties
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <PropertyTypeFilterSidebar propertyTypeId={propertyType.id} />
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
