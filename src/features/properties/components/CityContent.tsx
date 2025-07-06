'use client';

import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import CityFilterSidebar from '@/features/filters/components/CityFilterSidebar';
import PropertyCityGrid from './PropertyCityGrid';
import Pagination from '@/components/ui/Pagination';
import type { City, Property } from '@/types';

interface CityContentProps {
  city: City;
  properties: Property[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}

export default function CityContent({ 
  city, 
  properties,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
}: CityContentProps) {
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
          <CityFilterSidebar cityId={city.id} />
        </div>
        <div className='flex-1'>
          <PropertyCityGrid 
            properties={properties} 
            cityId={city.id}
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
