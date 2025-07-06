'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/types';
import { usePropertySearch } from '@/features/search/hooks/usePropertySearch';
import { useSearchStore } from '@/features/search/store/searchStore';
import Section from '@/components/ui/Section';
import MainCardWide from '@/features/properties/components/MainCardWide';
import VerticalTabSearchBar from '@/features/search/components/VerticalTabSearchBar';
import Pagination from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 10;

function SearchContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();
  const { searchProperties, isLoading } = usePropertySearch();
  const { setSearchTerm, setSaleType } = useSearchStore();
  
  const { 
    currentPage, 
    totalPages,
    goToPage 
  } = usePagination({ 
    totalItems: totalCount, 
    itemsPerPage: ITEMS_PER_PAGE 
  });

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as 'rent' | 'sale' | null;

    setSearchTerm(query);
    setSaleType(type);

    searchProperties(query, type, currentPage, ITEMS_PER_PAGE).then((results) => {
      setProperties(results.properties);
      setTotalCount(results.totalCount);
    });
  }, [searchParams, searchProperties, setSearchTerm, setSaleType, currentPage]);

  // Reset to page 1 when search params change
  const searchQuery = searchParams.get('q');
  const searchType = searchParams.get('type');
  
  useEffect(() => {
    goToPage(1);
  }, [searchQuery, searchType, goToPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Calculate showing range
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <>
      <Section
        className=' px-4 sm:px-6 lg:px-4'
        containerClassName='container mx-auto pt-16'
      >
        <h1 className='text-4xl font-medium text-primary-950 mb-4'>
          Search Results: {searchParams.get('q')}
        </h1>
        <p className='text-primary-600 mt-4 text-lg'>
          {totalCount > 0 ? (
            <>Showing {startItem}-{endItem} of {totalCount} properties</>
          ) : (
            'No properties found'
          )}
        </p>
      </Section>

      <Section className='py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <VerticalTabSearchBar />
          </div>
          <div className='flex-1'>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className='space-y-6'>
                  {properties.map((property) => (
                    <MainCardWide key={property.id} property={property} />
                  ))}
                  {properties.length === 0 && (
                    <p className='text-primary-600'>No properties found.</p>
                  )}
                </div>
                {totalPages > 1 && (
                  <div className='mt-8'>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={goToPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className='bg-background min-h-screen'>
      <div className='bg-primary-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Suspense fallback={<div>Loading search results...</div>}>
            <SearchContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
