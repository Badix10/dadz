/**
 * Utilitaires pour mapper les filtres UI vers les paramètres API
 */

import type { SearchState, SearchFilters } from '@/types';
import type { GetRestaurantsParams } from '@/lib/services/restaurantService';
import type { Address } from '@/lib/services/addressService';

/**
 * Convertit l'état de recherche UI en paramètres API
 *
 * @param searchState - L'état de recherche depuis le hook
 * @param currentAddress - L'adresse actuelle de l'utilisateur (pour lat/lng)
 * @returns Paramètres formatés pour l'API restaurantService
 */
export function mapSearchStateToAPIParams(
  searchState: SearchState,
  currentAddress: Address | null
): GetRestaurantsParams {
  const { query, categoryId, filters } = searchState;

  const params: GetRestaurantsParams = {
    // Coordonnées de l'utilisateur
    latitude: currentAddress?.latitude ?? undefined,
    longitude: currentAddress?.longitude ?? undefined,

    // Texte de recherche
    search: query.trim() || undefined,

    // Catégorie
    categoryId: categoryId || undefined,

    // Filtres
    ...mapFiltersToAPIParams(filters),
  };

  return params;
}

/**
 * Convertit les filtres UI en paramètres API
 *
 * @param filters - Les filtres depuis SearchFilters
 * @returns Paramètres API partiels
 */
export function mapFiltersToAPIParams(
  filters: SearchFilters
): Partial<GetRestaurantsParams> {
  const params: Partial<GetRestaurantsParams> = {};

  // Note minimale
  if (filters.rating !== undefined) {
    params.minRating = filters.rating;
  }

  // Gammes de prix (multiple)
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    params.priceRanges = filters.priceRanges;
  }

  // Temps de livraison maximum
  if (filters.maxDeliveryTime !== undefined) {
    params.maxDeliveryTime = filters.maxDeliveryTime;
  }

  // Distance maximale
  if (filters.maxDistance !== undefined) {
    params.maxDistance = filters.maxDistance;
  }

  // Statut ouvert/fermé
  if (filters.isOpen !== undefined) {
    params.isOpen = filters.isOpen;
  }

  return params;
}

/**
 * Compte le nombre de filtres actifs
 * Utilisé pour afficher le badge sur le bouton filtre
 *
 * @param filters - Les filtres à compter
 * @returns Nombre de filtres actifs
 */
export function countActiveFilters(filters: SearchFilters): number {
  let count = 0;

  if (filters.rating !== undefined) count++;
  if (filters.priceRanges && filters.priceRanges.length > 0) count++;
  if (filters.maxDeliveryTime !== undefined) count++;
  if (filters.maxDistance !== undefined) count++;
  if (filters.isOpen !== undefined) count++;

  return count;
}

/**
 * Convertit les filtres UI du FilterDrawer vers SearchFilters
 * Le FilterDrawer utilise un format différent (SelectedFilters)
 *
 * @param selectedFilters - Les filtres depuis FilterDrawer
 * @returns SearchFilters formaté
 */
export function convertDrawerFiltersToSearchFilters(
  selectedFilters: Record<string, any>
): SearchFilters {
  const searchFilters: SearchFilters = {};

  // Rating (string → number)
  if (selectedFilters.rating && selectedFilters.rating !== 'all') {
    searchFilters.rating = parseFloat(selectedFilters.rating);
  }

  // Price (string[] reste string[])
  if (selectedFilters.price && Array.isArray(selectedFilters.price)) {
    searchFilters.priceRanges = selectedFilters.price as ('low' | 'medium' | 'high')[];
  }

  // Delivery time (string → number)
  if (selectedFilters.delivery && selectedFilters.delivery !== 'any') {
    searchFilters.maxDeliveryTime = parseInt(selectedFilters.delivery, 10);
  }

  return searchFilters;
}
