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
    <Section className='bg-primary-100 px-8'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-medium text-primary-950'>
              Browse by City
            </h2>
            <p className='text-foreground/80 mt-2 text-lg'>
              Find properties in your preferred location
            </p>
          </div>
          <Link
            href='/properties/cities'
            className='text-secondary-600 hover:text-secondary-700 font-medium'
          >
            See all cities →
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
