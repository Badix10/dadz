import { SearchBar } from '@/components';
import CategoryList from '@/components/CategoryList';
import { FilterDrawer, type FilterConfig, type SelectedFilters } from '@/components/FilterDrawer';
import Header from '@/components/Header';
import PromoCard from '@/components/PromoCard';
import RestaurantGrid from '@/components/RestaurantGrid';
import { Surface } from '@/components/ui';
import {
  CATEGORIES,
  DEFAULT_LOCATION,
  PROMO_DATA,
  RESTAURANTS,
} from '@/constants';
import type { Category, FavoritesMap, Restaurant } from '@/types';
import { useTranslation } from '@/hooks';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from 'nativewind';

/**
 * Home Screen - Main Food Delivery Page
 * Displays categories, promotions, and nearby restaurants
 * Principes: DRY, KISS, Clean Code
 */
export default function HomeScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [favorites, setFavorites] = useState<FavoritesMap>(() =>
    RESTAURANTS.reduce((acc, rest) => ({ ...acc, [rest.id]: rest.isFavorite }), {})
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  // Filter configuration (YAGNI - Start simple)
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

  // Memoized handlers to prevent unnecessary re-renders (Clean Code)
  const handleFavoriteToggle = useCallback((id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSearch = useCallback((text: string) => {
    // TODO: Implement search functionality
    console.log('Searching for:', text);
  }, []);

  const handleFilterPress = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setFilterVisible(false);
  }, []);

  const handleApplyFilters = useCallback((filters: SelectedFilters) => {
    setSelectedFilters(filters);
    console.log('Applied filters:', filters);
    // TODO: Filter restaurants based on selected filters
  }, []);

  const handleCartPress = useCallback(() => {
    // TODO: Navigate to cart
    console.log('Cart pressed');
  }, []);

  const handleNotificationPress = useCallback(() => {
    // TODO: Navigate to notifications
    console.log('Notification pressed');
  }, []);

  const handlePromoPress = useCallback(() => {
    // TODO: Handle promo action
    console.log('Promo pressed');
  }, []);

  const handleCategoryPress = useCallback((category: Category) => {
    // TODO: Filter restaurants by category
    console.log('Category selected:', category.name);
  }, []);

  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    // TODO: Navigate to restaurant details
    console.log('Restaurant selected:', restaurant.name);
  }, []);

  // Memoize static data to prevent unnecessary re-creations (Performance)
  const location = useMemo(() => DEFAULT_LOCATION, []);
  const categories = useMemo(() => CATEGORIES, []);
  const restaurants = useMemo(() => RESTAURANTS, []);
  const promoData = useMemo(() => PROMO_DATA, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Surface variant="primary" className="flex-1">
        <Header
          location={location}
          onCartPress={handleCartPress}
          onNotificationPress={handleNotificationPress}
          hasNotification={true}
        >
          <SearchBar
            onSearch={handleSearch}
            onFilterPress={handleFilterPress}
            placeholder={t('home:header.searchPlaceholder')}
          />
        </Header>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <PromoCard
            imageUrl={promoData.imageUrl}
            title={promoData.title}
            description={promoData.description}
            buttonText={promoData.buttonText}
            onPress={handlePromoPress}
          />

          <CategoryList
            categories={categories}
            onCategoryPress={handleCategoryPress}
          />

          <RestaurantGrid
            restaurants={restaurants}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onRestaurantPress={handleRestaurantPress}
            title={t('home:restaurants.title')}
          />
        </ScrollView>

        <FilterDrawer
          visible={filterVisible}
          onClose={handleCloseFilter}
          filters={filterConfig}
          selectedFilters={selectedFilters}
          onApply={handleApplyFilters}
        />
      </Surface>
    </SafeAreaView>
  );
}
