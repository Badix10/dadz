import { useCallback, useState } from 'react';
import type { FavoritesMap, Restaurant } from '@/types';

/**
 * Custom hook for managing restaurant favorites
 * Encapsulates favorite state logic for reusability
 */
export function useFavorites(initialRestaurants: Restaurant[]) {
  const [favorites, setFavorites] = useState<FavoritesMap>(() =>
    initialRestaurants.reduce(
      (acc, restaurant) => ({
        ...acc,
        [restaurant.id]: restaurant.isFavorite,
      }),
      {}
    )
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites[id] || false,
    [favorites]
  );

  const getFavoriteRestaurants = useCallback(
    (restaurants: Restaurant[]) =>
      restaurants.filter((restaurant) => favorites[restaurant.id]),
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteRestaurants,
  };
}
