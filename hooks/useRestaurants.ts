import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/lib/services/restaurantService';
import type { GetRestaurantsParams, GetRestaurantByIdParams } from '@/lib/services/restaurantService';

/**
 * Hook unifié pour gérer toutes les opérations liées aux restaurants
 *
 * @example
 * const restaurant = useRestaurant();
 *
 * // Récupérer les restaurants
 * const restaurantsQuery = restaurant.getRestaurants({
 *   latitude: 48.8566,
 *   longitude: 2.3522,
 *   categoryId: 'pizza',
 * });
 *
 * // Récupérer un restaurant par ID
 * const detailsQuery = restaurant.getRestaurantById({
 *   restaurantId: 'abc-123',
 *   latitude: 48.8566,
 *   longitude: 2.3522,
 * });
 *
 * // Récupérer les catégories
 * const categoriesQuery = restaurant.getCategories();
 */
export function useRestaurant() {
  /**
   * Récupère la liste des restaurants avec filtres
   *
   * @param params - Paramètres de filtrage (coordonnées, catégorie, recherche, etc.)
   * @param options - Options React Query (enabled, staleTime, etc.)
   */
  const getRestaurants = (
    params: GetRestaurantsParams = {},
    options?: {
      enabled?: boolean;
      staleTime?: number;
    }
  ) => {
    return useQuery({
      queryKey: ['restaurants', params],
      queryFn: async () => await restaurantService.getRestaurants(params),
      enabled: options?.enabled ?? (params.latitude !== undefined && params.longitude !== undefined),
      staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes par défaut
    });
  };

  /**
   * Récupère un restaurant par ID avec tous ses détails
   *
   * @param params - ID du restaurant et options (coordonnées, avis, etc.)
   * @param options - Options React Query
   */
  const getRestaurantById = (
    params: GetRestaurantByIdParams,
    options?: {
      enabled?: boolean;
      staleTime?: number;
    }
  ) => {
    return useQuery({
      queryKey: ['restaurant', params.restaurantId, {
        latitude: params.latitude,
        longitude: params.longitude,
        includeReviews: params.includeReviews,
        reviewsLimit: params.reviewsLimit,
      }],
      queryFn: async () => await restaurantService.getRestaurantById(params),
      enabled: options?.enabled ?? !!params.restaurantId,
      staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes par défaut
    });
  };

  /**
   * Récupère toutes les catégories de restaurants
   *
   * @param options - Options React Query
   */
  const getCategories = (
    options?: {
      enabled?: boolean;
      staleTime?: number;
    }
  ) => {
    return useQuery({
      queryKey: ['restaurant-categories'],
      queryFn: async () => await restaurantService.getCategories(),
      enabled: options?.enabled ?? true,
      staleTime: options?.staleTime ?? 30 * 60 * 1000, // 30 minutes par défaut
    });
  };

  return {
    getRestaurants,
    getRestaurantById,
    getCategories,
  };
}
