'use client';

import Section from '@/components/ui/Section';
import SaleTypeFilterSidebar from '@/features/filters/components/SaleTypeFilterSidebar';
import PropertySaleGrid from './PropertySaleGrid';
import type { SaleType, Property } from '@/types';

interface SaleContentProps {
  saleType: SaleType;
  properties: Property[];
}

export default function SaleContent({
  saleType,
  properties,
}: SaleContentProps) {
  return (
    <Section className='bg-primary-50'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-80'>
          <SaleTypeFilterSidebar saleTypeId={saleType.id} />
        </div>
        <div className='flex-1'>
          <PropertySaleGrid properties={properties} saleTypeId={saleType.id} />
        </div>
      </div>
    </Section>
  );
}
