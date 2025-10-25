/**
 * Service de géocodage utilisant Nominatim (OpenStreetMap)
 * Gratuit, sans clé API nécessaire
 * Limite : 1 requête par seconde
 */

export interface GeocodingResult {
  latitude: number;
  longitude: number;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

/**
 * Service de géocodage pour convertir une adresse texte en coordonnées GPS
 */
export const geocodingService = {
  /**
   * Géocoder une adresse complète
   * @param street - Rue (ex: "14 Chemin du Marcreux")
   * @param city - Ville (ex: "Aubervilliers")
   * @param postalCode - Code postal (ex: "93300")
   * @param country - Pays (ex: "France")
   * @returns Les coordonnées GPS ou null si échec
   */
  geocodeAddress: async (
    street: string,
    city: string,
    postalCode: string,
    country: string = 'France'
  ): Promise<GeocodingResult | null> => {
    try {
      // Construire la requête d'adresse
      const addressQuery = `${street}, ${postalCode} ${city}, ${country}`;

      // Encoder pour URL
      const encodedAddress = encodeURIComponent(addressQuery);

      // Appeler l'API Nominatim d'OpenStreetMap
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'DadzFoodDeliveryApp/1.0', // Nominatim requiert un User-Agent
          },
        }
      );

      if (!response.ok) {
        console.error('Geocoding API error:', response.status);
        return null;
      }

      const data: NominatimResponse[] = await response.json();

      // Vérifier si on a des résultats
      if (!data || data.length === 0) {
        console.warn('No geocoding results found for:', addressQuery);
        return null;
      }

      const result = data[0];

      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  },

  /**
   * Géocoder uniquement avec ville et code postal (moins précis)
   * Utile en fallback si le géocodage complet échoue
   */
  geocodeCityOnly: async (
    city: string,
    postalCode: string,
    country: string = 'France'
  ): Promise<GeocodingResult | null> => {
    try {
      const addressQuery = `${postalCode} ${city}, ${country}`;
      const encodedAddress = encodeURIComponent(addressQuery);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'DadzFoodDeliveryApp/1.0',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data: NominatimResponse[] = await response.json();

      if (!data || data.length === 0) {
        return null;
      }

      const result = data[0];

      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } catch (error) {
      console.error('Geocoding (city only) error:', error);
      return null;
    }
  },
};
