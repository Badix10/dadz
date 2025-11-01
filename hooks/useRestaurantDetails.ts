/**
 * Hook spécialisé pour gérer l'écran Restaurant Details
 *
 * Features:
 * - Charge les détails complets d'un restaurant
 * - Map les données Supabase vers le format UI
 * - Gère le filtrage du menu par catégorie
 * - Gère la recherche dans le menu
 * - Gère le toggle favoris (local pour l'instant)
 * - Fournit l'état de rafraîchissement
 *
 * @example
 * const {
 *   data,
 *   isLoading,
 *   isError,
 *   refetch,
 *   filteredMenu,
 *   setActiveCategoryId,
 *   setSearchTerm,
 *   toggleFavorite,
 *   favorite,
 * } = useRestaurantDetails({
 *   restaurantId: '123',
 *   latitude: 48.8566,
 *   longitude: 2.3522,
 * });
 */

import { useState, useMemo, useCallback } from 'react';
import { useRestaurantById } from './useRestaurants';
import { mapRestaurantDetailsToUI } from '@/lib/mappers/restaurantDetailsMapper';
import type { DishCategoryUI, RestaurantDetailsUI } from '@/types';

// Constants
const DEFAULT_REVIEWS_LIMIT = 10;
const RESTAURANT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Filter menu by category and search term
 */
function filterMenuCategories(
  categories: DishCategoryUI[],
  activeCategoryId: string | null,
  searchTerm: string
): DishCategoryUI[] {
  let filtered = categories;

  // Filter by active category
  if (activeCategoryId) {
    filtered = filtered.filter((cat) => cat.id === activeCategoryId);
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase().trim();
    filtered = filtered
      .map((category) => ({
        ...category,
        dishes: category.dishes.filter((dish) => {
          const nameMatch = dish.name.toLowerCase().includes(searchLower);
          const descMatch = dish.description?.toLowerCase().includes(searchLower);
          return nameMatch || descMatch;
        }),
      }))
      .filter((category) => category.dishes.length > 0);
  }

  return filtered;
}

export interface UseRestaurantDetailsParams {
  restaurantId: string;
  latitude?: number;
  longitude?: number;
  includeReviews?: boolean;
  reviewsLimit?: number;
}

export interface UseRestaurantDetailsResult {
  // Data & loading states
  data: RestaurantDetailsUI | null;
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  hasInitialFetch: boolean;
  error?: Error;

  // Refetch function
  refetch: () => Promise<void>;

  // Menu filtering
  activeCategoryId: string | null;
  setActiveCategoryId: (categoryId: string | null) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredMenu: DishCategoryUI[];

  // Favorite management (local for now)
  toggleFavorite: () => void;
  favorite: boolean;
}

export function useRestaurantDetails(
  params: UseRestaurantDetailsParams
): UseRestaurantDetailsResult {
  const {
    restaurantId,
    latitude,
    longitude,
    includeReviews = true,
    reviewsLimit = DEFAULT_REVIEWS_LIMIT,
  } = params;

  // State for menu filtering
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch restaurant details using the existing hook
  const {
    data: restaurantData,
    isLoading,
    error,
    refetch: originalRefetch,
    isFetched,
  } = useRestaurantById(
    {
      restaurantId,
      latitude,
      longitude,
      includeReviews,
      reviewsLimit,
    },
    {
      enabled: !!restaurantId,
      staleTime: RESTAURANT_STALE_TIME,
    }
  );

  // Track if initial fetch is complete
  const hasInitialFetch = isFetched;

  // Map data to UI format
  const data = useMemo(() => {
    if (!restaurantData) return null;
    return mapRestaurantDetailsToUI(restaurantData);
  }, [restaurantData]);

  // Filtered menu based on category and search
  const filteredMenu = useMemo(() => {
    if (!data?.dishCategories) return [];
    return filterMenuCategories(data.dishCategories, activeCategoryId, searchTerm);
  }, [data?.dishCategories, activeCategoryId, searchTerm]);

  // Refetch with loading state
  const refetch = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await originalRefetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [originalRefetch]);

  // Toggle favorite (local state for now, will be connected to backend later)
  const toggleFavorite = useCallback(() => {
    setFavorite((prev) => !prev);
    // TODO: Call mutation to save favorite to database
  }, []);

  return {
    // Data & states
    data,
    isLoading,
    isError: !!error,
    isRefreshing,
    hasInitialFetch,
    error: error as Error | undefined,

    // Refetch
    refetch,

    // Menu filtering
    activeCategoryId,
    setActiveCategoryId,
    searchTerm,
    setSearchTerm,
    filteredMenu,

    // Favorites
    toggleFavorite,
    favorite,
  };
}
