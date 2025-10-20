import { SearchBar } from '@/components';
import CategoryList from '@/components/CategoryList';
import Header from '@/components/Header';
import PromoCard from '@/components/PromoCard';
import RestaurantGrid from '@/components/RestaurantGrid';
import {
  CATEGORIES,
  DEFAULT_LOCATION,
  PROMO_DATA,
  RESTAURANTS,
} from '@/constants';
import type { Category, FavoritesMap, Restaurant } from '@/types';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Home Screen - Main Food Delivery Page
 * Displays categories, promotions, and nearby restaurants
 */
export default function HomeScreen() {
  const [favorites, setFavorites] = useState<FavoritesMap>(() =>
    RESTAURANTS.reduce((acc, rest) => ({ ...acc, [rest.id]: rest.isFavorite }), {})
  );

  // Memoized handlers to prevent unnecessary re-renders
  const handleFavoriteToggle = useCallback((id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSearch = useCallback((text: string) => {
    // TODO: Implement search functionality
    console.log('Searching for:', text);
  }, []);

  const handleFilterPress = useCallback(() => {
    // TODO: Implement filter functionality
    console.log('Filter pressed');
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

  // Memoize static data to prevent unnecessary re-creations
  const location = useMemo(() => DEFAULT_LOCATION, []);
  const categories = useMemo(() => CATEGORIES, []);
  const restaurants = useMemo(() => RESTAURANTS, []);
  const promoData = useMemo(() => PROMO_DATA, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <Header
        location={location}
        onCartPress={handleCartPress}
        onNotificationPress={handleNotificationPress}
        hasNotification={true}
      >
        <SearchBar
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
          placeholder="Search here..."
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
          title="Fastest Near You"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
