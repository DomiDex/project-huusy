'use client';

import { Property } from '@/types';
import { useFilterStore } from '@/features/filters/store/filterStore';

export function useFilteredProperties(properties: Property[]) {
  const {
    cityId,
    propertyTypeIds,
    saleTypeId,
    priceRange,
    bedrooms,
    bathrooms,
  } = useFilterStore();

  return properties.filter((property) => {
    // Filter by city
    if (cityId && property.city.id !== cityId) return false;

    // Filter by property type
    if (
      propertyTypeIds.length > 0 &&
      !propertyTypeIds.includes(property.property_type.id)
    ) {
      return false;
    }

    // Filter by sale type
    if (saleTypeId && property.sale_type.id !== saleTypeId) return false;

    // Filter by price range
    if (priceRange.min && property.price < priceRange.min) return false;
    if (priceRange.max && property.price > priceRange.max) return false;

    // Filter by bedrooms
    if (bedrooms && property.bedrooms.toString() !== bedrooms) return false;

    // Filter by bathrooms
    if (bathrooms && property.bathrooms.toString() !== bathrooms) return false;

    return true;
  });
}
