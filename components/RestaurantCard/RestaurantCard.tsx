import { useTranslation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { Restaurant } from '@/types';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onPress?: (restaurant: Restaurant) => void;
}

/**
 * RestaurantCard component displaying restaurant information
 * Memoized with custom comparison to prevent unnecessary re-renders
 */
const RestaurantCard: React.FC<RestaurantCardProps> = memo(({
  restaurant,
  isFavorite,
  onFavoriteToggle,
  onPress,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Colors adaptés au dark mode
  const favoriteBgColor = isDark ? 'bg-surface-dark/80' : 'bg-white/80';

  const handleFavoritePress = useCallback(() => {
    onFavoriteToggle(restaurant.id);
  }, [onFavoriteToggle, restaurant.id]);

  const handleCardPress = useCallback(() => {
    onPress?.(restaurant);
  }, [onPress, restaurant]);

  return (
    <TouchableOpacity
      className={`${COLORS.surface.card} rounded-2xl shadow-sm overflow-hidden`}
      style={{ width: '47%' }}
      onPress={handleCardPress}
      accessibilityLabel={`${restaurant.name}, rating ${restaurant.rating}`}
      accessibilityRole="button"
    >
      <View className="relative">
        <Image
          source={{ uri: restaurant.image }}
          className="w-full h-28"
          resizeMode="cover"
          accessibilityLabel={`${restaurant.name} image`}
        />

        <TouchableOpacity
          onPress={handleFavoritePress}
          className={`absolute top-2 right-2 ${favoriteBgColor} rounded-full p-1.5 shadow-md`}
          accessibilityLabel={isFavorite ? t('home:restaurants.removeFromFavorites') : t('home:restaurants.addToFavorites')}
          accessibilityRole="button"
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#EF4444' : '#9CA3AF'}
          />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className={`${COLORS.text.primary} font-semibold text-base`} numberOfLines={1}>
          {restaurant.name}
        </Text>

        <View className="flex-row items-center gap-1 mb-1">
          <Ionicons name="star" size={16} color="#FFC700" />
          <Text className={`${COLORS.text.primary} font-semibold`}>{restaurant.rating}</Text>
          <Text className={`${COLORS.text.secondary} text-sm`}>({restaurant.reviews})</Text>
        </View>

        {/* Category name if available */}
        {restaurant.categoryName && (
          <Text className={`${COLORS.text.secondary} text-xs mb-1`} numberOfLines={1}>
            {restaurant.categoryName}
          </Text>
        )}

        {/* Delivery info if available */}
        {(restaurant.deliveryTimeMin || restaurant.distance || restaurant.deliveryFee) && (
          <Text className={`${COLORS.text.secondary} text-xs`} numberOfLines={1}>
            {restaurant.deliveryTimeMin && restaurant.deliveryTimeMax &&
              `${restaurant.deliveryTimeMin}-${restaurant.deliveryTimeMax} min`}
            {restaurant.distance && ` • ${restaurant.distance.toFixed(1)} km`}
            {restaurant.deliveryFee !== undefined && ` • ${restaurant.deliveryFee.toFixed(2)}€ delivery`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for optimal memoization
  return (
    prevProps.restaurant.id === nextProps.restaurant.id &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.restaurant.name === nextProps.restaurant.name &&
    prevProps.restaurant.rating === nextProps.restaurant.rating
  );
});

RestaurantCard.displayName = 'RestaurantCard';

export default RestaurantCard;
