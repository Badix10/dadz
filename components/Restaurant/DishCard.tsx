/**
 * DishCard - Carte de plat dans le menu
 * Affiche l'image, le nom, la description, le prix et un bouton d'ajout
 */

import type { DishUI } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface DishCardProps {
  dish: DishUI;
  onAddPress: (dish: DishUI) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onAddPress }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Default placeholder
  // const imageSource = dish.imageUrl
  //   ? { uri: dish.imageUrl }
  //   : require('@/assets/images/dish-placeholder.jpg');

    const imageSource = require('@/assets/images/dish-placeholder.jpg');
  return (
    <View className="flex-row items-center py-3 px-4">
      {/* Dish Image */}
      <Image
        source={imageSource}
        className="w-16 h-16 rounded-full"
        resizeMode="cover"
      />

      {/* Dish Info */}
      <View className="flex-1 ml-3">
        {/* Name + Popular badge */}
        <View className="flex-row items-center">
          <Text className="text-base font-semibold text-foreground dark:text-foreground-dark flex-1">
            {dish.name}
          </Text>
          {dish.isPopular && (
            <View className="bg-primary/10 dark:bg-primary-dark/10 px-2 py-0.5 rounded-full ml-2">
              <Text className="text-xs text-primary dark:text-primary-dark font-medium">
                Populaire
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {dish.description && (
          <Text
            className="text-sm text-muted-foreground dark:text-muted-dark-foreground mt-1"
            numberOfLines={2}
          >
            {dish.description}
          </Text>
        )}

        {/* Price */}
        <Text className="text-base font-bold text-foreground dark:text-foreground-dark mt-1">
          €{dish.price.toFixed(2)}
        </Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        onPress={() => onAddPress(dish)}
        className="w-10 h-10 rounded-full bg-primary items-center justify-center ml-3"
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
