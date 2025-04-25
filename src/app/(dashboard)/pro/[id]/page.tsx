'use client';

import { useEffect, useCallback, useState } from 'react';
import WelcomeHeader from '@/features/dashboard-pro/components/WelcomeHeader';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/types';
import PropertyProCard from '@/features/properties/components/PropertyProCard';
import Section from '@/components/ui/Section';
import PropertyProCardSkeleton from '@/features/properties/skeleton/PropertyProCardSkeleton';
import { useParams } from 'next/navigation';

// Define type for data fetched from Supabase before transformation
type FetchedProperty = Omit<
  Property,
  'path' | 'agent' | 'property_type' | 'city' | 'sale_type'
> & {
  agent_id: string;
  property_type_id: string;
  city_id: string;
  sale_type_id: string;
  // Explicitly selected nested objects (can be null from Supabase)
  property_type: { id: string; title: string } | null;
  city: { id: string; title: string } | null;
  sale_type: { id: string; title: string } | null;
};

export default function ProDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const params = useParams();

  const fetchAgentAndProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = params.id as string;
      if (!userId) {
        console.error('Agent ID not found in URL');
        return;
      }

      const { data: agentData, error: agentError } = await supabase
        .from('account_pro')
        .select('*')
        .eq('id', userId)
        .single();

      if (agentError || !agentData) {
        console.error('Error fetching agent details:', agentError);
        setIsLoading(false);
        return;
      }

      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select(
          `
          *,
          property_type:property_type_id (id, title),
          city:city_id (id, title),
          sale_type:sale_type_id (id, title)
        `
        )
        .eq('agent_id', userId)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        console.error('Error fetching properties:', propertiesError);
        setIsLoading(false);
        return;
      }

      if (propertiesData) {
        // Use the defined FetchedProperty type here
        const transformedProperties: Property[] = propertiesData.map(
          (property: FetchedProperty) => ({
            ...property,
            path: `/property/${property.id}`,
            agent: agentData, // Use agentData directly
            // Handle potential nulls from Supabase join/select
            property_type: property.property_type ?? {
              id: property.property_type_id,
              title: '',
            },
            city: property.city ?? { id: property.city_id, title: '' },
            sale_type: property.sale_type ?? {
              id: property.sale_type_id,
              title: '',
            },
          })
        );
        setProperties(transformedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error('Error in fetchAgentAndProperties:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, params.id]);

  useEffect(() => {
    fetchAgentAndProperties();
  }, [fetchAgentAndProperties]);

  return (
    <div className='pt-16'>
      <WelcomeHeader />
      <Section className='px-8'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-medium text-primary-950'>
              Your Properties
            </h2>
          </div>
          <div className='grid grid-cols-1 gap-6'>
            {isLoading ? (
              <>
                <PropertyProCardSkeleton />
                <PropertyProCardSkeleton />
                <PropertyProCardSkeleton />
              </>
            ) : (
              <>
                {properties.map((property) => (
                  <PropertyProCard
                    key={property.id}
                    property={property}
                    onDelete={fetchAgentAndProperties}
                  />
                ))}
                {properties.length === 0 && (
                  <p className='text-primary-600'>No properties found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
