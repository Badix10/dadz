/**
 * Mapper pour convertir les données Supabase en types UI pour l'écran détails restaurant
 * Gère la transformation de la structure complexe (plats, catégories, avis, horaires)
 */

import type { Database } from '@/lib/types/supabase';
import type { RestaurantDetails } from '@/lib/services/restaurantService';
import type {
  RestaurantDetailsUI,
  DishCategoryUI,
  DishUI,
  DishOptionUI,
  DishOptionValueUI,
  RestaurantHoursUI,
  RestaurantReviewUI,
} from '@/types';

type DishOptionValue = Database['public']['Tables']['dish_option_values']['Row'];
type DishOption = Database['public']['Tables']['dish_options']['Row'];
type Dish = Database['public']['Tables']['dishes']['Row'];
type DishCategory = Database['public']['Tables']['dish_categories']['Row'];
type RestaurantHours = Database['public']['Tables']['restaurant_hours']['Row'];
type RestaurantReview = Database['public']['Tables']['restaurant_reviews']['Row'];

/**
 * Map option value from Supabase to UI
 */
export function mapDishOptionValueToUI(optionValue: DishOptionValue): DishOptionValueUI {
  return {
    id: optionValue.id,
    name: optionValue.name,
    priceModifier: Number(optionValue.price_modifier),
    isDefault: optionValue.is_default,
    displayOrder: optionValue.display_order,
  };
}

/**
 * Map option from Supabase to UI (with values)
 */
export function mapDishOptionToUI(
  option: DishOption & { dish_option_values?: DishOptionValue[] }
): DishOptionUI {
  return {
    id: option.id,
    name: option.name,
    type: option.type as 'radio' | 'checkbox',
    isRequired: option.is_required,
    displayOrder: option.display_order,
    values: (option.dish_option_values || [])
      .map(mapDishOptionValueToUI)
      .sort((a, b) => a.displayOrder - b.displayOrder),
  };
}

/**
 * Map dish from Supabase to UI (with options)
 */
export function mapDishToUI(
  dish: Dish & { dish_options?: (DishOption & { dish_option_values?: DishOptionValue[] })[] }
): DishUI {
  return {
    id: dish.id,
    name: dish.name,
    slug: dish.slug,
    description: dish.description,
    imageUrl: dish.image_url,
    price: Number(dish.price),
    isAvailable: dish.is_available,
    isPopular: dish.is_popular,
    allergens: dish.allergens || [],
    preparationTime: dish.preparation_time,
    calories: dish.calories,
    displayOrder: dish.display_order,
    categoryId: dish.category_id,
    options: (dish.dish_options || [])
      .map(mapDishOptionToUI)
      .sort((a, b) => a.displayOrder - b.displayOrder),
  };
}

/**
 * Map dish category from Supabase to UI (with dishes)
 */
export function mapDishCategoryToUI(
  category: DishCategory & { dishes?: Dish[] }
): DishCategoryUI {
  return {
    id: category.id,
    name: category.name,
    displayOrder: category.display_order,
    dishes: (category.dishes || [])
      .filter((dish) => dish.is_available) // Only show available dishes
      .map(mapDishToUI)
      .sort((a, b) => a.displayOrder - b.displayOrder),
  };
}

/**
 * Map restaurant hours from Supabase to UI
 */
export function mapRestaurantHoursToUI(hours: RestaurantHours): RestaurantHoursUI {
  return {
    dayOfWeek: hours.day_of_week,
    openTime: hours.open_time,
    closeTime: hours.close_time,
    isClosed: hours.is_closed,
  };
}

/**
 * Map restaurant review from Supabase to UI
 */
export function mapRestaurantReviewToUI(
  review: RestaurantReview & {
    profile?: {
      id: string;
      username: string | null;
      avatar_url: string | null;
      first_name: string | null;
      last_name: string | null;
    } | null;
  }
): RestaurantReviewUI {
  const profile = review.profile;
  const userName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.username || 'Utilisateur anonyme';

  return {
    id: review.id,
    profileId: review.profile_id,
    userName,
    userAvatar: profile?.avatar_url || undefined,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
  };
}

/**
 * Map full restaurant details from Supabase to UI
 * This is the main mapper used by the restaurant details screen
 */
export function mapRestaurantDetailsToUI(
  restaurant: RestaurantDetails
): RestaurantDetailsUI {
  // Calculate delivery info based on distance if available
  const distance = restaurant.distance;
  let deliveryFee: number | undefined;
  let estimatedTime: number | undefined;
  let inDeliveryRange: boolean | undefined;

  if (distance !== undefined) {
    deliveryFee =
      Number(restaurant.delivery_fee_base) +
      distance * Number(restaurant.delivery_fee_per_km);
    deliveryFee = Math.round(deliveryFee * 100) / 100; // Round to 2 decimals

    // Estimate delivery time: base + 3 min per km
    estimatedTime = restaurant.delivery_time_min + Math.round(distance * 3);

    inDeliveryRange = distance <= restaurant.max_delivery_distance;
  }

  return {
    // Basic info
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    description: restaurant.description,
    logoUrl: restaurant.logo_url,
    coverImageUrl: restaurant.cover_image_url,

    // Address & contact
    address: restaurant.address,
    latitude: restaurant.latitude ? Number(restaurant.latitude) : null,
    longitude: restaurant.longitude ? Number(restaurant.longitude) : null,
    phone: restaurant.phone,
    email: restaurant.email,

    // Metrics
    rating: Number(restaurant.rating) || 0,
    totalReviews: restaurant.total_reviews || 0,

    // Delivery
    deliveryTimeMin: restaurant.delivery_time_min,
    deliveryTimeMax: restaurant.delivery_time_max,
    deliveryFeeBase: Number(restaurant.delivery_fee_base),
    deliveryFeePerKm: Number(restaurant.delivery_fee_per_km),
    maxDeliveryDistance: restaurant.max_delivery_distance,
    minimumOrder: Number(restaurant.minimum_order) || 0,

    // Calculated delivery info
    distance,
    deliveryFee,
    estimatedTime,
    inDeliveryRange,

    // Price & status
    priceRange: restaurant.price_range as 'low' | 'medium' | 'high',
    isActive: restaurant.is_active,
    isOpen: restaurant.is_open,

    // Menu (sorted by display_order)
    dishCategories: (restaurant.dish_categories || [])
      .map(mapDishCategoryToUI)
      .filter((category) => category.dishes.length > 0) // Only show categories with available dishes
      .sort((a, b) => a.displayOrder - b.displayOrder),

    // Hours (sorted by day_of_week)
    hours: (restaurant.restaurant_hours || [])
      .map(mapRestaurantHoursToUI)
      .sort((a, b) => a.dayOfWeek - b.dayOfWeek),

    // Reviews (already sorted by created_at DESC in service)
    reviews: (restaurant.restaurant_reviews || []).map(mapRestaurantReviewToUI),

    // Category
    categoryId: restaurant.category_id,
    categoryName: restaurant.category?.name,

    // Timestamps
    createdAt: restaurant.created_at,
    updatedAt: restaurant.updated_at,
  };
}

