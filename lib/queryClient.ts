import { QueryClient } from '@tanstack/react-query';

/**
 * Configuration du QueryClient pour React Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache les données pendant 5 minutes
      staleTime: 5 * 60 * 1000,

      // Garde les données en cache pendant 10 minutes
      gcTime: 10 * 60 * 1000,

      // Retry une seule fois en cas d'erreur
      retry: 1,

      // Ne pas refetch automatiquement au focus de la fenêtre
      refetchOnWindowFocus: false,

      // Ne pas refetch automatiquement à la reconnexion
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry une fois pour les mutations en cas d'erreur
      retry: 1,
    },
  },
});
