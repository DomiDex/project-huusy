'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import { useFilteredProperties } from '../hooks/useFilteredProperties';
import { useFilterStore } from '@/features/filters/store/filterStore';
import { useEffect } from 'react';

interface PropertySaleGridProps {
  properties: Property[];
  saleTypeId: string;
}

export default function PropertySaleGrid({
  properties,
  saleTypeId,
}: PropertySaleGridProps) {
  const setSaleTypeId = useFilterStore((state) => state.setSaleTypeId);
  const filteredProperties = useFilteredProperties(properties);

  useEffect(() => {
    setSaleTypeId(saleTypeId);
  }, [saleTypeId, setSaleTypeId]);

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
