import { create } from 'zustand';
import { Property, AccountPro } from '@/types';
import { createClient } from '@/utils/supabase/client';

// Define type for data structure returned by the properties query
type FetchedPropertyData = Omit<
  Property,
  'path' | 'property_type' | 'city' | 'sale_type' | 'agent'
> & {
  property_type_id: string;
  city_id: string;
  sale_type_id: string;
  agent_id: string;
  // Nested objects from Supabase might be null
  property_type: { id: string; title: string } | null;
  city: { id: string; title: string } | null;
  sale_type: { id: string; title: string } | null;
  agent: AccountPro | null; // agent:agent_id(*) returns the full AccountPro or null
};

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
        set({ favorites: [], isLoading: false }); // Set empty favorites if no user
        return;
      }

      // 1. Fetch only property_ids from favorites
      const { data: favoriteData, error: favError } = await supabase
        .from('favorites')
        .select('property_id')
        .eq('customer_id', user.id);

      if (favError) throw favError;

      const propertyIds = favoriteData
        ? favoriteData.map((fav) => fav.property_id)
        : [];

      if (propertyIds.length === 0) {
        set({ favorites: [], isLoading: false }); // Set empty if user has no favorites
        return;
      }

      // 2. Fetch full property details for those IDs
      const { data: propertiesData, error: propError } = await supabase
        .from('properties')
        .select(
          `
          *,
          property_type:property_type_id (id, title),
          city:city_id (id, title),
          sale_type:sale_type_id (id, title),
          agent:agent_id (*)
        ` // Use simpler nested selects, fetch all agent details (*)
        )
        .in('id', propertyIds);

      if (propError) throw propError;

      // 3. Transform data (add path) and set state
      const transformedProperties: Property[] = propertiesData
        ? propertiesData.map((prop: FetchedPropertyData) => ({
            ...prop,
            // Construct path (assuming it's not in the DB table)
            path: `/property/${prop.id}`,
            // Ensure nested types match Property interface (handling potential nulls from joins)
            property_type: prop.property_type ?? {
              id: prop.property_type_id,
              title: '',
            },
            city: prop.city ?? { id: prop.city_id, title: '' },
            sale_type: prop.sale_type ?? { id: prop.sale_type_id, title: '' },
            agent: prop.agent, // Agent should be object or null based on select
          }))
        : [];

      set({ favorites: transformedProperties, isLoading: false });
    } catch (err) {
      console.error('Error fetching favorites:', err);
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

      await get().fetchFavorites();
    } catch (err) {
      console.error('Error adding favorite:', err);
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

      await get().fetchFavorites();
    } catch (err) {
      console.error('Error removing favorite:', err);
      set({ error: 'Failed to remove favorite' });
    }
  },
}));
