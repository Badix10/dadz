/**
 * Service pour gérer les restaurants
 * Fournit des méthodes pour récupérer, filtrer et rechercher des restaurants
 */

import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/types/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];
type RestaurantCategory = Database['public']['Tables']['restaurant_categories']['Row'];
type Dish = Database['public']['Tables']['dishes']['Row'];
type DishCategory = Database['public']['Tables']['dish_categories']['Row'];
type RestaurantHours = Database['public']['Tables']['restaurant_hours']['Row'];
type RestaurantReview = Database['public']['Tables']['restaurant_reviews']['Row'];

/**
 * Restaurant détaillé avec toutes ses relations
 */
export interface RestaurantDetails extends Restaurant {
  distance?: number;
  category?: RestaurantCategory | null;
  dish_categories?: (DishCategory & {
    dishes: Dish[];
  })[];
  restaurant_hours?: RestaurantHours[];
  restaurant_reviews?: (RestaurantReview & {
    profile?: {
      id: string;
      username: string | null;
      avatar_url: string | null;
      first_name: string | null;
      last_name: string | null;
    } | null;
  })[];
}

/**
 * Paramètres pour récupérer un restaurant par ID
 */
export interface GetRestaurantByIdParams {
  restaurantId: string;
  latitude?: number;
  longitude?: number;
  includeReviews?: boolean;
  reviewsLimit?: number;
}

/**
 * Paramètres pour filtrer les restaurants
 */
export interface GetRestaurantsParams {
  latitude?: number;
  longitude?: number;
  categoryId?: string;
  search?: string;
  maxDistance?: number; // en km
  minRating?: number; // 0-5
  priceRange?: 'low' | 'medium' | 'high';
  isOpen?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Restaurant avec distance calculée
 */
export interface RestaurantWithDistance extends Restaurant {
  distance?: number; // en km
  category?: RestaurantCategory | null;
}

class RestaurantService {
  /**
   * MÉTHODE 1: Récupère la liste des restaurants avec filtres
   *
   * @param params - Paramètres de filtrage
   * @returns Liste des restaurants filtrés avec leur distance
   *
   * Fonctionnalités:
   * - Filtrage par catégorie
   * - Filtrage par distance (si latitude/longitude fournis)
   * - Filtrage par note minimale
   * - Filtrage par gamme de prix
   * - Filtrage par statut ouvert/fermé
   * - Recherche par nom
   * - Pagination (limit/offset)
   * - Tri par distance (si coordonnées fournies) ou par note
   */
  async getRestaurants(
    params: GetRestaurantsParams = {}
  ): Promise<RestaurantWithDistance[]> {
    const {
      latitude,
      longitude,
      categoryId,
      search,
      maxDistance = 10,
      minRating,
      priceRange,
      isOpen,
      limit = 20,
      offset = 0,
    } = params;

    // Construire la requête de base
    let query = supabase
      .from('restaurants')
      .select(`
        *,
        category:restaurant_categories(*)
      `)
      .eq('is_active', true);

    // Filtre par catégorie
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    // Filtre par recherche (nom ou description)
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filtre par note minimale
    if (minRating !== undefined) {
      query = query.gte('rating', minRating);
    }

    // Filtre par gamme de prix
    if (priceRange) {
      query = query.eq('price_range', priceRange);
    }

    // Filtre par statut ouvert/fermé
    if (isOpen !== undefined) {
      query = query.eq('is_open', isOpen);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    // Exécuter la requête
    const { data: restaurants, error } = await query;

    if (error) {
      throw new Error(`Erreur lors de la récupération des restaurants: ${error.message}`);
    }

    if (!restaurants) {
      return [];
    }

    // Si des coordonnées sont fournies, calculer la distance et filtrer
    if (latitude !== undefined && longitude !== undefined) {
      const restaurantsWithDistance = restaurants
        .map((restaurant) => {
          if (restaurant.latitude && restaurant.longitude) {
            const distance = this.calculateDistance(
              latitude,
              longitude,
              Number(restaurant.latitude),
              Number(restaurant.longitude)
            );
            return { ...restaurant, distance };
          }
          return { ...restaurant, distance: undefined };
        })
        .filter((restaurant) => {
          // Filtrer par distance maximale
          if (restaurant.distance !== undefined) {
            return restaurant.distance <= maxDistance;
          }
          return false;
        })
        .sort((a, b) => {
          // Trier par distance
          if (a.distance !== undefined && b.distance !== undefined) {
            return a.distance - b.distance;
          }
          return 0;
        });

      return restaurantsWithDistance;
    }

    // Si pas de coordonnées, trier par note
    return restaurants
      .map((restaurant) => ({ ...restaurant, distance: undefined }))
      .sort((a, b) => {
        const ratingA = Number(a.rating) || 0;
        const ratingB = Number(b.rating) || 0;
        return ratingB - ratingA;
      });
  }

  /**
   * Calcule la distance entre deux points GPS (formule de Haversine)
   * @param lat1 - Latitude du point 1
   * @param lon1 - Longitude du point 1
   * @param lat2 - Latitude du point 2
   * @param lon2 - Longitude du point 2
   * @returns Distance en kilomètres
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Arrondir à 1 décimale
  }

  /**
   * Convertit des degrés en radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * MÉTHODE 2: Récupère un restaurant complet par son ID avec tous ses détails
   *
   * @param params - Paramètres incluant l'ID du restaurant et options
   * @returns Restaurant détaillé avec plats, horaires, avis, distance
   *
   * Fonctionnalités:
   * - Récupère les informations complètes du restaurant
   * - Charge la catégorie du restaurant
   * - Charge les plats organisés par catégories
   * - Charge les horaires d'ouverture
   * - Charge les avis clients avec profils (optionnel)
   * - Calcule la distance si coordonnées fournies
   */
  async getRestaurantById(
    params: GetRestaurantByIdParams
  ): Promise<RestaurantDetails | null> {
    const {
      restaurantId,
      latitude,
      longitude,
      includeReviews = true,
      reviewsLimit = 10,
    } = params;

    // Requête principale pour le restaurant
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .select(`
        *,
        category:restaurant_categories(*),
        dish_categories(
          *,
          dishes(*)
        ),
        restaurant_hours(*)
      `)
      .eq('id', restaurantId)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Restaurant not found
        return null;
      }
      throw new Error(`Erreur lors de la récupération du restaurant: ${error.message}`);
    }

