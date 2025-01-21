'use client';

import FilterSection from './FilterSection';
import LocationFilter from './filters/LocationFilter';
import PropertyTypeFilter from './filters/PropertyTypeFilter';
import SaleTypeFilter from './filters/SaleTypeFilter';
import PriceFilter from './filters/PriceFilter';
import BedroomsFilter from './filters/BedroomsFilter';
import BathroomsFilter from './filters/BathroomsFilter';
import MoreFiltersButton from './filters/MoreFiltersButton';

export default function FilterSidebar() {
  return (
    <aside className='w-full md:w-80 bg-white p-6 rounded-2xl shadow-sm'>
      <div className='space-y-6'>
        <FilterSection title='Location'>
          <LocationFilter />
        </FilterSection>

        <FilterSection title='Sale Type'>
          <SaleTypeFilter />
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

        <MoreFiltersButton />
      </div>
    </aside>
  );
}
