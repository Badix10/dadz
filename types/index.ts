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

/**
 * Search-related types
 */

// État de recherche global
export interface SearchState {
  query: string;                    // Texte de recherche
  categoryId: string | null;        // Catégorie sélectionnée
  filters: SearchFilters;           // Filtres actifs
  isSearching: boolean;             // Loading state
}

// Filtres de recherche
export interface SearchFilters {
  rating?: number;                  // Note min (4.5, 4.0, etc.)
  priceRanges?: ('low' | 'medium' | 'high')[]; // Plusieurs prix OK
  maxDeliveryTime?: number;         // En minutes
  maxDistance?: number;             // En km
  isOpen?: boolean;                 // Uniquement ouvert maintenant
}

// Historique de recherche
export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  resultCount: number;
}

// Suggestion de recherche
export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'history' | 'trending' | 'category';
  icon?: string;
}
