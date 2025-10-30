import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/lib/services/restaurantService';
import type { GetRestaurantsParams, GetRestaurantByIdParams } from '@/lib/services/restaurantService';

/**
 * Hook pour récupérer la liste des restaurants avec filtres
 *
 * Features:
 * - Recherche par coordonnées géographiques
 * - Filtrage par catégorie
 * - Filtrage par note, prix, temps de livraison
 * - Cache optimisé (5 minutes par défaut)
 * - Désactivation automatique si pas de coordonnées
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useRestaurants({
 *   latitude: 48.8566,
 *   longitude: 2.3522,
 *   categoryId: 'pizza',
 *   minRating: 4.0,
 * });
 * ```
 *
 * @param params - Paramètres de filtrage (coordonnées, catégorie, recherche, etc.)
 * @param options - Options React Query (enabled, staleTime, etc.)
 * @returns React Query result avec la liste des restaurants
 */
export function useRestaurants(
  params: GetRestaurantsParams = {},
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: async () => await restaurantService.getRestaurants(params),
    enabled: options?.enabled ?? (params.latitude !== undefined && params.longitude !== undefined),
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes par défaut
  });
}

/**
 * Hook pour récupérer un restaurant par ID avec tous ses détails
 *
 * Features:
 * - Récupération des détails complets d'un restaurant
 * - Calcul de distance si coordonnées fournies
 * - Inclusion optionnelle des avis
 * - Cache optimisé (10 minutes par défaut)
 * - Désactivation automatique si pas d'ID
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useRestaurantById({
 *   restaurantId: 'abc-123',
 *   latitude: 48.8566,
 *   longitude: 2.3522,
 *   includeReviews: true,
 *   reviewsLimit: 10,
 * });
 * ```
 *
 * @param params - ID du restaurant et options (coordonnées, avis, etc.)
 * @param options - Options React Query
 * @returns React Query result avec les détails du restaurant
 */
export function useRestaurantById(
  params: GetRestaurantByIdParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
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
}

/**
 * Hook pour récupérer toutes les catégories de restaurants
 *
 * Features:
 * - Liste complète des catégories disponibles
 * - Cache long terme (30 minutes par défaut)
 * - Activé par défaut
 * - Données rarement changeantes
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useRestaurantCategories();
 *
 * // Avec options personnalisées
 * const { data } = useRestaurantCategories({
 *   enabled: true,
 *   staleTime: 60 * 60 * 1000, // 1 heure
 * });
 * ```
 *
 * @param options - Options React Query
 * @returns React Query result avec la liste des catégories
 */
export function useRestaurantCategories(
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey: ['restaurant-categories'],
    queryFn: async () => await restaurantService.getCategories(),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 30 * 60 * 1000, // 30 minutes par défaut
  });
}
