'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/types';
import { usePropertySearch } from '@/features/search/hooks/usePropertySearch';
import { useSearchStore } from '@/features/search/store/searchStore';
import Section from '@/components/ui/Section';
import MainCardWide from '@/features/properties/components/MainCardWide';
import VerticalTabSearchBar from '@/features/search/components/VerticalTabSearchBar';

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const searchParams = useSearchParams();
  const { searchProperties, isLoading } = usePropertySearch();
  const { setSearchTerm, setSaleType } = useSearchStore();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as 'rent' | 'sale' | null;

    const performSearch = async () => {
      setSearchTerm(query);
      setSaleType(type);
      const results = await searchProperties(query, type);
      setProperties(results);
    };

    performSearch();
  }, [searchParams]);

  return (
    <main className='bg-background min-h-screen'>
      <div className='bg-primary-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-16'>
          <Section className='pt-24 pb-8'>
            <h1 className='text-4xl font-medium text-primary-950 mb-4'>
              Search Results: {searchParams.get('q')}
            </h1>
            <p className='text-primary-600 mt-4 text-lg'>
              {properties.length} properties found
            </p>
          </Section>
        </div>
      </div>

      <div className='bg-primary-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Section className='py-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-80'>
                <VerticalTabSearchBar />
              </div>
              <div className='flex-1'>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div className='space-y-6'>
                    {properties.map((property) => (
                      <MainCardWide key={property.id} property={property} />
                    ))}
                    {properties.length === 0 && (
                      <p className='text-primary-600'>No properties found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
