import { supabase } from '@/lib/supabase';
import type { Tables, TablesInsert, TablesUpdate } from '@/supabase/types/database.types';

export type Address = Tables<'addresses'>;
export type AddressInsert = TablesInsert<'addresses'>;
export type AddressUpdate = TablesUpdate<'addresses'>;

/**
 * Service pour gérer les opérations CRUD sur les adresses
 * Toutes les requêtes Supabase sont isolées ici
 */
export const addressService = {
  /**
   * Récupérer toutes les adresses d'un utilisateur
   * Triées par date de création (plus récentes en premier)
   */
  getAddresses: async (profileId: string): Promise<Address[]> => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Récupérer une adresse par son ID
   */
  getAddressById: async (id: string): Promise<Address> => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Créer une nouvelle adresse
   */
  createAddress: async (address: AddressInsert): Promise<Address> => {
    const { data, error } = await supabase
      .from('addresses')
      .insert({
        ...address,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour une adresse existante
   */
  updateAddress: async (id: string, updates: AddressUpdate): Promise<Address> => {
    const { data, error } = await supabase
      .from('addresses')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Supprimer une adresse
   */
  deleteAddress: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Retirer le flag "default" de toutes les adresses d'un utilisateur
   * Optionnellement, on peut exclure une adresse spécifique
   */
  removeDefaultFromOthers: async (
    profileId: string,
    exceptId?: string
  ): Promise<void> => {
    let query = supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('profile_id', profileId);

    if (exceptId) {
      query = query.neq('id', exceptId);
    }

    const { error } = await query;
    if (error) throw error;
  },

  /**
   * Définir une adresse comme adresse par défaut
   * Retire automatiquement le flag des autres adresses
   */
  setAsDefault: async (id: string, profileId: string): Promise<Address> => {
    // D'abord, retirer le flag default des autres
    await addressService.removeDefaultFromOthers(profileId, id);

    // Ensuite, définir cette adresse comme default
    return await addressService.updateAddress(id, { is_default: true });
  },

  /**
   * Compter le nombre d'adresses d'un utilisateur
   */
  countAddresses: async (profileId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('addresses')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Récupérer l'adresse par défaut d'un utilisateur
   */
  getDefaultAddress: async (profileId: string): Promise<Address | null> => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('profile_id', profileId)
      .eq('is_default', true)
      .single();

    if (error) {
      // Si aucune adresse par défaut n'existe, retourner null
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },
};
