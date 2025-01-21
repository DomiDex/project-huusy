'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import MainCardWide from '@/features/properties/components/MainCardWide';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const [featuredProperty, setFeaturedProperty] = useState<Property | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    async function fetchFeaturedProperty() {
      const { data } = await supabase
        .from('properties')
        .select(
          `
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
        `
        )
        .limit(1)
        .single();

      if (data) {
        setFeaturedProperty(data);
      }
    }

    fetchFeaturedProperty();
  }, []);

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50'>
        <h1 className='text-4xl font-bold'>Huusy</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Connecting homeowners with trusted professionals
        </p>
        {featuredProperty && <MainCardWide property={featuredProperty} />}
      </Section>

      <Section className='bg-white' containerClassName='max-w-6xl'>
        <h2 className='text-foreground text-3xl font-bold'>Our Services</h2>
        <p className='text-foreground/80 mt-4'>
          Find the perfect professional for your home improvement needs
        </p>
      </Section>

      <Section className='bg-secondary-50'>
        <h2 className='text-foreground text-3xl font-bold'>Why Choose Us</h2>
        <p className='text-foreground/80 mt-4'>
          Trusted by thousands of homeowners and professionals
        </p>
      </Section>
    </main>
  );
}
