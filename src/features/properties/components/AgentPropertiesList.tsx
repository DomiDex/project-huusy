'use client';

import { useRouter } from 'next/navigation';
import { Property } from '@/types';
import MainCardWide from './MainCardWide';
import Pagination from '@/components/ui/Pagination';

interface AgentPropertiesListProps {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  forSaleCount: number;
  forRentCount: number;
}

export default function AgentPropertiesList({
  properties,
  totalCount,
  currentPage,
  totalPages,
  forSaleCount,
  forRentCount,
}: AgentPropertiesListProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl);
    
    // Scroll to properties section
    const propertiesSection = document.getElementById('properties-section');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate showing range
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalCount);

  return (
    <div className='space-y-6' id='properties-section'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-medium text-primary-950'>
            Listed Properties
          </h2>
          {totalCount > 0 && (
            <p className='text-sm text-primary-600 mt-1'>
              Showing {startItem}-{endItem} of {totalCount} properties
            </p>
          )}
        </div>
        <div className='flex gap-3'>
          {forSaleCount > 0 && (
            <span className='px-4 py-2 bg-primary-50 text-primary-800 rounded-full text-sm'>
              {forSaleCount} For Sale
            </span>
          )}
          {forRentCount > 0 && (
            <span className='px-4 py-2 bg-secondary-50 text-secondary-800 rounded-full text-sm'>
              {forRentCount} For Rent
            </span>
          )}
        </div>
      </div>
      
      <div className='space-y-4'>
        {properties.map((property) => (
          <MainCardWide key={property.id} property={property} />
        ))}
        {properties.length === 0 && (
          <div className='bg-white rounded-xl shadow-sm border border-primary-100 p-8 text-center'>
            <p className='text-primary-800 text-lg'>
              No properties listed by this agent yet.
            </p>
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className='mt-8'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}