'use client';

import FilterSection from './FilterSection';
import {
  LocationFilter,
  PriceFilter,
  BedroomsFilter,
  BathroomsFilter,
  PropertyTypeFilter,
} from './filters';
import { useFilterStore } from '../store/filterStore';
import { useEffect } from 'react';

interface SaleTypeFilterSidebarProps {
  saleTypeId: string;
}

export default function SaleTypeFilterSidebar({
  saleTypeId,
}: SaleTypeFilterSidebarProps) {
  const setSaleTypeId = useFilterStore((state) => state.setSaleTypeId);

  useEffect(() => {
    setSaleTypeId(saleTypeId);
  }, [saleTypeId, setSaleTypeId]);

  return (
    <aside className='w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm'>
      <div className='space-y-6'>
        <FilterSection title='Location'>
          <LocationFilter />
        </FilterSection>

        <FilterSection title='Property Type'>
          <PropertyTypeFilter />
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
