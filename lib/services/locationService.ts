import * as Location from 'expo-location';

/**
 * Interface pour une adresse parsée depuis la géolocalisation
 */
export interface ParsedAddress {
  street: string;
  city: string;
  postal_code: string;
  country: string;
}

/**
 * Service pour gérer la géolocalisation avec expo-location
 * Utilisation gratuite (pas de Google Places API)
 */
export const locationService = {
  /**
   * Demander la permission de localisation à l'utilisateur
   * @returns true si la permission est accordée, false sinon
   */
  requestPermission: async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  },

  /**
   * Vérifier si la permission de localisation est déjà accordée
   */
  checkPermission: async (): Promise<boolean> => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  },

  /**
   * Récupérer l'adresse actuelle de l'utilisateur via géolocalisation
   * Utilise le reverse geocoding d'expo-location (gratuit)
   *
   * @throws Error si la permission est refusée
   * @throws Error si la géolocalisation échoue
   * @throws Error si aucune adresse n'est trouvée
   */
  getCurrentAddress: async (): Promise<ParsedAddress> => {
    // Vérifier et demander la permission
    const hasPermission = await locationService.requestPermission();
    if (!hasPermission) {
      throw new Error('PERMISSION_DENIED');
    }

    try {
      // Obtenir les coordonnées GPS actuelles avec haute précision
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Reverse geocoding: coordonnées → adresse
      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (!addresses || addresses.length === 0) {
        throw new Error('NO_ADDRESS_FOUND');
      }

      // Parser le premier résultat
      const addr = addresses[0];

      // Construire l'adresse complète
      const street = [
        addr.streetNumber,
        addr.street,
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

      return {
        street: street || addr.name || '',
        city: addr.city || addr.subregion || '',
        postal_code: addr.postalCode || '',
        country: addr.country || 'France',
      };
    } catch (error) {
      if (error instanceof Error) {
        // Propager les erreurs personnalisées
        if (error.message === 'PERMISSION_DENIED' || error.message === 'NO_ADDRESS_FOUND') {
          throw error;
        }
      }

      // Erreur de géolocalisation
      console.error('Error getting current location:', error);
      throw new Error('LOCATION_ERROR');
    }
  },

  /**
   * Récupérer uniquement les coordonnées GPS sans reverse geocoding
   */
  getCurrentCoordinates: async (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    const hasPermission = await locationService.requestPermission();
    if (!hasPermission) {
      throw new Error('PERMISSION_DENIED');
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current coordinates:', error);
      throw new Error('LOCATION_ERROR');
    }
  },
};
