'use client';

import FilterSection from './FilterSection';
import {
  PriceFilter,
  BedroomsFilter,
  BathroomsFilter,
  SaleTypeFilter,
  PropertyTypeFilter,
} from './filters';
import { useFilterStore } from '../store/filterStore';
import { useEffect } from 'react';

interface CityFilterSidebarProps {
  cityId: string;
}

export default function CityFilterSidebar({ cityId }: CityFilterSidebarProps) {
  const setCityId = useFilterStore((state) => state.setCityId);

  useEffect(() => {
    setCityId(cityId);
  }, [cityId, setCityId]);

  return (
    <aside className='w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm'>
      <div className='space-y-6'>
        <FilterSection title='Property Type'>
          <PropertyTypeFilter />
        </FilterSection>

        <FilterSection title='Sale Type'>
          <SaleTypeFilter />
        </FilterSection>

        <FilterSection title='Price Range'>
          <PriceFilter />
        </FilterSection>

        <FilterSection title='Bedrooms'>
          <BedroomsFilter />
        </FilterSection>

        <FilterSection title='Bathrooms'>
          <BathroomsFilter />
        </FilterSection>
      </div>
    </aside>
  );
}
