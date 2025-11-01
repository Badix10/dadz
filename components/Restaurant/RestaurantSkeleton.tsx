/**
 * RestaurantSkeleton - Placeholder de chargement pour l'écran restaurant
 * Affiche un skeleton pendant le chargement initial des données
 */

import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

export const RestaurantSkeleton: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const skeletonBg = isDark ? 'bg-muted-dark' : 'bg-muted';
  const shimmer = isDark ? 'opacity-30' : 'opacity-50';

  return (
    <View className="flex-1">
      {/* Hero skeleton */}
      <View className={`h-64 ${skeletonBg} ${shimmer} rounded-b-3xl`} />

      {/* Description skeleton */}
      <View className="p-4 space-y-2">
        <View className={`h-4 ${skeletonBg} ${shimmer} rounded w-3/4`} />
        <View className={`h-4 ${skeletonBg} ${shimmer} rounded w-full`} />
        <View className={`h-4 ${skeletonBg} ${shimmer} rounded w-5/6`} />
      </View>

      {/* Menu title skeleton */}
      <View className="px-4 pt-6 pb-2">
        <View className={`h-6 ${skeletonBg} ${shimmer} rounded w-32`} />
      </View>

      {/* Search bar skeleton */}
      <View className="px-4 pb-4">
        <View className={`h-12 ${skeletonBg} ${shimmer} rounded-full`} />
      </View>

      {/* Dish cards skeleton */}
      <View className="px-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="flex-row items-center space-x-3">
            {/* Image */}
            <View className={`w-16 h-16 ${skeletonBg} ${shimmer} rounded-full`} />

            {/* Content */}
            <View className="flex-1 space-y-2">
              <View className={`h-4 ${skeletonBg} ${shimmer} rounded w-2/3`} />
              <View className={`h-3 ${skeletonBg} ${shimmer} rounded w-full`} />
              <View className={`h-4 ${skeletonBg} ${shimmer} rounded w-16`} />
            </View>

            {/* Add button */}
            <View className={`w-10 h-10 ${skeletonBg} ${shimmer} rounded-full`} />
          </View>
        ))}
      </View>
    </View>
  );
};
