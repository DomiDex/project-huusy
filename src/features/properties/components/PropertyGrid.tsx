'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import { useFilteredProperties } from '../hooks/useFilteredProperties';

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const filteredProperties = useFilteredProperties(properties);

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
