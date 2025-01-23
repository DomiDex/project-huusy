'use client';

import Section from '@/components/ui/Section';
import CityFilterSidebar from '@/features/filters/components/CityFilterSidebar';
import PropertyCityGrid from './PropertyCityGrid';
import type { City, Property } from '@/types';

interface CityContentProps {
  city: City;
  properties: Property[];
}

export default function CityContent({ city, properties }: CityContentProps) {
  return (
    <Section className='bg-primary-50'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-80'>
          <CityFilterSidebar cityId={city.id} />
        </div>
        <div className='flex-1'>
          <PropertyCityGrid properties={properties} cityId={city.id} />
        </div>
      </div>
    </Section>
  );
}
