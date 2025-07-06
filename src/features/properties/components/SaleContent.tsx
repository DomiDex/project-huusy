'use client';

import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import SaleTypeFilterSidebar from '@/features/filters/components/SaleTypeFilterSidebar';
import PropertySaleGrid from './PropertySaleGrid';
import Pagination from '@/components/ui/Pagination';
import type { SaleType, Property } from '@/types';

interface SaleContentProps {
  saleType: SaleType;
  properties: Property[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}

export default function SaleContent({
  saleType,
  properties,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
}: SaleContentProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl);
  };

  return (
    <Section className='bg-primary-50'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-80'>
          <SaleTypeFilterSidebar saleTypeId={saleType.id} />
        </div>
        <div className='flex-1'>
          <PropertySaleGrid 
            properties={properties} 
            saleTypeId={saleType.id}
            totalCount={totalCount}
            currentPage={currentPage}
          />
          {totalPages > 1 && (
            <div className='mt-8'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
