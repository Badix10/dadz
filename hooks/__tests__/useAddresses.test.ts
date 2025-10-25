/**
 * Exemple de test pour le hook useAddresses
 * Ce fichier montre comment tester un hook React utilisant Zustand
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useAddresses } from '../useAddresses';
import { useAddressStore } from '@/lib/store/addressStore';

// Mock du store Zustand
jest.mock('@/lib/store/addressStore');

describe('useAddresses Hook', () => {
  beforeEach(() => {
    // Reset les mocks avant chaque test
    jest.clearAllMocks();
  });

  it('should return addresses from store', () => {
    // Arrange - Préparer les données mockées
    const mockAddresses = [
      {
        id: '1',
        profile_id: 'user-1',
        street: '123 Rue Test',
        city: 'Paris',
        postal_code: '75001',
        country: 'France',
        address_type: 'home',
        is_default: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Mock le comportement du store
    (useAddressStore as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        addresses: mockAddresses,
        currentAddress: mockAddresses[0],
        getDefaultAddress: () => mockAddresses[0],
        getAddressCount: () => 1,
        canAddAddress: () => true,
      };
      return selector ? selector(state) : state;
    });

    // Act - Exécuter le hook
    const { result } = renderHook(() => useAddresses());

    // Assert - Vérifier les résultats
    expect(result.current.currentAddress).toEqual(mockAddresses[0]);
    expect(result.current.defaultAddress).toEqual(mockAddresses[0]);
    expect(result.current.addressCount).toBe(1);
    expect(result.current.canAddAddress).toBe(true);
  });

  it('should handle empty address list', () => {
    // Mock un store vide
    (useAddressStore as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        addresses: [],
        currentAddress: null,
        getDefaultAddress: () => null,
        getAddressCount: () => 0,
        canAddAddress: () => true,
      };
      return selector ? selector(state) : state;
    });

    const { result } = renderHook(() => useAddresses());

    expect(result.current.currentAddress).toBeNull();
    expect(result.current.defaultAddress).toBeNull();
    expect(result.current.addressCount).toBe(0);
  });

  it('should return temporary address when set', () => {
    const mockTempAddress = {
      id: 'temp-123',
      profile_id: '',
      street: '456 Rue Temporaire',
      city: 'Lyon',
      postal_code: '69001',
      country: 'France',
      address_type: 'other',
      is_default: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    (useAddressStore as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        addresses: [],
        currentAddress: mockTempAddress,
        temporaryAddress: mockTempAddress,
        getDefaultAddress: () => null,
        getAddressCount: () => 0,
        canAddAddress: () => true,
      };
      return selector ? selector(state) : state;
    });

    const { result } = renderHook(() => useAddresses());

    expect(result.current.currentAddress).toEqual(mockTempAddress);
    expect(result.current.currentAddress?.id).toContain('temp-');
  });
});
