/**
 * Mappers pour convertir les données Supabase en types UI
 */

import type { Database } from '@/lib/types/supabase';
import type { RestaurantWithDistance, RestaurantDetails } from '@/lib/services/restaurantService';
import type { Category, Restaurant } from '@/types';

type RestaurantCategory = Database['public']['Tables']['restaurant_categories']['Row'];

/**
 * Mapping des slugs de catégories vers les icônes Ionicons
 */
const CATEGORY_ICON_MAP: Record<string, string> = {
  'burger': 'fast-food',
  'pizza': 'pizza',
  'pizzeria': 'pizza',
  'sushi': 'fish',
  'fast-food': 'cafe',
  'japanese': 'restaurant',
  'dessert': 'ice-cream',
  'desserts': 'ice-cream',
  'drinks': 'beer',
  'healthy': 'leaf',
  'mexican': 'flame',
  'italian': 'wine',
  'asian': 'restaurant',
  'chinese': 'restaurant',
  'indian': 'flame',
  'mediterranean': 'leaf',
  'seafood': 'fish',
  'steakhouse': 'restaurant',
  'vegetarian': 'leaf',
  'vegan': 'leaf',
  'bakery': 'cafe',
  'cafe': 'cafe',
  'coffee': 'cafe',
};

/**
 * Convertit une catégorie Supabase en catégorie UI
 */
export function mapCategoryToUI(category: RestaurantCategory): Category {
  // Utiliser le slug pour trouver l'icône correspondante
  const icon = CATEGORY_ICON_MAP[category.slug.toLowerCase()] || 'restaurant';

  return {
    id: category.id,
    name: category.name,
    icon,
  };
}

/**
 * Convertit un tableau de catégories Supabase en catégories UI
 */
export function mapCategoriesToUI(categories: RestaurantCategory[]): Category[] {
  return categories.map(mapCategoryToUI);
}

/**
 * Formate le nombre d'avis pour l'affichage (1234 → "1k+")
 */
export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}k+`;
  }
  return `${count}+`;
}

/**
 * Convertit un restaurant Supabase en restaurant UI
 * Inclut les données étendues (distance, delivery, etc.) si disponibles
 */
export function mapRestaurantToUI(restaurant: RestaurantWithDistance | RestaurantDetails): Restaurant {
  const baseRestaurant: Restaurant = {
    id: restaurant.id,
    name: restaurant.name,
    rating: Number(restaurant.rating) || 0,
    reviews: formatReviewCount(restaurant.total_reviews || 0),
    image: restaurant.cover_image_url || restaurant.logo_url || '',
    isFavorite: false, // Sera géré par le système de favoris
  };

  // Ajouter les données étendues si c'est un RestaurantWithDistance
  if ('distance' in restaurant && restaurant.distance !== undefined) {
    const deliveryFee = Number(restaurant.delivery_fee_base) +
                       (restaurant.distance * Number(restaurant.delivery_fee_per_km));

    baseRestaurant.distance = restaurant.distance;
    baseRestaurant.deliveryTimeMin = restaurant.delivery_time_min;
    baseRestaurant.deliveryTimeMax = restaurant.delivery_time_max;
    baseRestaurant.deliveryFee = Math.round(deliveryFee * 100) / 100; // Arrondir à 2 décimales
    baseRestaurant.categoryName = restaurant.category?.name || '';
    baseRestaurant.priceRange = restaurant.price_range as 'low' | 'medium' | 'high';
  }

  return baseRestaurant;
}

/**
 * Convertit un tableau de restaurants Supabase en restaurants UI
 */
export function mapRestaurantsToUI(restaurants: (RestaurantWithDistance | RestaurantDetails)[]): Restaurant[] {
  return restaurants.map(mapRestaurantToUI);
}
