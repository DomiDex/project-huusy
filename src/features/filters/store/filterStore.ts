import { create } from 'zustand';
import { City, PropertyType, SaleType } from '@/types';

interface FilterState {
  cityId: string | null;
  propertyTypeIds: string[];
  saleTypeId: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  bedrooms: string | null;
  bathrooms: string | null;

  // Data arrays
  cities: City[];
  propertyTypes: PropertyType[];
  saleTypes: SaleType[];

  // Actions
  setCityId: (id: string | null) => void;
  setPropertyTypeIds: (ids: string[]) => void;
  setSaleTypeId: (id: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setBedrooms: (bedrooms: string | null) => void;
  setBathrooms: (bathrooms: string | null) => void;
  setCities: (cities: City[]) => void;
  setPropertyTypes: (types: PropertyType[]) => void;
  setSaleTypes: (types: SaleType[]) => void;
  resetFilters: () => void;
}

const initialState = {
  cityId: null,
  propertyTypeIds: [],
  saleTypeId: null,
  priceRange: {
    min: null,
    max: null,
  },
  bedrooms: null,
  bathrooms: null,
  cities: [],
  propertyTypes: [],
  saleTypes: [],
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setCityId: (cityId) => set({ cityId }),
  setPropertyTypeIds: (propertyTypeIds) => set({ propertyTypeIds }),
  setSaleTypeId: (saleTypeId) => set({ saleTypeId }),
  setPriceRange: (min, max) => set({ priceRange: { min, max } }),
  setBedrooms: (bedrooms) => set({ bedrooms }),
  setBathrooms: (bathrooms) => set({ bathrooms }),
  setCities: (cities) => set({ cities }),
  setPropertyTypes: (propertyTypes) => set({ propertyTypes }),
  setSaleTypes: (saleTypes) => set({ saleTypes }),
  resetFilters: () => set(initialState),
}));
