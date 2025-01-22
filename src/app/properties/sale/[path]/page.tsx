import { use } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MainCardWide from '@/features/properties/components/MainCardWide';
import SaleTypeFilterSidebar from '@/features/filters/components/SaleTypeFilterSidebar';

interface SaleTypePageProps {
  params: {
    path: string;
  };
}

async function getSaleTypeData(path: string) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch sale type details
  const { data: saleTypeData } = await supabase
    .from('sale_types')
    .select('*')
    .eq('path', path)
    .single();

  if (!saleTypeData) return null;

  // Fetch properties with this sale type
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
    .eq('sale_type_id', saleTypeData.id);

  return {
    saleType: saleTypeData,
    properties: propertiesData || [],
  };
}

export default function SaleTypePage({ params }: SaleTypePageProps) {
  const data = use(Promise.resolve(getSaleTypeData(params.path)));

  if (!data) return <div>Sale type not found</div>;
  const { saleType, properties } = data;

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16 text-primary-950'>
        <Breadcrumb
          currentPage={saleType.title}
          firstPageName='Sale Types'
          baseUrl='/properties/sale'
        />
        <h1 className='text-4xl font-medium mt-4'>{saleType.title}</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Browse all properties for {saleType.title.toLowerCase()}
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <SaleTypeFilterSidebar saleTypeId={saleType.id} />
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
