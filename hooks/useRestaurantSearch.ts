/**
 * Hook principal pour gérer la recherche de restaurants
 *
 * Features:
 * - Debounced search (400ms)
 * - Combinaison search + category + filters
 * - Cache optimisé avec React Query
 * - État centralisé de recherche
 *
 * @example
 * const {
 *   searchState,
 *   restaurants,
 *   isLoading,
 *   setQuery,
 *   setCategoryId,
 *   setFilters,
 *   clearAll,
 *   filterCount,
 * } = useRestaurantSearch();
 */

import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { useRestaurant } from './useRestaurants';
import { useAddresses } from './useAddresses';
import { mapSearchStateToAPIParams, countActiveFilters } from '@/lib/utils/filterMapper';
import type { SearchState, SearchFilters } from '@/types';

export function useRestaurantSearch() {
  const { currentAddress } = useAddresses();

  // État de recherche centralisé
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    categoryId: null,
    filters: {},
    isSearching: false,
  });

  // Debounced search query (400ms)
  const debouncedQuery = useDebounce(searchState.query, 400);

  // Créer les paramètres API à partir de l'état de recherche
  const apiParams = useMemo(() => {
    // Utiliser debouncedQuery au lieu de searchState.query
    const stateWithDebouncedQuery: SearchState = {
      ...searchState,
      query: debouncedQuery,
    };

    return mapSearchStateToAPIParams(stateWithDebouncedQuery, currentAddress);
  }, [debouncedQuery, searchState.categoryId, searchState.filters, currentAddress]);

  // Query React Query avec tous les params combinés
  const restaurant = useRestaurant();
  const {
    data: restaurants,
    isLoading,
    error,
  } = restaurant.getRestaurants(apiParams, {
    // Désactiver si pas d'adresse (pour éviter les erreurs)
    enabled: currentAddress !== null,
  });

  // Compter les filtres actifs pour le badge
  const filterCount = useMemo(() => {
    return countActiveFilters(searchState.filters);
  }, [searchState.filters]);

  /**
   * Mettre à jour le texte de recherche
   */
  const setQuery = (query: string) => {
    setSearchState((prev) => ({ ...prev, query }));
  };

  /**
   * Mettre à jour la catégorie sélectionnée
   * Passer null pour désélectionner
   */
  const setCategoryId = (categoryId: string | null) => {
    setSearchState((prev) => ({ ...prev, categoryId }));
  };

  /**
   * Mettre à jour les filtres
   */
  const setFilters = (filters: SearchFilters) => {
    setSearchState((prev) => ({ ...prev, filters }));
  };

  /**
   * Réinitialiser tous les filtres (garde la query et category)
   */
  const resetFilters = () => {
    setSearchState((prev) => ({ ...prev, filters: {} }));
  };

  /**
   * Réinitialiser tout (query + category + filters)
   */
  const clearAll = () => {
    setSearchState({
      query: '',
      categoryId: null,
      filters: {},
      isSearching: false,
    });
  };

  return {
    // État
    searchState,
    restaurants: restaurants || [],
    isLoading,
    error,
    filterCount,

    // Actions
    setQuery,
    setCategoryId,
    setFilters,
    resetFilters,
    clearAll,

    // Informations utiles
    hasResults: restaurants && restaurants.length > 0,
    hasQuery: debouncedQuery.trim().length > 0,
    hasFilters: filterCount > 0,
  };
}
