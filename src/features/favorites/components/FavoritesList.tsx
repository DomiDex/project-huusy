'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';
import MainCardSmall from '@/features/properties/components/MainCardSmall';

export default function FavoritesList() {
  const { favorites, isLoading, error, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='h-[400px] bg-primary-100 animate-pulse rounded-2xl'
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-primary-600'>No favorite properties yet.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {favorites.map((property) => (
        <MainCardSmall key={property.id} property={property} />
      ))}
    </div>
  );
}
