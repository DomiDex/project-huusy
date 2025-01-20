'use client';

import { useEffect, useCallback, useState } from 'react';
import WelcomeHeader from '@/features/dashboard-pro/components/WelcomeHeader';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/types';
import PropertyProCard from '@/features/properties/components/PropertyProCard';
import Section from '@/components/ui/Section';

export default function Page() {
  const [properties, setProperties] = useState<Property[]>([]);
  const supabase = createClient();

  const fetchProperties = useCallback(async () => {
    const { data: user } = await supabase.auth.getUser();
    console.log('Current user:', user);

    if (!user.user?.id) return;

    const { data, error } = await supabase
      .from('properties')
      .select(
        `
        id,
        property_name,
        price,
        bedrooms,
        bathrooms,
        property_size,
        address,
        images,
        created_at,
        updated_at,
        property_type_id,
        city_id,
        sale_type_id,
        excerpt,
        property_details,
        meta_title,
        meta_description,
        agent_id,
        property_type:property_type_id (id, title),
        city:city_id (id, title),
        sale_type:sale_type_id (id, title)
      `
      )
      .eq('agent_id', user.user.id)
      .order('created_at', { ascending: false });

    console.log('Properties data:', data);
    console.log('Query error:', error);

    if (data) setProperties(data);
  }, [supabase]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div>
      <WelcomeHeader />
      <Section className='px-8'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-medium text-primary-950'>
              Your Properties
            </h2>
          </div>
          <div className='grid grid-cols-1 gap-6'>
            {properties.map((property) => (
              <PropertyProCard
                key={property.id}
                property={property}
                onDelete={fetchProperties}
              />
            ))}
            {properties.length === 0 && (
              <p className='text-primary-600'>No properties found.</p>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
