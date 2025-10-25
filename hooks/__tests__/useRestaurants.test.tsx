/**
 * Exemple de test pour le hook useRestaurants avec React Query
 * Ce fichier montre comment tester un hook utilisant @tanstack/react-query
 */

import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRestaurants } from '../useRestaurants';
import React from 'react';

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

describe('useRestaurants Hook with React Query', () => {
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
  });

  it('should be enabled when coordinates are provided', async () => {
    const params = {
      latitude: 48.8566,
      longitude: 2.3522,
    };

    const { result, waitForNextUpdate } = renderHook(
      () => useRestaurants(params),
      { wrapper: createWrapper() }
    );

    // La query doit être activée
    // Initial state should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete (it will fail since we haven't mocked the service)
    await waitForNextUpdate();

    // After completion, loading should be false
    expect(result.current.isLoading).toBe(false);
  });

  it('should update when params change', async () => {
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
  });
});

describe('useRestaurant Hook (single restaurant)', () => {
  it('should be disabled when no id provided', () => {
    const { result } = renderHook(
      () => useRestaurants(undefined),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should be enabled when id is provided', async () => {
    // TODO: Mock restaurantService.getRestaurantById
    // Pour l'instant, ceci montre la structure du test
  });
});
