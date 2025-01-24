import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  saleType: 'rent' | 'sale' | null;
  setSearchTerm: (term: string) => void;
  setSaleType: (type: 'rent' | 'sale' | null) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  saleType: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSaleType: (type) => set({ saleType: type }),
  reset: () => set({ searchTerm: '', saleType: null }),
}));
