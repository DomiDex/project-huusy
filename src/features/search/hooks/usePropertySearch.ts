import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/types';

interface SearchResult {
  properties: Property[];
  totalCount: number;
}

export function usePropertySearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const searchProperties = async (
    searchTerm: string,
    saleType: 'rent' | 'sale' | null,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<SearchResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get sale type ID if provided
      let saleTypeId: string | null = null;
      if (saleType) {
        const { data: saleTypeData } = await supabase
          .from('sale_types')
          .select('id')
          .eq('path', saleType)
          .single();
        
        if (saleTypeData) {
          saleTypeId = saleTypeData.id;
        }
      }

      // First get the count
      let countQuery = supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      if (searchTerm) {
        countQuery = countQuery.ilike('property_name', `%${searchTerm}%`);
      }

      if (saleTypeId) {
        countQuery = countQuery.eq('sale_type_id', saleTypeId);
      }

      const { count } = await countQuery;

      // Then get the paginated data
      let dataQuery = supabase.from('properties').select(`
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
        `)
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        dataQuery = dataQuery.ilike('property_name', `%${searchTerm}%`);
      }

      if (saleTypeId) {
        dataQuery = dataQuery.eq('sale_type_id', saleTypeId);
      }

      const { data, error: searchError } = await dataQuery;

      if (searchError) throw searchError;
      
      return {
        properties: data as Property[],
        totalCount: count || 0
      };
    } catch (err) {
      console.error('Failed to search properties:', err);
      setError('Failed to search properties');
      return { properties: [], totalCount: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchProperties, isLoading, error };
}
