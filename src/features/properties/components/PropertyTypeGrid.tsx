'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import { useFilteredProperties } from '../hooks/useFilteredProperties';
import { useFilterStore } from '@/features/filters/store/filterStore';
import { useEffect } from 'react';

interface PropertyTypeGridProps {
  properties: Property[];
  propertyTypeId: string;
}

export default function PropertyTypeGrid({
  properties,
  propertyTypeId,
}: PropertyTypeGridProps) {
  const setPropertyTypeIds = useFilterStore(
    (state) => state.setPropertyTypeIds
  );
  const filteredProperties = useFilteredProperties(properties);

  useEffect(() => {
    setPropertyTypeIds([propertyTypeId]);
  }, [propertyTypeId, setPropertyTypeIds]);

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
