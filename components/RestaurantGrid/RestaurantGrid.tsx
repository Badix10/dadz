import React, { memo, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { FavoritesMap, Restaurant } from '@/types';
import RestaurantCard from '../RestaurantCard';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  favorites: FavoritesMap;
  onFavoriteToggle: (id: string) => void;
  onRestaurantPress?: (restaurant: Restaurant) => void;
  title?: string;
  horizontal?: boolean; // Mode horizontal (scroll) au lieu de grille
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
  horizontal = false,
}) => {
  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    onRestaurantPress?.(restaurant);
  }, [onRestaurantPress]);

  if (horizontal) {
    return (
      <View className="mt-2 pb-6">
        <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4 px-4">{title}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
          decelerationRate="fast"
          snapToInterval={216} // width (200) + gap (16)
          snapToAlignment="start"
        >
          {restaurants.map((restaurant, index) => (
            <View key={restaurant.id} style={{ marginRight: index === restaurants.length - 1 ? 0 : 16 }}>
              <RestaurantCard
                restaurant={restaurant}
                isFavorite={favorites[restaurant.id] || false}
                onFavoriteToggle={onFavoriteToggle}
                onPress={handleRestaurantPress}
                horizontal={true}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="px-4 mt-2 pb-24">
      <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-4">{title}</Text>

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
