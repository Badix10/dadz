/**
 * Exemple de test unitaire pour un service
 * Ce fichier montre comment tester une fonction pure
 */

describe('Example Service Tests', () => {
  describe('calculateDeliveryFee', () => {
    // Test simple
    it('should calculate delivery fee correctly', () => {
      const baseFee = 2.5;
      const perKmFee = 0.5;
      const distance = 5;

      const result = baseFee + (distance * perKmFee);

      expect(result).toBe(5.0);
    });

    // Test avec edge case
    it('should return base fee when distance is 0', () => {
      const baseFee = 2.5;
      const perKmFee = 0.5;
      const distance = 0;

      const result = baseFee + (distance * perKmFee);

      expect(result).toBe(2.5);
    });

    // Test avec nombres décimaux
    it('should handle decimal distances', () => {
      const baseFee = 2.5;
      const perKmFee = 0.5;
      const distance = 3.7;

      const result = baseFee + (distance * perKmFee);

      expect(result).toBeCloseTo(4.35, 2);
    });
  });

  describe('filterRestaurantsByDistance', () => {
    const mockRestaurants = [
      { id: '1', name: 'Pizza Roma', distance: 3 },
      { id: '2', name: 'Burger King', distance: 8 },
      { id: '3', name: 'Sushi Tokyo', distance: 12 },
    ];

    it('should filter restaurants within max distance', () => {
      const maxDistance = 10;

      const result = mockRestaurants.filter(r => r.distance <= maxDistance);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Pizza Roma');
      expect(result[1].name).toBe('Burger King');
    });

    it('should return empty array when no restaurants match', () => {
      const maxDistance = 2;

      const result = mockRestaurants.filter(r => r.distance <= maxDistance);

      expect(result).toHaveLength(0);
    });

    it('should return all restaurants when max distance is high', () => {
      const maxDistance = 100;

      const result = mockRestaurants.filter(r => r.distance <= maxDistance);

      expect(result).toHaveLength(3);
    });
  });
});
