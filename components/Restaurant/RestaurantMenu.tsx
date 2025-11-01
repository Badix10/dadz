/**
 * RestaurantMenu - Section menu du restaurant
 * Affiche la recherche, les catégories et la liste des plats
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useDebounce } from '@/hooks/useDebounce';
import { DishCard } from './DishCard';
import { themeColors } from '@/lib/utils/themeColors';
import type { DishCategoryUI, DishUI } from '@/types';

interface RestaurantMenuProps {
  categories: DishCategoryUI[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeCategoryId: string | null;
  onCategoryPress: (categoryId: string | null) => void;
  onDishAdd: (dish: DishUI) => void;
  emptyMessage?: string;
}

export const RestaurantMenu: React.FC<RestaurantMenuProps> = ({
  categories,
  searchTerm,
  onSearchChange,
  activeCategoryId,
  onCategoryPress,
  onDishAdd,
  emptyMessage = 'Aucun plat disponible',
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Debounce search (200ms as per plan)
  const debouncedSearch = useDebounce(localSearch, 200);

  // Update parent when debounced value changes
  React.useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleSearchChange = useCallback((text: string) => {
    setLocalSearch(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setLocalSearch('');
    onSearchChange('');
  }, [onSearchChange]);

  // All categories option
  const allCategories = [
    { id: null, name: 'Tous' },
    ...categories.map(cat => ({ id: cat.id, name: cat.name })),
  ];

  return (
    <View className="flex-1">
      {/* Menu Title */}
      <Text className="text-xl font-bold text-foreground dark:text-foreground-dark px-4 pt-6 pb-2">
        Notre Menu
      </Text>

      {/* Search Bar */}
      <View className="px-4 pb-4">
        <View className="flex-row items-center bg-input dark:bg-input-dark rounded-full px-4 py-3">
          <Ionicons
            name="search"
            size={20}
            color={isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground}
          />
          <TextInput
            value={localSearch}
            onChangeText={handleSearchChange}
            placeholder="Rechercher un plat..."
            placeholderTextColor={isDark ? themeColors.mutedDark : themeColors.muted}
            className="flex-1 ml-2 text-foreground dark:text-foreground-dark"
          />
          {localSearch.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color={isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground}
              onPress={handleClearSearch}
            />
          )}
        </View>
      </View>

      {/* Category Filters (horizontal scroll) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 pb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {allCategories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <View
              key={cat.id || 'all'}
              className={`px-4 py-2 rounded-full ${
                isActive
                  ? 'bg-primary'
                  : 'bg-card dark:bg-card-dark border border-border dark:border-border-dark'
              }`}
              onTouchEnd={() => onCategoryPress(cat.id)}
            >
              <Text
                className={`font-medium ${
                  isActive
                    ? 'text-white'
                    : 'text-foreground dark:text-foreground-dark'
                }`}
              >
                {cat.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Dishes List */}
      {categories.length === 0 ? (
        <View className="flex-1 items-center justify-center py-12">
          <Ionicons
            name="restaurant-outline"
            size={48}
            color={isDark ? themeColors.mutedDark : themeColors.muted}
          />
          <Text className="text-muted-foreground dark:text-muted-dark-foreground mt-4 text-center px-8">
            {emptyMessage}
          </Text>
        </View>
      ) : (
        <View className="flex-1">
          {categories.map((category) => (
            <View key={category.id} className="mb-6">
              {/* Category Name */}
              <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark px-4 mb-2">
                {category.name}
              </Text>

              {/* Dishes in category */}
              {category.dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onAddPress={onDishAdd}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
