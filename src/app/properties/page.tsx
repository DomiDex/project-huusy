'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import MainCardWide from '@/features/properties/components/MainCardWide';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data } = await supabase.from('properties').select(`
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
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='All Properties'
          firstPageName='Properties'
          baseUrl='/properties'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Browse All Properties
        </h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Explore our complete collection of properties
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-80'>
            <FilterSidebar />
          </div>
          <div className='flex-1'>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className='space-y-6'>
                {properties.map((property) => (
                  <MainCardWide key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
