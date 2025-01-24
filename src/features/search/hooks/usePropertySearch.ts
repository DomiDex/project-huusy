import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/types';

export function usePropertySearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const searchProperties = async (
    searchTerm: string,
    saleType: 'rent' | 'sale' | null
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase.from('properties').select(`
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

      if (searchTerm) {
        query = query.ilike('property_name', `%${searchTerm}%`);
      }

      if (saleType) {
        const { data: saleTypeData } = await supabase
          .from('sale_types')
          .select('id')
          .eq('path', saleType)
          .single();

        if (saleTypeData) {
          query = query.eq('sale_type_id', saleTypeData.id);
        }
      }

      const { data, error: searchError } = await query;

      if (searchError) throw searchError;
      return data as Property[];
    } catch (err) {
      console.error('Failed to search properties:', err);
      setError('Failed to search properties');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { searchProperties, isLoading, error };
}
