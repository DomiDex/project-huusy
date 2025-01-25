'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { createClient } from '@/utils/supabase/client';
import { useFavoritesStore } from '../store/favoritesStore';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  propertyId: string;
}

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addFavorite, removeFavorite } = useFavoritesStore();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkFavoriteStatus() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data } = await supabase
          .from('favorites')
          .select('*')
          .eq('property_id', propertyId)
          .eq('customer_id', user.id)
          .single();

        setIsFavorite(!!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkFavoriteStatus();
  }, [propertyId, supabase]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push('/customer/sign-in');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(propertyId);
      } else {
        await addFavorite(propertyId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (isLoading) return null;

  return (
    <button
      onClick={handleToggleFavorite}
      className='p-2 rounded-full bg-white shadow-sm hover:bg-primary-50 transition-colors'
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <HeartIconSolid className='w-6 h-6 text-red-500' />
      ) : (
        <HeartIcon className='w-6 h-6 text-primary-950' />
      )}
    </button>
  );
}
