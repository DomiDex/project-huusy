'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { createClient } from '@/utils/supabase/client';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { PropertyType } from '@/types';

export default function PropertyTypesSection() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPropertyTypes() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('property_types')
          .select('*')
          .order('title')
          .not('og_image_url', 'is', null)
          .not('path', 'is', null)
          .limit(6);

        if (data) {
          const filteredTypes = data.filter(
            (type): type is PropertyType =>
              typeof type.path === 'string' &&
              typeof type.og_image_url === 'string' &&
              type.og_image_url !== null
          );
          setPropertyTypes(filteredTypes);
        }
      } catch (error) {
        console.error('Error fetching property types:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPropertyTypes();
  }, []);

  return (
    <Section className='bg-primary-50 px-8 py-12 md:py-16 lg:py-24 relative z-10'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-medium text-primary-950'>
              Browse by Property Type
            </h2>
            <p className='text-primary-800 mt-2'>
              Discover properties that match your specific needs
            </p>
          </div>
          <Link
            href='/properties/property-type'
            className='inline-flex items-center px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors duration-300'
          >
            See all types
            <span className='ml-2' aria-hidden='true'>
              →
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='aspect-[4/3] bg-primary-100 animate-pulse rounded-2xl'
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {propertyTypes.map((type) => (
              <CategoryPropertyCard
                key={type.id}
                title={type.title}
                imageUrl={type.og_image_url}
                href={`/properties/property-type/${type.path}`}
                headingLevel='h3'
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
