/**
 * Core type definitions for the food delivery app
 */

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  image: string;
  isFavorite: boolean;
  // Extended fields from Supabase (optional for backwards compatibility)
  distance?: number; // en km
  deliveryTimeMin?: number; // en minutes
  deliveryTimeMax?: number; // en minutes
  deliveryFee?: number; // en €
  categoryName?: string; // ex: "Italian • Pizza"
  priceRange?: 'low' | 'medium' | 'high'; // €, €€, €€€
}

export interface NavigationTab {
  name: string;
  icon: string;
  iconOutline: string;
}

export type FavoritesMap = Record<string, boolean>;

export interface LocationData {
  city: string;
  country: string;
}
