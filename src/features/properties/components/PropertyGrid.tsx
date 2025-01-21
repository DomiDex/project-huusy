'use client';

import { Property } from '@/types';
import MainCardSmall from './MainCardSmall';
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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredProperties.map((property) => (
          <MainCardSmall key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
