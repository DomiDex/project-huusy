import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { SaleType } from '@/types';

async function getSaleTypes() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('sale_types')
    .select('*')
    .order('title')
    .not('og_image_url', 'is', null)
    .not('path', 'is', null);

  // Filter out any sale types without path or og_image_url and ensure type safety
  return (data || []).filter(
    (type): type is SaleType =>
      typeof type.path === 'string' &&
      typeof type.og_image_url === 'string' &&
      type.og_image_url !== null
  );
}

export default async function SaleTypePage() {
  const saleTypes = await getSaleTypes();

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='Sale Types'
          firstPageName='Properties'
          baseUrl='/properties'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Browse Properties by Sale Type
        </h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Explore our properties available for sale, rent, or lease
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {saleTypes.map((type) => (
            <CategoryPropertyCard
              key={type.id}
              title={type.title}
              imageUrl={type.og_image_url}
              href={`/properties/sale/${type.path}`}
              headingLevel='h2'
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
