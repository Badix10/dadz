/**
 * RestaurantHero - Section hero du restaurant
 * Affiche l'image de couverture, le nom, la note et les informations clés
 */

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface RestaurantHeroProps {
  name: string;
  coverImageUrl: string | null;
  rating: number;
  totalReviews: number;
  priceRange: 'low' | 'medium' | 'high';
  distance?: number;
  deliveryTime?: number;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({
  name,
  coverImageUrl,
  rating,
  totalReviews,
  priceRange,
  distance,
  deliveryTime,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Format price range
  const priceSymbols = {
    low: '€',
    medium: '€€',
    high: '€€€',
  };

  // Default placeholder image
  const imageSource = coverImageUrl
    ? { uri: coverImageUrl }
    : require('@/assets/images/restaurant-placeholder.jpg');

  return (
    <View className="relative">
      {/* Cover Image */}
      <Image
        source={imageSource}
        className="w-full h-64 rounded-b-3xl"
        resizeMode="cover"
      />

      {/* Overlay gradient (for text readability) */}
      <View className="absolute inset-0 bg-black/40 rounded-b-3xl" />

      {/* Restaurant info overlay */}
      <View className="absolute bottom-0 left-0 right-0 p-4">
        {/* Name */}
        <Text className="text-3xl font-bold text-white mb-2">{name}</Text>

        {/* Metadata row */}
        <View className="flex-row items-center space-x-3 flex-wrap">
          {/* Rating */}
          <View className="flex-row items-center space-x-1">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-white font-semibold">{rating.toFixed(1)}</Text>
          </View>

          {/* Separator */}
          <Text className="text-white/70">•</Text>

          {/* Reviews */}
          <Text className="text-white/90">{totalReviews}+ reviews</Text>

          {/* Separator */}
          <Text className="text-white/70">•</Text>

          {/* Price range */}
          <Text className="text-white/90 font-semibold">{priceSymbols[priceRange]}</Text>

          {/* Distance (if available) */}
          {distance !== undefined && (
            <>
              <Text className="text-white/70">•</Text>
              <Text className="text-white/90">{distance.toFixed(1)} km</Text>
            </>
          )}

          {/* Delivery time (if available) */}
          {deliveryTime !== undefined && (
            <>
              <Text className="text-white/70">•</Text>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.9)" />
                <Text className="text-white/90">{deliveryTime} min</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
