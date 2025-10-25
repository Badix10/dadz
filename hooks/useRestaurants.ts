import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/lib/services/restaurantService';

/**
 * Hook React Query pour récupérer les restaurants
 *
 * @example
 * const { currentAddress } = useAddresses();
 * const { data: restaurants, isLoading, error } = useRestaurants({
 *   latitude: currentAddress?.latitude,
 *   longitude: currentAddress?.longitude,
 *   categoryId: 'pizza-category-id',
 *   search: 'pizza',
 * });
 */

interface UseRestaurantsParams {
  latitude?: number;
  longitude?: number;
  categoryId?: string;
  search?: string;
  maxDistance?: number;
  minRating?: number;
  priceRange?: 'low' | 'medium' | 'high';
  isOpen?: boolean;
  limit?: number;
  offset?: number;
}

export function useRestaurants(params: UseRestaurantsParams = {}) {
  return useQuery({
    // La queryKey change quand les params changent → refetch automatique
    queryKey: ['restaurants', params],

    // La fonction qui fait l'appel API
    queryFn: async () => {
      return await restaurantService.getRestaurants(params);
    },

    // Désactiver la query si pas de coordonnées GPS (si tu veux filtrer par distance)
    enabled: params.latitude !== undefined && params.longitude !== undefined,

    // Cache pendant 5 minutes
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer un restaurant par ID avec tous ses détails
 *
 * @example
 * const { currentAddress } = useAddresses();
 * const { data: restaurant, isLoading } = useRestaurant({
 *   restaurantId: 'restaurant-id',
 *   latitude: currentAddress?.latitude,
 *   longitude: currentAddress?.longitude,
 * });
 */
interface UseRestaurantParams {
  restaurantId: string | undefined;
  latitude?: number;
  longitude?: number;
  includeReviews?: boolean;
  reviewsLimit?: number;
}

export function useRestaurant(params: UseRestaurantParams | string | undefined) {
  // Support de l'ancien format (juste l'ID en string) et du nouveau format (objet)
  const normalizedParams = typeof params === 'string' || params === undefined
    ? { restaurantId: params }
    : params;

  const { restaurantId, latitude, longitude, includeReviews, reviewsLimit } = normalizedParams;

  return useQuery({
    queryKey: ['restaurant', restaurantId, { latitude, longitude, includeReviews, reviewsLimit }],

    queryFn: async () => {
      if (!restaurantId) throw new Error('Restaurant ID required');

      return await restaurantService.getRestaurantById({
        restaurantId,
        latitude,
        longitude,
        includeReviews,
        reviewsLimit,
      });
    },

    enabled: !!restaurantId,

    // Cache plus long pour les détails (10 minutes)
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer les catégories de restaurants
 *
 * @example
 * const { data: categories } = useRestaurantCategories();
 */
export function useRestaurantCategories() {
  return useQuery({
    queryKey: ['restaurant-categories'],

    queryFn: async () => {
      return await restaurantService.getCategories();
    },

    // Les catégories changent rarement → cache long (30 minutes)
    staleTime: 30 * 60 * 1000,
  });
}
