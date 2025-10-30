/**
 * Tests pour les hooks useRestaurants
 * Ce fichier montre comment tester des hooks utilisant @tanstack/react-query
 */

import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRestaurants, useRestaurantById, useRestaurantCategories } from '../useRestaurants';
import { restaurantService } from '@/lib/services/restaurantService';
import React from 'react';

// Mock du restaurantService
jest.mock('@/lib/services/restaurantService', () => ({
  restaurantService: {
    getRestaurants: jest.fn(),
    getRestaurantById: jest.fn(),
    getCategories: jest.fn(),
  },
}));

// Créer un wrapper pour React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Désactiver retry pour les tests
        gcTime: 0, // Désactiver garbage collection pour les tests
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useRestaurants Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Nettoyer tous les timers pour éviter les resource leaks
    jest.clearAllTimers();
  });

  it('should be disabled when no coordinates provided', () => {
    const { result } = renderHook(
      () => useRestaurants({}),
      { wrapper: createWrapper() }
    );

    // La query doit être désactivée car pas de coordonnées
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(restaurantService.getRestaurants).not.toHaveBeenCalled();
  });

  it('should call getRestaurants when coordinates are provided', async () => {
    const mockRestaurants = [
      { id: '1', name: 'Restaurant 1', distance: 2.5 },
      { id: '2', name: 'Restaurant 2', distance: 5.0 },
    ];

    (restaurantService.getRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);

    const params = {
      latitude: 48.8566,
      longitude: 2.3522,
    };

    const { result, waitForNextUpdate } = renderHook(
      () => useRestaurants(params),
      { wrapper: createWrapper() }
    );

    // La query doit être activée
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitForNextUpdate();

    // After completion, loading should be false and data should be present
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockRestaurants);
    expect(restaurantService.getRestaurants).toHaveBeenCalledWith(params);
  });

  it('should update when params change', async () => {
    const mockRestaurants1 = [{ id: '1', name: 'Restaurant 1' }];
    const mockRestaurants2 = [{ id: '2', name: 'Restaurant 2' }];

    (restaurantService.getRestaurants as jest.Mock)
      .mockResolvedValueOnce(mockRestaurants1)
      .mockResolvedValueOnce(mockRestaurants2);

    const initialParams = {
      latitude: 48.8566,
      longitude: 2.3522,
    };

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ params }) => useRestaurants(params),
      {
        wrapper: createWrapper(),
        initialProps: { params: initialParams },
      }
    );

    // Attendre que la query initiale se termine
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockRestaurants1);

    // Changer les paramètres
    const newParams = {
      latitude: 48.8698,
      longitude: 2.3076,
      categoryId: 'pizza',
    };

    rerender({ params: newParams });

    // La query devrait se relancer avec les nouveaux params
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockRestaurants2);
    expect(restaurantService.getRestaurants).toHaveBeenCalledWith(newParams);
  });
});

describe('useRestaurantById Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be disabled when no id provided', () => {
    const { result } = renderHook(
      () => useRestaurantById({ restaurantId: '' }),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(restaurantService.getRestaurantById).not.toHaveBeenCalled();
  });

  it('should call getRestaurantById when id is provided', async () => {
    const mockRestaurant = {
      id: '1',
      name: 'Pizza Roma',
      slug: 'pizza-roma',
      dish_categories: [],
      restaurant_hours: [],
      restaurant_reviews: [],
    };

    (restaurantService.getRestaurantById as jest.Mock).mockResolvedValue(mockRestaurant);

    const { result, waitForNextUpdate } = renderHook(
      () => useRestaurantById({ restaurantId: '1' }),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockRestaurant);
    expect(restaurantService.getRestaurantById).toHaveBeenCalledWith({
      restaurantId: '1',
    });
  });

  it('should support params with coordinates', async () => {
    const mockRestaurant = {
      id: '1',
      name: 'Pizza Roma',
      distance: 2.5,
    };

    (restaurantService.getRestaurantById as jest.Mock).mockResolvedValue(mockRestaurant);

    const { result, waitForNextUpdate } = renderHook(
      () => useRestaurantById({
        restaurantId: '1',
        latitude: 48.8566,
        longitude: 2.3522,
        includeReviews: false,
      }),
      { wrapper: createWrapper() }
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockRestaurant);
    expect(restaurantService.getRestaurantById).toHaveBeenCalledWith({
      restaurantId: '1',
      latitude: 48.8566,
      longitude: 2.3522,
      includeReviews: false,
    });
  });
});

describe('useRestaurantCategories Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should call getCategories', async () => {
    const mockCategories = [
      { id: '1', name: 'Pizza', slug: 'pizza' },
      { id: '2', name: 'Burger', slug: 'burger' },
    ];

    (restaurantService.getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const { result, waitForNextUpdate } = renderHook(
      () => useRestaurantCategories(),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockCategories);
    expect(restaurantService.getCategories).toHaveBeenCalled();
  });
});
