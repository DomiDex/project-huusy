'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFilterStore } from '../store/filterStore';
import { useEffect } from 'react';

export function useFilterQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    cityId,
    propertyTypeIds,
    saleTypeId,
    priceRange,
    bedrooms,
    bathrooms,
    setCityId,
    setPropertyTypeIds,
    setSaleTypeId,
    setPriceRange,
    setBedrooms,
    setBathrooms,
  } = useFilterStore();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (cityId) params.set('city', cityId);
    else params.delete('city');

    if (propertyTypeIds.length > 0)
      params.set('types', propertyTypeIds.join(','));
    else params.delete('types');

    if (saleTypeId) params.set('saleType', saleTypeId);
    else params.delete('saleType');

    if (priceRange.min) params.set('minPrice', priceRange.min.toString());
    else params.delete('minPrice');

    if (priceRange.max) params.set('maxPrice', priceRange.max.toString());
    else params.delete('maxPrice');

    if (bedrooms) params.set('bedrooms', bedrooms);
    else params.delete('bedrooms');

    if (bathrooms) params.set('bathrooms', bathrooms);
    else params.delete('bathrooms');

    router.push(`${pathname}?${params.toString()}`);
  }, [
    cityId,
    propertyTypeIds,
    saleTypeId,
    priceRange,
    bedrooms,
    bathrooms,
    pathname,
    router,
    searchParams,
  ]);

  // Initialize filters from URL
  useEffect(() => {
    const city = searchParams.get('city');
    const types = searchParams.get('types');
    const saleType = searchParams.get('saleType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedroomsParam = searchParams.get('bedrooms');
    const bathroomsParam = searchParams.get('bathrooms');

    if (city) setCityId(city);
    if (types) setPropertyTypeIds(types.split(','));
    if (saleType) setSaleTypeId(saleType);
    if (minPrice || maxPrice) {
      setPriceRange(
        minPrice ? Number(minPrice) : null,
        maxPrice ? Number(maxPrice) : null
      );
    }
    if (bedroomsParam) setBedrooms(bedroomsParam);
    if (bathroomsParam) setBathrooms(bathroomsParam);
  }, [
    searchParams,
    setCityId,
    setPropertyTypeIds,
    setSaleTypeId,
    setPriceRange,
    setBedrooms,
    setBathrooms,
  ]);
}
