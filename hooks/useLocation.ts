import { useState } from 'react';
import { locationService, type ParsedAddress } from '@/lib/services/locationService';

/**
 * Hook personnalisé pour gérer la géolocalisation
 * Utilise expo-location via locationService
 */
export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  /**
   * Vérifier si la permission de localisation est accordée
   */
  const checkPermission = async (): Promise<boolean> => {
    try {
      const granted = await locationService.checkPermission();
      setHasPermission(granted);
      return granted;
    } catch (err) {
      setError('PERMISSION_CHECK_ERROR');
      return false;
    }
  };

  /**
   * Demander la permission de localisation
   */
  const requestPermission = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await locationService.requestPermission();
      setHasPermission(granted);
      setLoading(false);

      if (!granted) {
        setError('PERMISSION_DENIED');
      }

      return granted;
    } catch (err) {
      setError('PERMISSION_REQUEST_ERROR');
      setLoading(false);
      return false;
    }
  };

  /**
   * Récupérer l'adresse actuelle via géolocalisation
   * @returns L'adresse parsée ou null si erreur
   */
  const getCurrentAddress = async (): Promise<ParsedAddress | null> => {
    setLoading(true);
    setError(null);

    try {
      const address = await locationService.getCurrentAddress();
      setLoading(false);
      return address;
    } catch (err) {
      setLoading(false);

      if (err instanceof Error) {
        // Gérer les erreurs spécifiques
        switch (err.message) {
          case 'PERMISSION_DENIED':
            setError('PERMISSION_DENIED');
            setHasPermission(false);
            break;
          case 'NO_ADDRESS_FOUND':
            setError('NO_ADDRESS_FOUND');
            break;
          case 'LOCATION_ERROR':
            setError('LOCATION_ERROR');
            break;
          default:
            setError('UNKNOWN_ERROR');
        }
      } else {
        setError('UNKNOWN_ERROR');
      }

      return null;
    }
  };

  /**
   * Récupérer uniquement les coordonnées GPS
   */
  const getCurrentCoordinates = async (): Promise<{
    latitude: number;
    longitude: number;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const coords = await locationService.getCurrentCoordinates();
      setLoading(false);
      return coords;
    } catch (err) {
      setLoading(false);

      if (err instanceof Error) {
        setError(err.message);
        if (err.message === 'PERMISSION_DENIED') {
          setHasPermission(false);
        }
      } else {
        setError('UNKNOWN_ERROR');
      }

      return null;
    }
  };

  /**
   * Effacer l'erreur
   */
  const clearError = () => {
    setError(null);
  };

  return {
    // État
    loading,
    error,
    hasPermission,

    // Actions
    checkPermission,
    requestPermission,
    getCurrentAddress,
    getCurrentCoordinates,
    clearError,
  };
};
