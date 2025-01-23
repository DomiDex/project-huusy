import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { City } from '@/types';

async function getCities() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('cities')
    .select('*')
    .order('title')
    .not('og_image_url', 'is', null)
    .not('path', 'is', null);

  // Filter out any cities without path or og_image_url and ensure type safety
  return (data || []).filter(
    (city): city is City =>
      typeof city.path === 'string' &&
      typeof city.og_image_url === 'string' &&
      city.og_image_url !== null
  );
}

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='Cities'
          firstPageName='Properties'
          baseUrl='/properties'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Browse Properties by City
        </h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Explore properties across different cities and locations
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
          {cities.map((city) => (
            <CategoryPropertyCard
              key={city.id}
              title={city.title}
              imageUrl={city.og_image_url || ''}
              href={`/properties/cities/${city.path}`}
              headingLevel='h2'
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
