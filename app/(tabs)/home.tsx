import { SearchBar } from '@/components';
import CategoryList from '@/components/CategoryList';
import { FilterDrawer, type FilterConfig, type SelectedFilters } from '@/components/FilterDrawer';
import Header from '@/components/Header';
import { AddressBottomSheet } from '@/components/Header';
import PromoCard from '@/components/PromoCard';
import RestaurantGrid from '@/components/RestaurantGrid';
import { Surface } from '@/components/ui';
import {
  PROMO_DATA,
  RESTAURANTS,
} from '@/constants';
import type { Category, FavoritesMap, Restaurant } from '@/types';
import type { Address } from '@/lib/services/addressService';
import { useTranslation } from '@/hooks';
import { useAddresses } from '@/hooks/useAddresses';
import { useRestaurant } from '@/hooks/useRestaurants';
import { mapCategoriesToUI, mapRestaurantsToUI } from '@/lib/mappers/restaurantMapper';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StatusBar, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from 'nativewind';
import { useRouter } from 'expo-router';

/**
 * Home Screen - Main Food Delivery Page
 * Displays categories, promotions, and nearby restaurants
 * Principes: DRY, KISS, Clean Code
 */
export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // États locaux
  const [favorites, setFavorites] = useState<FavoritesMap>(() =>
    RESTAURANTS.reduce((acc, rest) => ({ ...acc, [rest.id]: rest.isFavorite }), {})
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Hook pour gérer les adresses (avec persistance)
  const { addresses, currentAddress, setCurrentAddress, setTemporaryAddress } = useAddresses();

  // Hook pour gérer les restaurants
  const restaurant = useRestaurant();

  // Charger les catégories depuis Supabase
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError
  } = restaurant.getCategories();

  // Charger les restaurants depuis Supabase basés sur l'adresse actuelle
  const {
    data: restaurantsData,
    isLoading: restaurantsLoading,
    error: restaurantsError
  } = restaurant.getRestaurants({
    latitude: currentAddress?.latitude ?? undefined,
    longitude: currentAddress?.longitude ?? undefined,
    maxDistance: 10, // 10km max
    categoryId: selectedCategoryId ?? undefined, // Filtrer par catégorie si sélectionnée
  });

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

  const handleSearch = useCallback(() => {
    // Navigate to search page
    router.push('/search');
  }, [router]);

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
    // Toggle: si même catégorie, désélectionner. Sinon, sélectionner la nouvelle
    setSelectedCategoryId((prev) => prev === category.id ? null : category.id);
  }, []);

  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    // TODO: Navigate to restaurant details
    console.log('Restaurant selected:', restaurant.name);
  }, []);

  const handleLocationPress = useCallback(() => {
    setAddressSheetVisible(true);
  }, []);

  const handleCloseAddressSheet = useCallback(() => {
    setAddressSheetVisible(false);
  }, []);

  const handleSelectAddress = useCallback((address: Address) => {
    setCurrentAddress(address);
  }, [setCurrentAddress]);

  const handleSetTemporaryAddress = useCallback((address: Address) => {
    setTemporaryAddress(address);
  }, [setTemporaryAddress]);

  // Mapper les catégories Supabase vers le format UI
  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return mapCategoriesToUI(categoriesData);
  }, [categoriesData]);

  // Mapper les restaurants Supabase vers le format UI
  const restaurants = useMemo(() => {
    if (!restaurantsData) return [];
    return mapRestaurantsToUI(restaurantsData);
  }, [restaurantsData]);

  // Memoize static data to prevent unnecessary re-creations (Performance)
  const promoData = useMemo(() => PROMO_DATA, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Surface variant="primary" className="flex-1">
        <Header
          address={currentAddress}
          onLocationPress={handleLocationPress}
          onCartPress={handleCartPress}
          onNotificationPress={handleNotificationPress}
          hasNotification={true}
        >
          <SearchBar
            onPress={handleSearch}
            onFilterPress={handleFilterPress}
            placeholder={t('home:header.searchPlaceholder')}
            editable={false}
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

          {/* Catégories avec loading state */}
          {categoriesLoading ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="small" color="#FFD700" />
            </View>
          ) : categoriesError ? (
            <View className="py-4 px-4">
              <Text className="text-red-500 text-center">
                {t('home:errors.categories', { defaultValue: 'Erreur lors du chargement des catégories' })}
              </Text>
            </View>
          ) : (
            <CategoryList
              categories={categories}
              onCategoryPress={handleCategoryPress}
              selectedCategoryId={selectedCategoryId}
            />
          )}

          {/* Restaurants avec loading state */}
          {restaurantsLoading ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color="#FFD700" />
              <Text className="text-gray-500 mt-4">{t('home:loading.restaurants', { defaultValue: 'Chargement des restaurants...' })}</Text>
            </View>
          ) : restaurantsError ? (
            <View className="py-4 px-4">
              <Text className="text-red-500 text-center">
                {t('home:errors.restaurants', { defaultValue: 'Erreur lors du chargement des restaurants' })}
              </Text>
            </View>
          ) : !currentAddress ? (
            <View className="py-8 px-4">
              <Text className="text-gray-500 text-center">
                {t('home:errors.noAddress', { defaultValue: 'Veuillez sélectionner une adresse pour voir les restaurants' })}
              </Text>
            </View>
          ) : (
            <RestaurantGrid
              restaurants={restaurants}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              onRestaurantPress={handleRestaurantPress}
              title={t('home:restaurants.title')}
            />
          )}
        </ScrollView>

        <FilterDrawer
          visible={filterVisible}
          onClose={handleCloseFilter}
          filters={filterConfig}
          selectedFilters={selectedFilters}
          onApply={handleApplyFilters}
        />

        <AddressBottomSheet
          visible={addressSheetVisible}
          addresses={addresses}
          selectedAddress={currentAddress}
          onClose={handleCloseAddressSheet}
          onSelectAddress={handleSelectAddress}
          onSetTemporaryAddress={handleSetTemporaryAddress}
        />
      </Surface>
    </SafeAreaView>
  );
}
