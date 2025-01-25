import { create } from 'zustand';
import { Property } from '@/types';
import { createClient } from '@/utils/supabase/client';

interface FavoritesState {
  favorites: Property[];
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  addFavorite: (propertyId: string) => Promise<void>;
  removeFavorite: (propertyId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,

  fetchFavorites: async () => {
    const supabase = createClient();
    set({ isLoading: true, error: null });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        set({ isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('favorites')
        .select(
          `
          property_id,
          property:properties (
            id,
            path,
            property_name,
            price,
            excerpt,
            images,
            bedrooms,
            bathrooms,
            property_size,
            property_type:property_type_id (*),
            city:city_id (*),
            sale_type:sale_type_id (*),
            agent:agent_id (*)
          )
        `
        )
        .eq('customer_id', user.id);

      if (error) throw error;

      const properties = data.map((item) => item.property) as Property[];
      set({ favorites: properties, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch favorites', isLoading: false });
    }
  },

  addFavorite: async (propertyId: string) => {
    const supabase = createClient();
    set({ error: null });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('favorites')
        .insert({ property_id: propertyId, customer_id: user.id });

      if (error) throw error;

      // Refresh favorites
      await get().fetchFavorites();
    } catch (error) {
      set({ error: 'Failed to add favorite' });
    }
  },

  removeFavorite: async (propertyId: string) => {
    const supabase = createClient();
    set({ error: null });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('property_id', propertyId)
        .eq('customer_id', user.id);

      if (error) throw error;

      // Refresh favorites
      await get().fetchFavorites();
    } catch (error) {
      set({ error: 'Failed to remove favorite' });
    }
  },
}));
