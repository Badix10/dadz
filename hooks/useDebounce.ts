/**
 * Hook pour debouncer une valeur
 * Utilisé principalement pour les champs de recherche
 *
 * @param value - La valeur à debouncer
 * @param delay - Le délai en millisecondes (défaut: 400ms)
 * @returns La valeur debouncée
 *
 * @example
 * const [searchText, setSearchText] = useState('');
 * const debouncedSearch = useDebounce(searchText, 400);
 *
 * useEffect(() => {
 *   // Cette fonction ne s'exécutera que 400ms après la dernière frappe
 *   if (debouncedSearch) {
 *     performSearch(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Créer un timer qui met à jour la valeur après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timeout si value change avant la fin du délai
    // Cela "annule" le timeout précédent
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
