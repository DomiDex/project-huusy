'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';
import MainCardSmall from '@/features/properties/components/MainCardSmall';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProperties() {
      try {
        const { data } = await supabase
          .from('properties')
          .select(
            `
            *,
            property_type:property_type_id (*),
            city:city_id (*),
            sale_type:sale_type_id (*),
            agent:agent_id (
              id,
              full_name,
              agency_name,
              phone,
              profile_image_url
            )
          `
          )
          .limit(8);

        if (data) {
          setProperties(data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <Section className='bg-primary-50 px-8 py-12 md:py-16 lg:py-24'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-medium text-primary-950'>
              Featured Properties
            </h2>
            <p className='text-primary-800 mt-2'>
              Discover our handpicked selection of properties
            </p>
          </div>
          <Link
            href='/properties'
            className='inline-flex items-center px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors duration-300'
          >
            View All Properties
            <span className='ml-2' aria-hidden='true'>
              →
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='aspect-[4/5] bg-primary-100 animate-pulse rounded-2xl'
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {properties.map((property) => (
              <MainCardSmall key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
