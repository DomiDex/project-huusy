'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import PropertyGrid from '@/features/properties/components/PropertyGrid';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data } = await supabase.from('properties').select(`
            *,
            property_type:property_type_id (id, title),
            city:city_id (id, title),
            sale_type:sale_type_id (id, title),
            agent:agent_id (
              id,
              full_name,
              agency_name,
              phone,
              profile_image_url
            )
          `);

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
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50'>
        <h1 className='text-4xl font-bold'>Huusy</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Find your perfect home
        </p>
      </Section>

      <Section className='bg-white'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <FilterSidebar />
          </div>
          <div className='flex-1'>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <PropertyGrid properties={properties} />
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
