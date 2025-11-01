/**
 * Restaurant Details Screen - Dynamic route [id]
 *
 * Features:
 * - Displays full restaurant information
 * - Shows menu organized by categories
 * - Displays hours, reviews, and contact info
 * - Distance-based delivery calculations
 * - Favorite toggle
 * - Dark mode support
 *
 * Based on designs/RestaurantDetails.PNG
 */

import React, { useCallback, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { Surface } from '@/components/ui';
import { RestaurantHero, RestaurantMenu, RestaurantSkeleton } from '@/components/Restaurant';
import { useRestaurantDetails } from '@/hooks/useRestaurantDetails';
import { useAddresses } from '@/hooks/useAddresses';
import { useTranslation } from '@/hooks';
import { themeColors } from '@/lib/utils/themeColors';
import type { DishUI } from '@/types';

// Simple header component for restaurant screen
interface RestaurantHeaderProps {
  title: string;
  onBack: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  isDark: boolean;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  title,
  onBack,
  onFavorite,
  isFavorite = false,
  isDark,
}) => (
  <View className="flex-row items-center justify-between px-4 py-3 border-b border-border dark:border-border-dark">
    <TouchableOpacity onPress={onBack} className="p-2">
      <Ionicons
        name="arrow-back"
        size={24}
        color={isDark ? themeColors.foregroundDark : themeColors.foreground}
      />
    </TouchableOpacity>
    <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark flex-1 text-center">
      {title}
    </Text>
    {onFavorite ? (
      <TouchableOpacity onPress={onFavorite} className="p-2">
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? themeColors.primary : (isDark ? themeColors.foregroundDark : themeColors.foreground)}
        />
      </TouchableOpacity>
    ) : (
      <View className="w-10" />
    )}
  </View>
);

// Layout wrapper to avoid duplication
interface ScreenLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ header, children }) => (
  <SafeAreaView className="flex-1" edges={['top']}>
    <Surface variant="primary" className="flex-1">
      {header}
      {children}
    </Surface>
  </SafeAreaView>
);

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Validation: redirect if no ID
  useEffect(() => {
    if (!id || id.trim() === '') {
      Alert.alert(
        t('restaurant:error.title', { defaultValue: 'Erreur' }),
        t('restaurant:error.invalidId', { defaultValue: 'ID de restaurant invalide' }),
        [
          {
            text: 'OK',
            onPress: () => {
              // Fallback navigation - try to go back, or go to home
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/home');
              }
            },
          },
        ]
      );
    }
  }, [id, router, t]);

  // Get current address for distance calculation
  const { currentAddress } = useAddresses();

  // Load restaurant details
  const {
    data: restaurant,
    isLoading,
    isError,
    isRefreshing,
    hasInitialFetch,
    error,
    refetch,
    filteredMenu,
    activeCategoryId,
    setActiveCategoryId,
    searchTerm,
    setSearchTerm,
    toggleFavorite,
    favorite,
  } = useRestaurantDetails({
    restaurantId: id || '',
    latitude: currentAddress?.latitude ?? undefined,
    longitude: currentAddress?.longitude ?? undefined,
    includeReviews: true,
    reviewsLimit: 10,
  });

  // Handlers
  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  }, [router]);

  const handleFavorite = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const handleDishAdd = useCallback((dish: DishUI) => {
    // TODO: Add to cart when cart system is ready
    console.warn('Add to cart:', dish.name);
    Alert.alert(
      'Ajouter au panier',
      `${dish.name} - €${dish.price.toFixed(2)}`,
      [{ text: 'OK' }]
    );
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Loading state - show skeleton before initial fetch
  if (!hasInitialFetch && isLoading) {
    return (
      <ScreenLayout
        header={
          <RestaurantHeader
            title={t('restaurant:loading.title', { defaultValue: 'Chargement...' })}
            onBack={handleBack}
            isDark={isDark}
          />
        }
      >
        <RestaurantSkeleton />
      </ScreenLayout>
    );
  }

  // Error state
  if (isError || !restaurant) {
    const isNotFound = error?.message?.includes('PGRST116') || error?.message?.includes('not found');

    return (
      <ScreenLayout
        header={
          <RestaurantHeader
            title={t('restaurant:error.title', { defaultValue: 'Erreur' })}
            onBack={handleBack}
            isDark={isDark}
          />
        }
      >
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name={isNotFound ? "restaurant-outline" : "alert-circle-outline"}
            size={64}
            color={isDark ? themeColors.mutedDark : themeColors.muted}
          />
          <Text className="text-foreground dark:text-foreground-dark text-center text-xl font-bold mt-6 mb-2">
            {isNotFound
              ? t('restaurant:error.notFound', { defaultValue: 'Restaurant non trouvé' })
              : t('restaurant:error.loadFailed', { defaultValue: 'Erreur de chargement' })
            }
          </Text>
          <Text className="text-muted-foreground dark:text-muted-dark-foreground text-center mb-6">
            {isNotFound
              ? t('restaurant:error.notFoundMessage', { defaultValue: 'Ce restaurant n\'existe pas ou a été supprimé.' })
              : (error?.message || t('restaurant:error.message', { defaultValue: 'Impossible de charger le restaurant' }))
            }
          </Text>
          {!isNotFound && (
            <TouchableOpacity
              onPress={handleRetry}
              className="bg-primary px-6 py-3 rounded-full"
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold">
                {t('restaurant:error.retry', { defaultValue: 'Réessayer' })}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScreenLayout>
    );
  }

  // Success state - display restaurant
  return (
    <ScreenLayout
      header={
        <RestaurantHeader
          title={restaurant.name}
          onBack={handleBack}
          onFavorite={handleFavorite}
          isFavorite={favorite}
          isDark={isDark}
        />
      }
    >

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refetch}
              tintColor={isDark ? themeColors.primaryDark : themeColors.primary}
              colors={[isDark ? themeColors.primaryDark : themeColors.primary]}
            />
          }
        >
          {/* Hero Section */}
          <RestaurantHero
            name={restaurant.name}
            coverImageUrl={restaurant.coverImageUrl}
            rating={restaurant.rating}
            totalReviews={restaurant.totalReviews}
            priceRange={restaurant.priceRange}
            distance={restaurant.distance}
            deliveryTime={restaurant.estimatedTime}
          />

          {/* Description */}
          {restaurant.description && (
            <View className="p-4">
              <Text className="text-sm text-muted-foreground dark:text-muted-dark-foreground leading-5">
                {restaurant.description}
              </Text>
            </View>
          )}

          {/* Menu Section */}
          <RestaurantMenu
            categories={filteredMenu}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeCategoryId={activeCategoryId}
            onCategoryPress={setActiveCategoryId}
            onDishAdd={handleDishAdd}
            emptyMessage={
              searchTerm
                ? t('restaurant:menu.noResults', { defaultValue: 'Aucun plat trouvé pour "{searchTerm}"', searchTerm })
                : t('restaurant:menu.empty', { defaultValue: 'Aucun plat disponible' })
            }
          />
        </ScrollView>
    </ScreenLayout>
  );
}
