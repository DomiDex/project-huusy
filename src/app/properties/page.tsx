'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import Section from '@/components/ui/Section';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useFilterStore } from '@/features/filters/store/filterStore';

const ITEMS_PER_PAGE = 10;

function PropertiesContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const filters = useFilterStore();
  const { 
    currentPage, 
    totalPages,
    goToPage 
  } = usePagination({ 
    totalItems: totalCount, 
    itemsPerPage: ITEMS_PER_PAGE 
  });

  const fetchProperties = useCallback(async (page: number) => {
    const supabase = createClient();
    setIsLoading(true);

    try {
      // First, get the total count with filters applied
      let countQuery = supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Apply filters to count query
      if (filters.cityId) {
        countQuery = countQuery.eq('city_id', filters.cityId);
      }
      if (filters.propertyTypeIds.length > 0) {
        countQuery = countQuery.in('property_type_id', filters.propertyTypeIds);
      }
      if (filters.saleTypeId) {
        countQuery = countQuery.eq('sale_type_id', filters.saleTypeId);
      }
      if (filters.priceRange.min) {
        countQuery = countQuery.gte('price', filters.priceRange.min);
      }
      if (filters.priceRange.max) {
        countQuery = countQuery.lte('price', filters.priceRange.max);
      }
      if (filters.bedrooms) {
        countQuery = countQuery.eq('bedrooms', filters.bedrooms);
      }
      if (filters.bathrooms) {
        countQuery = countQuery.eq('bathrooms', filters.bathrooms);
      }

      const { count } = await countQuery;
      setTotalCount(count || 0);

      // Then fetch the paginated data with filters
      let dataQuery = supabase
        .from('properties')
        .select(`
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
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      // Apply the same filters to data query
      if (filters.cityId) {
        dataQuery = dataQuery.eq('city_id', filters.cityId);
      }
      if (filters.propertyTypeIds.length > 0) {
        dataQuery = dataQuery.in('property_type_id', filters.propertyTypeIds);
      }
      if (filters.saleTypeId) {
        dataQuery = dataQuery.eq('sale_type_id', filters.saleTypeId);
      }
      if (filters.priceRange.min) {
        dataQuery = dataQuery.gte('price', filters.priceRange.min);
      }
      if (filters.priceRange.max) {
        dataQuery = dataQuery.lte('price', filters.priceRange.max);
      }
      if (filters.bedrooms) {
        dataQuery = dataQuery.eq('bedrooms', filters.bedrooms);
      }
      if (filters.bathrooms) {
        dataQuery = dataQuery.eq('bathrooms', filters.bathrooms);
      }

      const { data } = await dataQuery;

      if (data) {
        setProperties(data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, fetchProperties]);

  // Reset to page 1 when filters change
  useEffect(() => {
    goToPage(1);
  }, [filters, goToPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
              <>
                <PropertyGrid 
                  properties={properties} 
                  totalCount={totalCount}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
                {totalPages > 1 && (
                  <div className='mt-8'>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={goToPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <main className='bg-background min-h-screen'>
        <Section className='bg-primary-50 mt-16'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-64 mb-4'></div>
            <div className='h-12 bg-gray-200 rounded w-96 mb-4'></div>
            <div className='h-6 bg-gray-200 rounded w-72'></div>
          </div>
        </Section>
      </main>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
