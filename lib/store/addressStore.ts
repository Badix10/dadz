import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addressService,
  type Address,
  type AddressInsert,
  type AddressUpdate,
} from '@/lib/services/addressService';
import { getDefaultAddress, canAddAddress, MAX_ADDRESSES } from '@/lib/utils/addressHelpers';

/**
 * État global du store Zustand pour les adresses
 */
interface AddressState {
  // État
  addresses: Address[];
  selectedAddress: Address | null;
  currentAddress: Address | null; // Adresse courante pour les commandes (Persisted)
  temporaryAddress: Address | null; // Adresse temporaire (GPS, non sauvegardée)
  loading: boolean;
  error: string | null;

  // Actions
  fetchAddresses: (userId: string) => Promise<void>;
  createAddress: (address: AddressInsert) => Promise<Address>;
  updateAddress: (id: string, updates: AddressUpdate) => Promise<Address>;
  deleteAddress: (id: string) => Promise<void>;
  setAsDefault: (id: string) => Promise<void>;
  selectAddress: (address: Address | null) => void;
  setCurrentAddress: (address: Address | null) => void;
  setTemporaryAddress: (address: Address | null) => void;
  clearError: () => void;
  reset: () => void;

  // Getters
  getDefaultAddress: () => Address | null;
  getCurrentAddress: () => Address | null;
  canAddAddress: () => boolean;
  getAddressCount: () => number;
}

/**
 * État initial du store
 */
const initialState = {
  addresses: [],
  selectedAddress: null,
  currentAddress: null,
  temporaryAddress: null,
  loading: false,
  error: null,
};

/**
 * Store Zustand pour gérer l'état global des adresses
 * Avec persistance de currentAddress dans AsyncStorage
 */
export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      ...initialState,

  /**
   * Récupérer toutes les adresses d'un utilisateur
   */
  fetchAddresses: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const addresses = await addressService.getAddresses(userId);
      set({ addresses, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'FETCH_ERROR',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Créer une nouvelle adresse
   * Vérifie la limite de 3 adresses
   * Si is_default=true, retire le flag des autres
   */
  createAddress: async (address: AddressInsert) => {
    const state = get();

    // Vérifier la limite de 3 adresses
    if (state.addresses.length >= MAX_ADDRESSES) {
      const error = new Error('MAX_ADDRESSES_REACHED');
      set({ error: error.message });
      throw error;
    }

    set({ loading: true, error: null });
    try {
      // Si cette adresse doit être par défaut, retirer le flag des autres
      if (address.is_default) {
        await addressService.removeDefaultFromOthers(address.profile_id);
      }

      // Créer l'adresse
      const newAddress = await addressService.createAddress(address);

      // Mettre à jour l'état local (optimistic update)
      set((state) => ({
        addresses: [...state.addresses, newAddress],
        loading: false,
      }));

      return newAddress;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'CREATE_ERROR',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Mettre à jour une adresse existante
   */
  updateAddress: async (id: string, updates: AddressUpdate) => {
    set({ loading: true, error: null });
    try {
      // Si on change is_default à true, retirer le flag des autres
      if (updates.is_default) {
        const address = get().addresses.find((a) => a.id === id);
        if (address) {
          await addressService.removeDefaultFromOthers(address.profile_id, id);
        }
      }

      // Mettre à jour l'adresse
      const updatedAddress = await addressService.updateAddress(id, updates);

      // Mettre à jour l'état local
      set((state) => ({
        addresses: state.addresses.map((addr) =>
          addr.id === id ? updatedAddress : addr
        ),
        loading: false,
      }));

      return updatedAddress;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'UPDATE_ERROR',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Supprimer une adresse
   * Si c'était l'adresse par défaut et qu'il reste des adresses,
   * définir la première comme par défaut
   */
  deleteAddress: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const addressToDelete = state.addresses.find((a) => a.id === id);

      if (!addressToDelete) {
        throw new Error('ADDRESS_NOT_FOUND');
      }

      // Supprimer l'adresse
      await addressService.deleteAddress(id);

      // Filtrer les adresses restantes
      const remainingAddresses = state.addresses.filter((a) => a.id !== id);

      // Si c'était la par défaut et qu'il reste des adresses
      if (addressToDelete.is_default && remainingAddresses.length > 0) {
        // Définir la première adresse restante comme par défaut
        await addressService.setAsDefault(
          remainingAddresses[0].id,
          addressToDelete.profile_id
        );

        // Mettre à jour l'état local
        remainingAddresses[0].is_default = true;
      }

      // Mettre à jour l'état
      set({
        addresses: remainingAddresses,
        loading: false,
        selectedAddress:
          state.selectedAddress?.id === id ? null : state.selectedAddress,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'DELETE_ERROR',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Définir une adresse comme adresse par défaut
   * Retire automatiquement le flag des autres
   */
  setAsDefault: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const address = state.addresses.find((a) => a.id === id);

      if (!address) {
        throw new Error('ADDRESS_NOT_FOUND');
      }

      // Définir comme par défaut (le service retire le flag des autres)
      await addressService.setAsDefault(id, address.profile_id);

      // Mettre à jour l'état local
      set((state) => ({
        addresses: state.addresses.map((addr) => ({
          ...addr,
          is_default: addr.id === id,
        })),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'SET_DEFAULT_ERROR',
        loading: false,
      });
      throw error;
    }
  },

  /**
   * Sélectionner une adresse (pour édition par exemple)
   */
  selectAddress: (address: Address | null) => {
    set({ selectedAddress: address });
  },

  /**
   * Définir l'adresse courante pour les commandes
   * Cette valeur est persistée dans AsyncStorage
   */
  setCurrentAddress: (address: Address | null) => {
    set({ currentAddress: address, temporaryAddress: null });
  },

  /**
   * Définir une adresse temporaire (GPS, non sauvegardée)
   * Prioritaire sur currentAddress, non persistée
   */
  setTemporaryAddress: (address: Address | null) => {
    set({ temporaryAddress: address });
  },

  /**
   * Effacer l'erreur actuelle
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Réinitialiser le store à l'état initial
   */
  reset: () => {
    set(initialState);
  },

  /**
   * GETTER: Obtenir l'adresse par défaut
   */
  getDefaultAddress: () => {
    return getDefaultAddress(get().addresses);
  },

  /**
   * GETTER: Obtenir l'adresse courante pour les commandes
   * Priorité: temporaryAddress > currentAddress > defaultAddress
   */
  getCurrentAddress: () => {
    const state = get();

    // 1. Priorité à l'adresse temporaire (GPS)
    if (state.temporaryAddress) {
      return state.temporaryAddress;
    }

    // 2. Si une adresse courante est définie, la retourner
    if (state.currentAddress) {
      // Vérifier que cette adresse existe toujours dans la liste
      const exists = state.addresses.find(
        (addr) => addr.id === state.currentAddress?.id
      );
      if (exists) return state.currentAddress;
    }

    // 3. Sinon retourner l'adresse par défaut
    return getDefaultAddress(state.addresses);
  },

  /**
   * GETTER: Vérifier si on peut ajouter une adresse
   */
  canAddAddress: () => {
    return canAddAddress(get().addresses.length);
  },

  /**
   * GETTER: Obtenir le nombre d'adresses
   */
  getAddressCount: () => {
    return get().addresses.length;
  },
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persister uniquement currentAddress
      partialize: (state) => ({
        currentAddress: state.currentAddress,
      }),
    }
  )
);
