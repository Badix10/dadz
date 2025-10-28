/**
 * Hook pour gérer l'historique de recherche
 * Utilise searchHistoryService avec React state
 */

import { useState, useEffect, useCallback } from 'react';
import { searchHistoryService } from '@/lib/services/searchHistoryService';
import type { SearchHistoryItem } from '@/types';

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Charger l'historique au montage du hook
   */
  useEffect(() => {
    loadHistory();
  }, []);

  /**
   * Charger l'historique depuis AsyncStorage
   */
  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await searchHistoryService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error loading search history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Ajouter une recherche à l'historique
   *
   * @param query - Le texte recherché
   * @param resultCount - Nombre de résultats trouvés
   */
  const addToHistory = useCallback(async (query: string, resultCount: number) => {
    try {
      await searchHistoryService.addSearch(query, resultCount);
      // Recharger pour obtenir l'état à jour
      await loadHistory();
    } catch (error) {
      console.error('Error adding to search history:', error);
    }
  }, [loadHistory]);

  /**
   * Supprimer un élément de l'historique
   *
   * @param id - ID de l'élément à supprimer
   */
  const removeFromHistory = useCallback(async (id: string) => {
    try {
      await searchHistoryService.removeItem(id);
      // Mettre à jour l'état local immédiatement pour une meilleure UX
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing from search history:', error);
    }
  }, []);

  /**
   * Vider tout l'historique
   */
  const clearHistory = useCallback(async () => {
    try {
      await searchHistoryService.clearAll();
      setHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }, []);

  /**
   * Obtenir les N recherches les plus récentes
   *
   * @param limit - Nombre maximum de résultats
   */
  const getRecent = useCallback((limit: number = 5): SearchHistoryItem[] => {
    return history.slice(0, limit);
  }, [history]);

  return {
    history,
    isLoading,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecent,
    refresh: loadHistory,
  };
}
