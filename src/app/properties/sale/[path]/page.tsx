// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SaleContent from '@/features/properties/components/SaleContent';

interface SaleTypePageProps {
  params: {
    path: string;
  };
}

async function getSaleTypeData(path: string) {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client

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

export default async function SaleTypePage({ params }: SaleTypePageProps) {
  const data = await getSaleTypeData(params.path);

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

      <SaleContent saleType={saleType} properties={properties} />
    </main>
  );
}
