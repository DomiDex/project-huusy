import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MainCardSmall from '@/features/properties/components/MainCardSmall';
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertyInfo from '@/features/properties/components/PropertyInfo';
import AgentSidebar from '@/features/properties/components/AgentSidebar';

interface PropertyDetailsPageProps {
  params: {
    path: string;
  };
}

async function getPropertyData(path: string) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch property details
  const { data: property } = await supabase
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
    .eq('path', path)
    .single();

  if (!property) return null;

  // Fetch related properties
  const { data: relatedProperties } = await supabase
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
    .eq('city_id', property.city_id)
    .neq('id', property.id)
    .limit(3);

  return {
    property,
    relatedProperties: relatedProperties || [],
  };
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const data = await getPropertyData(params.path);

  if (!data) {
    return (
      <main className='bg-background min-h-screen'>
        <Section className='bg-primary-50 mt-16'>
          <div className='max-w-2xl mx-auto text-center'>
            <h1 className='text-4xl font-medium text-primary-950'>
              Property Not Found
            </h1>
            <p className='mt-4 text-primary-800'>
              The property you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
          </div>
        </Section>
      </main>
    );
  }

  const { property, relatedProperties } = data;

  return (
    <main className='bg-background min-h-screen'>
      <section className='min-h-screen pt-32 pb-8 px-4 md:px-8'>
        <div className='w-full max-w-[1400px] mx-auto'>
          <Breadcrumb
            currentPage={property.property_name}
            firstPageName='Properties'
            baseUrl='/properties'
          />

          <div className='flex flex-col lg:flex-row gap-8 mt-8'>
            <div className='flex-1'>
              <PropertyGallery
                images={property.images}
                propertyName={property.property_name}
              />
              <PropertyInfo property={property} />
            </div>
            <AgentSidebar property={property} />
          </div>
        </div>
      </section>

      {relatedProperties.length > 0 && (
        <section className='pb-16 px-4 md:px-8'>
          <div className='w-full max-w-[1400px] mx-auto'>
            <h2 className='text-2xl font-heading text-primary-950 mb-8'>
              Similar Properties in {property.city.title}
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {relatedProperties.map((property) => (
                <MainCardSmall key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
