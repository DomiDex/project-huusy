'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';

interface PropertyGridProps {
  properties: Property[];
  totalCount?: number;
  currentPage?: number;
  itemsPerPage?: number;
}

export default function PropertyGrid({ 
  properties, 
  totalCount,
  currentPage,
  itemsPerPage 
}: PropertyGridProps) {
  // Calculate showing range for display
  const startItem = totalCount && currentPage && itemsPerPage 
    ? (currentPage - 1) * itemsPerPage + 1 
    : 1;
  const endItem = totalCount && currentPage && itemsPerPage 
    ? Math.min(currentPage * itemsPerPage, totalCount) 
    : properties.length;

  return (
    <div>
      <div className='mb-4 text-sm text-primary-600'>
        {totalCount ? (
          <>
            Showing {startItem}-{endItem} of {totalCount} properties
          </>
        ) : (
          `${properties.length} properties found`
        )}
      </div>
      <div className='space-y-6'>
        {properties.map((property) => (
          <MainCardWide key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
