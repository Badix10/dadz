import { useQuery } from '@tanstack/react-query';
// import { restaurantService } from '@/lib/services/restaurantService'; // À créer

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
}

export function useRestaurants(params: UseRestaurantsParams = {}) {
  return useQuery({
    // La queryKey change quand les params changent → refetch automatique
    queryKey: ['restaurants', params],

    // La fonction qui fait l'appel API
    queryFn: async () => {
      // TODO: Appeler restaurantService.getRestaurants(params)
      // Pour l'instant, exemple de retour
      return [];
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
 * const { data: restaurant, isLoading } = useRestaurant(restaurantId);
 */
export function useRestaurant(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['restaurant', restaurantId],

    queryFn: async () => {
      if (!restaurantId) throw new Error('Restaurant ID required');

      // TODO: Appeler restaurantService.getRestaurantById(restaurantId)
      return null;
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
      // TODO: Appeler restaurantService.getCategories()
      return [];
    },

    // Les catégories changent rarement → cache long (30 minutes)
    staleTime: 30 * 60 * 1000,
  });
}
