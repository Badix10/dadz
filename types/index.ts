/**
 * Core type definitions for the food delivery app
 */

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  image: string;
  isFavorite: boolean;
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
