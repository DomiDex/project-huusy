import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { PropertyType } from '@/types';

async function getPropertyTypes() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('property_types')
    .select('*')
    .order('title');

  // Filter out any property types without path or og_image_url
  return (data || []).filter(
    (type): type is PropertyType =>
      typeof type.path === 'string' && typeof type.og_image_url === 'string'
  );
}

export default async function PropertyTypePage() {
  const propertyTypes = await getPropertyTypes();

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='Property Types'
          firstPageName='Properties'
          baseUrl='/properties'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Browse Properties by Type
        </h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Explore our diverse collection of properties across different
          categories
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {propertyTypes.map((type) => (
            <CategoryPropertyCard
              key={type.id}
              title={type.title}
              imageUrl={type.og_image_url}
              href={`/properties/property-type/${type.path}`}
              headingLevel='h2'
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