    if (!restaurant) {
      return null;
    }

    // Trier les catégories de plats par display_order
    if (restaurant.dish_categories) {
      restaurant.dish_categories.sort((a, b) => a.display_order - b.display_order);

      // Trier les plats dans chaque catégorie par display_order
      restaurant.dish_categories.forEach((category) => {
        if (category.dishes) {
          category.dishes.sort((a, b) => a.display_order - b.display_order);
        }
      });
    }

    // Trier les horaires par jour de la semaine
    if (restaurant.restaurant_hours) {
      restaurant.restaurant_hours.sort((a, b) => a.day_of_week - b.day_of_week);
    }

    // Charger les avis si demandé
    let reviews: RestaurantDetails['restaurant_reviews'] = [];
    if (includeReviews) {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('restaurant_reviews')
        .select(`
          *,
          profile:profiles(
            id,
            username,
            avatar_url,
            first_name,
            last_name
          )
        `)
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false })
        .limit(reviewsLimit);

      if (!reviewsError && reviewsData) {
        reviews = reviewsData;
      }
    }

    // Construire le résultat
    const result: RestaurantDetails = {
      ...restaurant,
      restaurant_reviews: reviews,
    };

    // Calculer la distance si coordonnées fournies
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      restaurant.latitude &&
      restaurant.longitude
    ) {
      result.distance = this.calculateDistance(
        latitude,
        longitude,
        Number(restaurant.latitude),
        Number(restaurant.longitude)
      );
    }

    return result;
  }

  /**
   * MÉTHODE 3: Récupère toutes les catégories de restaurants
   *
   * @returns Liste des catégories triées par display_order
   *
   * Fonctionnalités:
   * - Récupère toutes les catégories disponibles
   * - Tri par ordre d'affichage
   * - Utilisé pour afficher les filtres de catégories
   */
  async getCategories(): Promise<RestaurantCategory[]> {
    const { data, error } = await supabase
      .from('restaurant_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur lors de la récupération des catégories: ${error.message}`);
    }

    return data || [];
  }
}

export const restaurantService = new RestaurantService();
