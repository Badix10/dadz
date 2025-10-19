import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';
import type { FavoritesMap, Restaurant } from '@/types';
import RestaurantCard from '../RestaurantCard';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  favorites: FavoritesMap;
  onFavoriteToggle: (id: string) => void;
  onRestaurantPress?: (restaurant: Restaurant) => void;
  title?: string;
}

/**
 * RestaurantGrid component displaying a grid of restaurant cards
 * Optimized for performance with memoization
 */
const RestaurantGrid: React.FC<RestaurantGridProps> = memo(({
  restaurants,
  favorites,
  onFavoriteToggle,
  onRestaurantPress,
  title = 'Fastest Near You',
}) => {
  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    onRestaurantPress?.(restaurant);
  }, [onRestaurantPress]);

  return (
    <View className="px-4 mt-2 pb-24">
      <Text className="text-xl font-bold text-black mb-4">{title}</Text>

      <View className="flex-row flex-wrap gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isFavorite={favorites[restaurant.id] || false}
            onFavoriteToggle={onFavoriteToggle}
            onPress={handleRestaurantPress}
          />
        ))}
      </View>
    </View>
  );
});

RestaurantGrid.displayName = 'RestaurantGrid';

export default RestaurantGrid;
