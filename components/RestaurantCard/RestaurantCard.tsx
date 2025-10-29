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
  horizontal?: boolean; // Mode horizontal pour grandes images
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
  horizontal = false,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Colors adaptés au dark mode
  const favoriteBgColor = isDark ? 'bg-surface-dark/80' : 'bg-white/80';
  const [isPressed, setIsPressed] = React.useState(false);

  const handleFavoritePress = useCallback(() => {
    onFavoriteToggle(restaurant.id);
  }, [onFavoriteToggle, restaurant.id]);

  const handleCardPress = useCallback(() => {
    onPress?.(restaurant);
  }, [onPress, restaurant]);

  if (horizontal) {
    // Mode horizontal avec grande image (comme dans la maquette "Fastest Near You")
    return (
      <TouchableOpacity
        className={`bg-white dark:bg-card-dark rounded-2xl ${isPressed ? 'shadow-lg' : 'shadow-md'} overflow-hidden mb-4`}
        style={{ width: 200 }}
        onPress={handleCardPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        accessibilityLabel={`${restaurant.name}, rating ${restaurant.rating}`}
        accessibilityRole="button"
      >
        <View className="relative">
          <Image
            source={{ uri: restaurant.image }}
            className="w-full h-32 rounded-t-2xl"
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
              size={16}
              color={isFavorite ? '#EF4444' : '#FFD700'}
            />
          </TouchableOpacity>

          {restaurant.deliveryTimeMin && restaurant.deliveryTimeMax && (
            <View className="absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1 flex-row items-center gap-1">
              <Ionicons name="time-outline" size={12} color="#FFD700" />
              <Text className="text-white text-xs font-semibold">
                {restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} min
              </Text>
            </View>
          )}
        </View>

        <View className="p-3">
          <Text className={`${COLORS.text.primary} font-bold text-sm mb-1`} numberOfLines={1}>
            {restaurant.name}
          </Text>

          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text className={`${COLORS.text.primary} font-semibold text-xs`}>{restaurant.rating}</Text>
            <Text className="text-gray-500 text-[10px]">({restaurant.reviews}+)</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Mode grille (vertical) - existant
  return (
    <TouchableOpacity
      className={`bg-white dark:bg-card-dark rounded-2xl ${isPressed ? 'shadow-lg' : 'shadow-md'} overflow-hidden`}
      style={{ width: '47%' }}
      onPress={handleCardPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityLabel={`${restaurant.name}, rating ${restaurant.rating}`}
      accessibilityRole="button"
    >
      <View className="relative">
        <Image
          source={{ uri: restaurant.image }}
          className="w-full h-40 rounded-t-2xl"
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
            color={isFavorite ? '#EF4444' : '#FFD700'}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className={`${COLORS.text.primary} font-bold text-base mb-1`} numberOfLines={1}>
          {restaurant.name}
        </Text>

        <View className="flex-row items-center gap-1 mb-1">
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text className={`${COLORS.text.primary} font-semibold text-sm`}>{restaurant.rating}</Text>
          <Text className="text-gray-500 text-xs">({restaurant.reviews}+)</Text>
        </View>

        {/* Category name if available */}
        {restaurant.categoryName && (
          <Text className="text-gray-600 dark:text-gray-400 text-xs mb-1" numberOfLines={1}>
            {restaurant.categoryName}
          </Text>
        )}

        {/* Delivery info if available */}
        {(restaurant.deliveryTimeMin || restaurant.distance || restaurant.deliveryFee) && (
          <Text className="text-gray-600 dark:text-gray-400 text-xs" numberOfLines={1}>
            {restaurant.deliveryTimeMin && restaurant.deliveryTimeMax &&
              `${restaurant.deliveryTimeMin}-${restaurant.deliveryTimeMax} min`}
            {restaurant.distance && ` • ${restaurant.distance.toFixed(1)} km`}
            {restaurant.deliveryFee !== undefined && ` • ${restaurant.deliveryFee.toFixed(1)}...`}
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
