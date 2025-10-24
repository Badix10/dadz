import { useEffect, useRef } from 'react';
import { useAddressStore } from '@/lib/store/addressStore';
import { useAuth } from '@/hooks/useAuth';
import type { AddressInsert, AddressUpdate } from '@/lib/services/addressService';

/**
 * Hook personnalisé pour gérer les adresses
 * Consomme le store Zustand et fournit une API simple
 *
 * @param autoFetch Si true, récupère automatiquement les adresses au montage (défaut: true)
 */
export const useAddresses = (autoFetch: boolean = true) => {
  const { user } = useAuth();
  const hasFetchedRef = useRef(false);

  // Sélecteurs du store Zustand
  const addresses = useAddressStore((state) => state.addresses);
  const selectedAddress = useAddressStore((state) => state.selectedAddress);
  const loading = useAddressStore((state) => state.loading);
  const error = useAddressStore((state) => state.error);

  // Actions du store
  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);
  const createAddress = useAddressStore((state) => state.createAddress);
  const updateAddress = useAddressStore((state) => state.updateAddress);
  const deleteAddress = useAddressStore((state) => state.deleteAddress);
  const setAsDefault = useAddressStore((state) => state.setAsDefault);
  const selectAddress = useAddressStore((state) => state.selectAddress);
  const clearError = useAddressStore((state) => state.clearError);
  const reset = useAddressStore((state) => state.reset);

  // Getters
  const getDefaultAddress = useAddressStore((state) => state.getDefaultAddress);
  const canAddAddress = useAddressStore((state) => state.canAddAddress);
  const getAddressCount = useAddressStore((state) => state.getAddressCount);

  /**
   * Récupérer automatiquement les adresses au montage
   * Utilise un ref pour éviter les re-fetch inutiles
   */
  useEffect(() => {
    if (autoFetch && user?.id && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchAddresses(user.id);
    }
  }, [autoFetch, user?.id, fetchAddresses]);

  /**
   * Rafraîchir les adresses
   */
  const refresh = async () => {
    if (user?.id) {
      await fetchAddresses(user.id);
    }
  };

  /**
   * Créer une nouvelle adresse
   * Ajoute automatiquement le profile_id
   */
  const create = async (addressData: Omit<AddressInsert, 'profile_id'>) => {
    if (!user?.id) {
      throw new Error('USER_NOT_AUTHENTICATED');
    }

    return await createAddress({
      ...addressData,
      profile_id: user.id,
    });
  };

  /**
   * Mettre à jour une adresse
   */
  const update = async (id: string, updates: AddressUpdate) => {
    return await updateAddress(id, updates);
  };

  /**
   * Supprimer une adresse
   */
  const remove = async (id: string) => {
    return await deleteAddress(id);
  };

  /**
   * Définir une adresse comme par défaut
   */
  const setDefault = async (id: string) => {
    return await setAsDefault(id);
  };

  return {
    // État
    addresses,
    selectedAddress,
    loading,
    error,

    // Actions
    fetchAddresses: refresh,
    createAddress: create,
    updateAddress: update,
    deleteAddress: remove,
    setAsDefault: setDefault,
    selectAddress,
    clearError,
    reset,

    // Getters
    defaultAddress: getDefaultAddress(),
    canAddAddress: canAddAddress(),
    addressCount: getAddressCount(),

    // Helper
    isAuthenticated: !!user,
  };
};
