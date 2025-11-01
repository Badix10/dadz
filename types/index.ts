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

/**
 * Restaurant Details Screen Types
 */

// Option pour personnaliser un plat
export interface DishOptionUI {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  isRequired: boolean;
  displayOrder: number;
  values: DishOptionValueUI[];
}

// Valeur d'une option
export interface DishOptionValueUI {
  id: string;
  name: string;
  priceModifier: number;
  isDefault: boolean;
  displayOrder: number;
}

// Plat d'un restaurant
export interface DishUI {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  isAvailable: boolean;
  isPopular: boolean;
  allergens: string[];
  preparationTime: number | null;
  calories: number | null;
  displayOrder: number;
  categoryId: string | null;
  options: DishOptionUI[];
}

// Catégorie de plats dans un restaurant
export interface DishCategoryUI {
  id: string;
  name: string;
  displayOrder: number;
  dishes: DishUI[];
}

// Horaire d'ouverture
export interface RestaurantHoursUI {
  dayOfWeek: number; // 0=Dimanche, 1=Lundi, ..., 6=Samedi
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

// Avis d'un client
export interface RestaurantReviewUI {
  id: string;
  profileId: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// Détails complets d'un restaurant
export interface RestaurantDetailsUI {
  // Informations de base
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;

  // Adresse et contact
  address: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;

  // Métriques
  rating: number;
  totalReviews: number;

  // Livraison
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFeeBase: number;
  deliveryFeePerKm: number;
  maxDeliveryDistance: number;
  minimumOrder: number;

  // Calculs basés sur localisation client (optionnel)
  distance?: number;
  deliveryFee?: number;
  estimatedTime?: number;
  inDeliveryRange?: boolean;

  // Prix et statut
  priceRange: 'low' | 'medium' | 'high';
  isActive: boolean;
  isOpen: boolean;

  // Menu
  dishCategories: DishCategoryUI[];

  // Horaires
  hours: RestaurantHoursUI[];

  // Avis
  reviews: RestaurantReviewUI[];

  // Catégorie du restaurant
  categoryId: string | null;
  categoryName?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}
