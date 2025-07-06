'use client';

import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import { useFilterStore } from '@/features/filters/store/filterStore';
import { useEffect } from 'react';

interface PropertySaleGridProps {
  properties: Property[];
  saleTypeId: string;
  totalCount?: number;
  currentPage?: number;
}

export default function PropertySaleGrid({
  properties,
  saleTypeId,
  totalCount,
  currentPage = 1,
}: PropertySaleGridProps) {
  const setSaleTypeId = useFilterStore((state) => state.setSaleTypeId);

  useEffect(() => {
    setSaleTypeId(saleTypeId);
  }, [saleTypeId, setSaleTypeId]);

  // Calculate showing range
  const itemsPerPage = 10;
  const startItem = totalCount ? (currentPage - 1) * itemsPerPage + 1 : 1;
  const endItem = totalCount 
    ? Math.min(currentPage * itemsPerPage, totalCount) 
    : properties.length;

  return (
    <div>
      <div className='mb-4 text-sm text-primary-600'>
        {totalCount ? (
          <>Showing {startItem}-{endItem} of {totalCount} properties</>
        ) : (
          `${properties.length} properties found`
        )}
      </div>
      <div className='space-y-6'>
        {properties.map((property) => (
          <MainCardWide key={property.id} property={property} />
        ))}
        {properties.length === 0 && (
          <p className='text-primary-600'>No properties found for this sale type.</p>
        )}
      </div>
    </div>
  );
}
