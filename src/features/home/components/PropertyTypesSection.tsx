'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { createClient } from '@/utils/supabase/client';
import CategoryPropertyCard from '@/features/properties/components/CategoryPropertyCard';
import type { PropertyType } from '@/types';

export default function PropertyTypesSection() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);

  useEffect(() => {
    async function fetchPropertyTypes() {
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
    }

    fetchPropertyTypes();
  }, []);

  return (
    <Section className='bg-primary-50 px-8'>
      <div className='flex flex-col gap-12'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-medium text-primary-950'>
              Browse by Property Type
            </h2>
            <p className='text-foreground/80 mt-2 text-lg'>
              Discover properties that match your specific needs
            </p>
          </div>
          <Link
            href='/properties/property-type'
            className='text-secondary-600 hover:text-secondary-700 font-medium'
          >
            See all types →
          </Link>
        </div>

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
      </div>
    </Section>
  );
}
