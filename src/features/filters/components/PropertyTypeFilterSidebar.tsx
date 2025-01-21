'use client';

import FilterSection from './FilterSection';
import {
  LocationFilter,
  PriceFilter,
  BedroomsFilter,
  BathroomsFilter,
  SaleTypeFilter,
} from './filters';
import { useFilterStore } from '../store/filterStore';
import { useEffect } from 'react';

interface PropertyTypeFilterSidebarProps {
  propertyTypeId: string;
}

export default function PropertyTypeFilterSidebar({
  propertyTypeId,
}: PropertyTypeFilterSidebarProps) {
  const setPropertyTypeIds = useFilterStore(
    (state) => state.setPropertyTypeIds
  );

  // Set the property type ID in the filter store when component mounts
  useEffect(() => {
    setPropertyTypeIds([propertyTypeId]);
  }, [propertyTypeId, setPropertyTypeIds]);

  return (
    <aside className='w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm'>
      <div className='space-y-6'>
        <FilterSection title='Location'>
          <LocationFilter />
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
