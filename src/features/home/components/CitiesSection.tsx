'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { createClient } from '@/utils/supabase/client';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { City } from '@/types';

export default function CitiesSection() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    async function fetchCities() {
      const supabase = createClient();
      const { data } = await supabase
        .from('cities')
        .select('*')
        .order('title')
        .not('og_image_url', 'is', null)
        .not('path', 'is', null)
        .limit(8);

      if (data) {
        const filteredCities = data.filter(
          (city): city is City =>
            typeof city.path === 'string' &&
            typeof city.og_image_url === 'string' &&
            city.og_image_url !== null
        );
        setCities(filteredCities);
      }
    }

    fetchCities();
  }, []);

  return (
    <Section className='bg-primary-100 px-8 py-12 md:py-16 lg:py-24 relative z-10'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-medium text-primary-950'>
              Browse by City
            </h2>
            <p className='text-primary-800  mt-2 '>
              Find properties in your preferred location
            </p>
          </div>
          <Link
            href='/properties/cities'
            className='inline-flex items-center px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors duration-300'
          >
            See all cities
            <span className='ml-2' aria-hidden='true'>
              →
            </span>
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {cities.map((city) => (
            <CategoryPropertyCard
              key={city.id}
              title={city.title}
              imageUrl={city.og_image_url || ''}
              href={`/properties/cities/${city.path}`}
              headingLevel='h3'
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
