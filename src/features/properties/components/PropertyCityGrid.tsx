'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import { useFilteredProperties } from '../hooks/useFilteredProperties';
import { useFilterStore } from '@/features/filters/store/filterStore';
import { useEffect } from 'react';

interface PropertyCityGridProps {
  properties: Property[];
  cityId: string;
}

export default function PropertyCityGrid({
  properties,
  cityId,
}: PropertyCityGridProps) {
  const setCityId = useFilterStore((state) => state.setCityId);
  const filteredProperties = useFilteredProperties(properties);

  useEffect(() => {
    setCityId(cityId);
  }, [cityId, setCityId]);

  return (
    <div>
      <div className='mb-4 text-sm text-primary-600'>
        {filteredProperties.length} properties found
      </div>
      <div className='space-y-6'>
        {filteredProperties.map((property) => (
          <MainCardWide key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
