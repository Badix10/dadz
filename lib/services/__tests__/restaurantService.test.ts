/**
 * Tests pour restaurantService
 */

import { restaurantService } from '../restaurantService';
import { supabase } from '@/lib/supabase';

// Mock de Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('RestaurantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRestaurants', () => {
    const mockRestaurants = [
      {
        id: '1',
        name: 'Pizza Roma',
        slug: 'pizza-roma',
        description: 'Pizzeria italienne authentique',
        category_id: 'cat-1',
        latitude: 48.8566,
        longitude: 2.3522,
        rating: 4.5,
        total_reviews: 120,
        is_active: true,
        is_open: true,
        price_range: 'medium',
        delivery_time_min: 20,
        delivery_time_max: 30,
        delivery_fee_base: 2.5,
        delivery_fee_per_km: 0.5,
        max_delivery_distance: 10,
        minimum_order: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        address: '123 Rue Test',
        phone: null,
        email: null,
        logo_url: null,
        cover_image_url: null,
      },
      {
        id: '2',
        name: 'Burger King',
        slug: 'burger-king',
        description: 'Fast-food américain',
        category_id: 'cat-2',
        latitude: 48.8698,
        longitude: 2.3076,
        rating: 4.0,
        total_reviews: 85,
        is_active: true,
        is_open: true,
        price_range: 'low',
        delivery_time_min: 15,
        delivery_time_max: 25,
        delivery_fee_base: 2.0,
        delivery_fee_per_km: 0.5,
        max_delivery_distance: 8,
        minimum_order: 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        address: '456 Rue Test',
        phone: null,
        email: null,
        logo_url: null,
        cover_image_url: null,
      },
    ];

    it('should fetch all active restaurants without filters', async () => {
      // Mock la chaîne de méthodes Supabase
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockRestaurants,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants();

      // Assert
      expect(supabase.from).toHaveBeenCalledWith('restaurants');
      expect(mockSelect).toHaveBeenCalledWith(expect.stringContaining('category:restaurant_categories'));
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Pizza Roma');
    });

    it('should filter restaurants by category', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [mockRestaurants[0]],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        categoryId: 'cat-1',
      });

      // Assert
      expect(mockQuery.eq).toHaveBeenCalledWith('category_id', 'cat-1');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Pizza Roma');
    });

    it('should filter restaurants by search term', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [mockRestaurants[0]],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        search: 'pizza',
      });

      // Assert
      expect(mockQuery.or).toHaveBeenCalledWith('name.ilike.%pizza%,description.ilike.%pizza%');
      expect(result).toHaveLength(1);
    });

    it('should filter restaurants by minimum rating', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [mockRestaurants[0]],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        minRating: 4.5,
      });

      // Assert
      expect(mockQuery.gte).toHaveBeenCalledWith('rating', 4.5);
      expect(result).toHaveLength(1);
    });

    it('should filter restaurants by price range', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [mockRestaurants[1]],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        priceRange: 'low',
      });

      // Assert
      expect(mockQuery.eq).toHaveBeenCalledWith('price_range', 'low');
      expect(result).toHaveLength(1);
    });

    it('should filter restaurants by open status', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockRestaurants,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        isOpen: true,
      });

      // Assert
      expect(mockQuery.eq).toHaveBeenCalledWith('is_open', true);
      expect(result).toHaveLength(2);
    });

    it('should calculate distance and filter by maxDistance when coordinates provided', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockRestaurants,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act - Recherche depuis un point proche de Pizza Roma
      const result = await restaurantService.getRestaurants({
        latitude: 48.8566,
        longitude: 2.3522,
        maxDistance: 10,
      });

      // Assert
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].distance).toBeDefined();
      // Vérifier que la distance est calculée
      result.forEach((restaurant) => {
        expect(restaurant.distance).toBeLessThanOrEqual(10);
      });
    });

    it('should sort by distance when coordinates provided', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockRestaurants,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act - Recherche depuis un point proche de Pizza Roma
      const result = await restaurantService.getRestaurants({
        latitude: 48.8566,
        longitude: 2.3522,
      });

      // Assert - Le premier résultat devrait être Pizza Roma (distance ~0km)
      expect(result[0].name).toBe('Pizza Roma');
      expect(result[0].distance).toBeLessThan(1); // Très proche
    });

    it('should sort by rating when no coordinates provided', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockRestaurants,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants();

      // Assert - Devrait être trié par note (Pizza Roma 4.5 avant Burger King 4.0)
      expect(result[0].name).toBe('Pizza Roma');
      expect(result[0].rating).toBe(4.5);
    });

    it('should handle pagination with limit and offset', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [mockRestaurants[0]],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants({
        limit: 1,
        offset: 0,
      });

      // Assert
      expect(mockQuery.range).toHaveBeenCalledWith(0, 0); // offset 0, offset + limit - 1 = 0
      expect(result).toHaveLength(1);
    });

    it('should return empty array when no restaurants found', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurants();

      // Assert
      expect(result).toEqual([]);
    });

    it('should throw error when database query fails', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database connection failed' },
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act & Assert
      await expect(restaurantService.getRestaurants()).rejects.toThrow(
        'Erreur lors de la récupération des restaurants: Database connection failed'
      );
    });
  });

  describe('getRestaurantById', () => {
    const mockRestaurantDetails = {
      id: '1',
      name: 'Pizza Roma',
      slug: 'pizza-roma',
      description: 'Pizzeria italienne authentique',
      category_id: 'cat-1',
      latitude: 48.8566,
      longitude: 2.3522,
      rating: 4.5,
      total_reviews: 120,
      is_active: true,
      is_open: true,
      price_range: 'medium',
      delivery_time_min: 20,
      delivery_time_max: 30,
      delivery_fee_base: 2.5,
      delivery_fee_per_km: 0.5,
      max_delivery_distance: 10,
      minimum_order: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      address: '123 Rue Test',
      phone: null,
      email: null,
      logo_url: null,
      cover_image_url: null,
      category: {
        id: 'cat-1',
        name: 'Pizzeria',
        slug: 'pizzeria',
        icon_url: null,
        display_order: 0,
        created_at: new Date().toISOString(),
      },
      dish_categories: [
        {
          id: 'dc-1',
          restaurant_id: '1',
          name: 'Pizzas',
          display_order: 0,
          created_at: new Date().toISOString(),
          dishes: [
            {
              id: 'd-1',
              restaurant_id: '1',
              category_id: 'dc-1',
              name: 'Margherita',
              slug: 'margherita',
              description: 'Tomate, mozzarella, basilic',
              price: 9.5,
              is_available: true,
              is_popular: true,
              display_order: 0,
              image_url: null,
              allergens: null,
              preparation_time: 15,
              calories: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        },
      ],
      restaurant_hours: [
        {
          id: 'h-1',
          restaurant_id: '1',
          day_of_week: 1,
          open_time: '11:00:00',
          close_time: '23:00:00',
          is_closed: false,
        },
      ],
    };

    const mockReviews = [
      {
        id: 'r-1',
        restaurant_id: '1',
        profile_id: 'p-1',
        rating: 5,
        comment: 'Excellente pizza !',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile: {
          id: 'p-1',
          username: 'john_doe',
          avatar_url: null,
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    ];

    it('should fetch a restaurant by id with all details', async () => {
      // Mock la requête principale
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockRestaurantDetails,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Mock la requête des avis
      const mockReviewsQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: mockReviews,
          error: null,
        }),
      };

      const mockReviewsSelect = jest.fn().mockReturnValue(mockReviewsQuery);

      // Premier appel pour le restaurant, deuxième pour les avis
      (supabase.from as jest.Mock)
        .mockReturnValueOnce({
          select: mockSelect,
        })
        .mockReturnValueOnce({
          select: mockReviewsSelect,
        });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: '1',
      });

      // Assert
      expect(result).not.toBeNull();
      expect(result?.name).toBe('Pizza Roma');
      expect(result?.category).toBeDefined();
      expect(result?.dish_categories).toHaveLength(1);
      expect(result?.dish_categories?.[0].dishes).toHaveLength(1);
      expect(result?.restaurant_hours).toHaveLength(1);
      expect(result?.restaurant_reviews).toHaveLength(1);
    });

    it('should calculate distance when coordinates provided', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockRestaurantDetails,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);

      const mockReviewsQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: mockReviews,
          error: null,
        }),
      };

      const mockReviewsSelect = jest.fn().mockReturnValue(mockReviewsQuery);

      (supabase.from as jest.Mock)
        .mockReturnValueOnce({
          select: mockSelect,
        })
        .mockReturnValueOnce({
          select: mockReviewsSelect,
        });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: '1',
        latitude: 48.8566,
        longitude: 2.3522,
      });

      // Assert
      expect(result?.distance).toBeDefined();
      expect(result?.distance).toBeLessThan(1); // Très proche
    });

    it('should not include reviews when includeReviews is false', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockRestaurantDetails,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: '1',
        includeReviews: false,
      });

      // Assert
      expect(result).not.toBeNull();
      expect(result?.restaurant_reviews).toEqual([]);
      // Vérifier que supabase.from n'a été appelé qu'une fois (pas d'appel pour les avis)
      expect(supabase.from).toHaveBeenCalledTimes(1);
    });

    it('should limit reviews when reviewsLimit is specified', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockRestaurantDetails,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);

      const mockReviewsQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: mockReviews,
          error: null,
        }),
      };

      const mockReviewsSelect = jest.fn().mockReturnValue(mockReviewsQuery);

      (supabase.from as jest.Mock)
        .mockReturnValueOnce({
          select: mockSelect,
        })
        .mockReturnValueOnce({
          select: mockReviewsSelect,
        });

      // Act
      await restaurantService.getRestaurantById({
        restaurantId: '1',
        reviewsLimit: 5,
      });

      // Assert
      expect(mockReviewsQuery.limit).toHaveBeenCalledWith(5);
    });

    it('should return null when restaurant not found', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { code: 'PGRST116', message: 'Row not found' },
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: 'non-existent',
      });

      // Assert
      expect(result).toBeNull();
    });

    it('should throw error when database query fails', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { code: 'PGRST500', message: 'Database error' },
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act & Assert
      await expect(
        restaurantService.getRestaurantById({ restaurantId: '1' })
      ).rejects.toThrow('Erreur lors de la récupération du restaurant: Database error');
    });

    it('should sort dish categories and dishes by display_order', async () => {
      const unsortedMockData = {
        ...mockRestaurantDetails,
        dish_categories: [
          {
            id: 'dc-2',
            restaurant_id: '1',
            name: 'Desserts',
            display_order: 2,
            created_at: new Date().toISOString(),
            dishes: [
              {
                id: 'd-3',
                restaurant_id: '1',
                category_id: 'dc-2',
                name: 'Tiramisu',
                slug: 'tiramisu',
                description: 'Dessert italien',
                price: 6.0,
                is_available: true,
                is_popular: false,
                display_order: 1,
                image_url: null,
                allergens: null,
                preparation_time: 5,
                calories: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                id: 'd-4',
                restaurant_id: '1',
                category_id: 'dc-2',
                name: 'Panna Cotta',
                slug: 'panna-cotta',
                description: 'Crème italienne',
                price: 5.5,
                is_available: true,
                is_popular: false,
                display_order: 0,
                image_url: null,
                allergens: null,
                preparation_time: 5,
                calories: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
          },
          {
            id: 'dc-1',
            restaurant_id: '1',
            name: 'Pizzas',
            display_order: 0,
            created_at: new Date().toISOString(),
            dishes: [
              {
                id: 'd-1',
                restaurant_id: '1',
                category_id: 'dc-1',
                name: 'Margherita',
                slug: 'margherita',
                description: 'Tomate, mozzarella, basilic',
                price: 9.5,
                is_available: true,
                is_popular: true,
                display_order: 0,
                image_url: null,
                allergens: null,
                preparation_time: 15,
                calories: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
          },
        ],
      };

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: unsortedMockData,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);

      const mockReviewsQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      };

      const mockReviewsSelect = jest.fn().mockReturnValue(mockReviewsQuery);

      (supabase.from as jest.Mock)
        .mockReturnValueOnce({
          select: mockSelect,
        })
        .mockReturnValueOnce({
          select: mockReviewsSelect,
        });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: '1',
      });

      // Assert
      expect(result?.dish_categories?.[0].name).toBe('Pizzas'); // display_order 0
      expect(result?.dish_categories?.[1].name).toBe('Desserts'); // display_order 2
      expect(result?.dish_categories?.[1].dishes[0].name).toBe('Panna Cotta'); // display_order 0
      expect(result?.dish_categories?.[1].dishes[1].name).toBe('Tiramisu'); // display_order 1
    });

    it('should sort restaurant hours by day of week', async () => {
      const unsortedHours = {
        ...mockRestaurantDetails,
        restaurant_hours: [
          {
            id: 'h-3',
            restaurant_id: '1',
            day_of_week: 5,
            open_time: '11:00:00',
            close_time: '23:00:00',
            is_closed: false,
          },
          {
            id: 'h-1',
            restaurant_id: '1',
            day_of_week: 1,
            open_time: '11:00:00',
            close_time: '23:00:00',
            is_closed: false,
          },
          {
            id: 'h-2',
            restaurant_id: '1',
            day_of_week: 3,
            open_time: '11:00:00',
            close_time: '23:00:00',
            is_closed: false,
          },
        ],
      };

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: unsortedHours,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);

      const mockReviewsQuery = {
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      };

      const mockReviewsSelect = jest.fn().mockReturnValue(mockReviewsQuery);

      (supabase.from as jest.Mock)
        .mockReturnValueOnce({
          select: mockSelect,
        })
        .mockReturnValueOnce({
          select: mockReviewsSelect,
        });

      // Act
      const result = await restaurantService.getRestaurantById({
        restaurantId: '1',
      });

      // Assert
      expect(result?.restaurant_hours?.[0].day_of_week).toBe(1);
      expect(result?.restaurant_hours?.[1].day_of_week).toBe(3);
      expect(result?.restaurant_hours?.[2].day_of_week).toBe(5);
    });
  });

  describe('getCategories', () => {
    const mockCategories = [
      {
        id: 'cat-1',
        name: 'Pizzeria',
        slug: 'pizzeria',
        icon_url: '/icons/pizza.png',
        display_order: 0,
        created_at: new Date().toISOString(),
      },
      {
        id: 'cat-2',
        name: 'Burger',
        slug: 'burger',
        icon_url: '/icons/burger.png',
        display_order: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: 'cat-3',
        name: 'Sushi',
        slug: 'sushi',
        icon_url: '/icons/sushi.png',
        display_order: 2,
        created_at: new Date().toISOString(),
      },
    ];

    it('should fetch all categories sorted by display_order', async () => {
      // Mock
      const mockQuery = {
        order: jest.fn().mockResolvedValue({
          data: mockCategories,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getCategories();

      // Assert
      expect(supabase.from).toHaveBeenCalledWith('restaurant_categories');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockQuery.order).toHaveBeenCalledWith('display_order', { ascending: true });
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Pizzeria');
      expect(result[1].name).toBe('Burger');
      expect(result[2].name).toBe('Sushi');
    });

    it('should return empty array when no categories found', async () => {
      const mockQuery = {
        order: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getCategories();

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when data is null', async () => {
      const mockQuery = {
        order: jest.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act
      const result = await restaurantService.getCategories();

      // Assert
      expect(result).toEqual([]);
    });

    it('should throw error when database query fails', async () => {
      const mockQuery = {
        order: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database connection failed' },
        }),
      };

      const mockSelect = jest.fn().mockReturnValue(mockQuery);
      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      // Act & Assert
      await expect(restaurantService.getCategories()).rejects.toThrow(
        'Erreur lors de la récupération des catégories: Database connection failed'
      );
    });
  });
});
