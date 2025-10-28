/**
 * Service pour gérer l'historique de recherche
 * Utilise AsyncStorage pour la persistance locale
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SearchHistoryItem } from '@/types';

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY = '@dadz_search_history';

class SearchHistoryService {
  /**
   * Ajouter une recherche à l'historique
   * Évite les doublons et limite à MAX_HISTORY_ITEMS
   *
   * @param query - Le texte recherché
   * @param resultCount - Nombre de résultats trouvés
   */
  async addSearch(query: string, resultCount: number): Promise<void> {
    try {
      const trimmedQuery = query.trim();

      // Ne pas sauvegarder les recherches vides ou trop courtes
      if (trimmedQuery.length < 2) {
        return;
      }

      const history = await this.getHistory();

      const newItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query: trimmedQuery,
        timestamp: Date.now(),
        resultCount,
      };

      // Éviter les doublons (supprimer l'ancienne occurrence)
      const filtered = history.filter(
        h => h.query.toLowerCase() !== newItem.query.toLowerCase()
      );

      // Ajouter en premier et limiter la taille
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error adding search to history:', error);
    }
  }

  /**
   * Récupérer l'historique de recherche
   * Trié par date (plus récent en premier)
   *
   * @returns Liste des recherches récentes
   */
  async getHistory(): Promise<SearchHistoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        return [];
      }

      const history: SearchHistoryItem[] = JSON.parse(data);

      // Valider la structure et trier par date
      return history
        .filter(item => item && item.query && item.timestamp)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }

  /**
   * Supprimer un élément de l'historique
   *
   * @param id - ID de l'élément à supprimer
   */
  async removeItem(id: string): Promise<void> {
    try {
      const history = await this.getHistory();
      const updated = history.filter(item => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing item from history:', error);
    }
  }

  /**
   * Vider tout l'historique de recherche
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }

  /**
   * Obtenir les N recherches les plus récentes
   *
   * @param limit - Nombre maximum de résultats
   * @returns Liste des recherches récentes
   */
  async getRecent(limit: number = 5): Promise<SearchHistoryItem[]> {
    const history = await this.getHistory();
    return history.slice(0, limit);
  }
}

export const searchHistoryService = new SearchHistoryService();
