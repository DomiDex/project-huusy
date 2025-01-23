'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import PropertyTypesSection from '@/features/home/components/PropertyTypesSection';

export default function Home() {
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
          .limit(6);

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
        <div className='text-center max-w-3xl mx-auto'>
          <h1 className='text-5xl font-bold text-primary-950'>
            Find Your Dream Home
          </h1>
          <p className='text-foreground/80 mt-6 text-xl'>
            Discover the perfect property that matches your lifestyle and
            preferences
          </p>
        </div>
      </Section>

      <PropertyTypesSection />
    </main>
  );
}
