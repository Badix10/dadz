/**
 * RestaurantSearchScreen - Page de recherche de restaurants
 *
 * Features:
 * - Recherche en temps réel avec debounce
 * - Filtrage par catégorie
 * - Filtres avancés (note, prix, temps de livraison)
 * - Historique de recherche
 * - États vides et sans résultat
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Surface } from '@/components/ui';
import RestaurantGrid from '@/components/RestaurantGrid';
import CategoryList from '@/components/CategoryList';
import { FilterDrawer, type FilterConfig, type SelectedFilters } from '@/components/FilterDrawer';
import {
  SearchHeader,
  EmptySearchState,
  NoResultsState,
  SearchSuggestions,
} from '@/components/Search';
import { useTranslation } from '@/hooks';
import { useRestaurantSearch } from '@/hooks/useRestaurantSearch';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useRestaurant } from '@/hooks/useRestaurants';
import { mapCategoriesToUI, mapRestaurantsToUI } from '@/lib/mappers/restaurantMapper';
import { convertDrawerFiltersToSearchFilters } from '@/lib/utils/filterMapper';
import type { Category, FavoritesMap, Restaurant } from '@/types';

export default function RestaurantSearchScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // États locaux
  const [favorites, setFavorites] = useState<FavoritesMap>({});
  const [filterVisible, setFilterVisible] = useState(false);

  // Hook de recherche centralisé
  const {
    searchState,
    restaurants: restaurantsData,
    isLoading,
    error,
    filterCount,
    setQuery,
    setCategoryId,
    setFilters,
    resetFilters,
    clearAll,
    hasQuery,
    hasFilters,
  } = useRestaurantSearch();

  // Mapper les restaurants vers le format UI
  const restaurants = useMemo(() => {
    if (!restaurantsData) return [];
    return mapRestaurantsToUI(restaurantsData);
  }, [restaurantsData]);

  // Historique de recherche
  const {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  } = useSearchHistory();

  // Charger les catégories
  const restaurant = useRestaurant();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = restaurant.getCategories();

  // Mapper les catégories pour l'UI
  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return mapCategoriesToUI(categoriesData);
  }, [categoriesData]);

  // Configuration des filtres pour le drawer
  const filterConfig: FilterConfig[] = useMemo(() => [
    {
      id: 'rating',
      title: t('home:filters.rating.title'),
      type: 'radio',
      options: [
        { id: 'rating-1', label: t('home:filters.rating.4.5+'), value: '4.5' },
        { id: 'rating-2', label: t('home:filters.rating.4.0+'), value: '4.0' },
        { id: 'rating-3', label: t('home:filters.rating.3.5+'), value: '3.5' },
        { id: 'rating-4', label: t('home:filters.rating.all'), value: 'all' },
      ],
    },
    {
      id: 'price',
      title: t('home:filters.price.title'),
      type: 'checkbox',
      options: [
        { id: 'price-1', label: t('home:filters.price.low'), value: 'low' },
        { id: 'price-2', label: t('home:filters.price.medium'), value: 'medium' },
        { id: 'price-3', label: t('home:filters.price.high'), value: 'high' },
      ],
    },
    {
      id: 'delivery',
      title: t('home:filters.delivery.title'),
      type: 'radio',
      options: [
        { id: 'delivery-1', label: t('home:filters.delivery.under30'), value: '30' },
        { id: 'delivery-2', label: t('home:filters.delivery.under45'), value: '45' },
        { id: 'delivery-3', label: t('home:filters.delivery.under60'), value: '60' },
        { id: 'delivery-4', label: t('home:filters.delivery.any'), value: 'any' },
      ],
    },
  ], [t]);

  // Convertir les filtres actuels pour le drawer
  const drawerSelectedFilters = useMemo<SelectedFilters>(() => {
    const { rating, priceRanges, maxDeliveryTime } = searchState.filters;
    const filters: SelectedFilters = {};

    if (rating) {
      filters.rating = rating.toString();
    }

    if (priceRanges && priceRanges.length > 0) {
      filters.price = priceRanges;
    }

    if (maxDeliveryTime) {
      filters.delivery = maxDeliveryTime.toString();
    }

    return filters;
  }, [searchState.filters]);

  // Sauvegarder dans l'historique quand on trouve des résultats
  useEffect(() => {
    if (hasQuery && restaurantsData && restaurantsData.length > 0) {
      addToHistory(searchState.query, restaurantsData.length);
    }
  }, [hasQuery, restaurantsData, searchState.query, addToHistory]);

  // Handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleApplyFilters = useCallback((filters: SelectedFilters) => {
    const searchFilters = convertDrawerFiltersToSearchFilters(filters);
    setFilters(searchFilters);
    setFilterVisible(false);
  }, [setFilters]);

  const handleCategoryPress = useCallback((category: Category) => {
    // Toggle category
    if (searchState.categoryId === category.id) {
      setCategoryId(null);
    } else {
      setCategoryId(category.id);
    }
  }, [searchState.categoryId, setCategoryId]);

  const handleFavoriteToggle = useCallback((id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    // TODO: Navigate to restaurant details
    console.log('Restaurant selected:', restaurant.name);
  }, []);

  const handleSuggestionPress = useCallback((query: string) => {
    setQuery(query);
  }, [setQuery]);

  const handleCategoryFromSuggestions = useCallback((categoryId: string) => {
    setCategoryId(categoryId);
  }, [setCategoryId]);

  // Déterminer quel état afficher
  const shouldShowEmpty = !hasQuery && !searchState.categoryId;
  const shouldShowNoResults = hasQuery && !isLoading && restaurants.length === 0;
  const shouldShowResults = !isLoading && restaurants.length > 0;

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Surface variant="primary" className="flex-1">
        {/* Header sticky avec SearchBar */}
        <SearchHeader
          initialQuery={searchState.query}
          onQueryChange={setQuery}
          onBack={handleBack}
          onFilterPress={() => setFilterVisible(true)}
          filterCount={filterCount}
          autoFocus={true}
        />

        {/* Catégories horizontales (toujours visibles) */}
        {!categoriesLoading && categories.length > 0 && (
          <CategoryList
            categories={categories}
            selectedCategoryId={searchState.categoryId}
            onCategoryPress={handleCategoryPress}
          />
        )}

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* État: Chargement */}
          {isLoading && (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#FFD700" />
              <Text className="text-gray-500 mt-4">
                {t('search:loading')}
              </Text>
            </View>
          )}

          {/* État: Pas de recherche - Afficher suggestions/historique */}
          {!isLoading && shouldShowEmpty && (
            <>
              <EmptySearchState />
              <SearchSuggestions
                history={history}
                categories={categories}
                onSuggestionPress={handleSuggestionPress}
                onCategoryPress={handleCategoryFromSuggestions}
                onHistoryRemove={removeFromHistory}
                onClearHistory={clearHistory}
              />
            </>
          )}

          {/* État: Aucun résultat */}
          {!isLoading && shouldShowNoResults && (
            <NoResultsState
              query={searchState.query}
              onResetFilters={hasFilters ? resetFilters : undefined}
              hasFilters={hasFilters}
            />
          )}

          {/* État: Résultats */}
          {shouldShowResults && (
            <RestaurantGrid
              restaurants={restaurants}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              onRestaurantPress={handleRestaurantPress}
              title={t('search:results.title', {
                count: restaurants.length,
              })}
            />
          )}

          {/* État: Erreur */}
          {error && (
            <View className="py-8 px-4">
              <Text className="text-red-500 text-center">
                {t('home:errors.restaurants', {
                  defaultValue: 'Erreur lors du chargement des restaurants',
                })}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Filter Drawer */}
        <FilterDrawer
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          filters={filterConfig}
          selectedFilters={drawerSelectedFilters}
          onApply={handleApplyFilters}
        />
      </Surface>
    </SafeAreaView>
  );
}
