'use client';

import Section from '@/components/ui/Section';
import PropertyTypeFilterSidebar from '@/features/filters/components/PropertyTypeFilterSidebar';
import PropertyTypeGrid from './PropertyTypeGrid';
import type { PropertyType, Property } from '@/types';

interface PropertyTypeContentProps {
  propertyType: PropertyType;
  properties: Property[];
}

export default function PropertyTypeContent({
  propertyType,
  properties,
}: PropertyTypeContentProps) {
  return (
    <Section className='bg-primary-50'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-80'>
          <PropertyTypeFilterSidebar propertyTypeId={propertyType.id} />
        </div>
        <div className='flex-1'>
          <PropertyTypeGrid
            properties={properties}
            propertyTypeId={propertyType.id}
          />
        </div>
      </div>
    </Section>
  );
}
