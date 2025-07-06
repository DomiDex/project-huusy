import { createClient } from '@/utils/supabase/server';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SaleContent from '@/features/properties/components/SaleContent';

interface SaleTypePageProps {
  params: Promise<{
    path: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ITEMS_PER_PAGE = 10;

async function getSaleTypeData(path: string, page: number = 1) {
  const supabase = await createClient();

  // Fetch sale type details
  const { data: saleTypeData } = await supabase
    .from('sale_types')
    .select('*')
    .eq('path', path)
    .single();

  if (!saleTypeData) return null;

  // Get total count
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('sale_type_id', saleTypeData.id);

  // Fetch paginated properties with this sale type
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
    .eq('sale_type_id', saleTypeData.id)
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
    .order('created_at', { ascending: false });

  return {
    saleType: saleTypeData,
    properties: propertiesData || [],
    totalCount: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
}

export default async function SaleTypePage(props: SaleTypePageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const pageParam = searchParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  
  const data = await getSaleTypeData(params.path, isNaN(page) || page < 1 ? 1 : page);

  if (!data) return <div>Sale type not found</div>;
  const { saleType, properties, totalCount, currentPage, totalPages } = data;

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

      <SaleContent 
        saleType={saleType} 
        properties={properties}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
