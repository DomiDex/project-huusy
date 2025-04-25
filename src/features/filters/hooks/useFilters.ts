'use client';

import { useFilterStore } from '../store/filterStore';
import { useFilterQuery } from './useFilterQuery';

export function useFilters() {
  const filters = useFilterStore();
  useFilterQuery(); // Sync with URL

  return {
    ...filters,
    hasActiveFilters: Boolean(
      filters.cityId ||
        filters.propertyTypeIds.length > 0 ||
        filters.priceRange.min ||
        filters.priceRange.max ||
        filters.bedrooms ||
        filters.bathrooms
    ),
  };
}
