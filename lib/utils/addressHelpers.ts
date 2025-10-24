import type { Address } from '@/lib/services/addressService';

/**
 * Constante: Nombre maximum d'adresses par utilisateur
 */
export const MAX_ADDRESSES = 3;

/**
 * Types d'adresse disponibles
 */
export const ADDRESS_TYPES = ['home', 'work', 'other'] as const;
export type AddressType = (typeof ADDRESS_TYPES)[number];

/**
 * Vérifier si un utilisateur peut ajouter une nouvelle adresse
 * @param currentCount Nombre actuel d'adresses
 * @returns true si l'utilisateur peut ajouter une adresse, false sinon
 */
export const canAddAddress = (currentCount: number): boolean => {
  return currentCount < MAX_ADDRESSES;
};

/**
 * Formater une adresse en une seule ligne
 * @param address L'adresse à formater
 * @returns L'adresse formatée en une ligne
 */
export const formatAddressOneLine = (address: Address): string => {
  return `${address.street}, ${address.postal_code} ${address.city}, ${address.country}`;
};

/**
 * Formater une adresse en plusieurs lignes
 * @param address L'adresse à formater
 * @returns L'adresse formatée en plusieurs lignes
 */
export const formatAddressMultiLine = (address: Address): string[] => {
  return [
    address.street,
    `${address.postal_code} ${address.city}`,
    address.country,
  ];
};

/**
 * Obtenir l'adresse par défaut d'une liste d'adresses
 * @param addresses Liste d'adresses
 * @returns L'adresse par défaut ou null si aucune
 */
export const getDefaultAddress = (addresses: Address[]): Address | null => {
  return addresses.find((addr) => addr.is_default) || null;
};

/**
 * Trier les adresses: par défaut en premier, puis par date de création
 * @param addresses Liste d'adresses à trier
 * @returns Liste triée
 */
export const sortAddresses = (addresses: Address[]): Address[] => {
  return [...addresses].sort((a, b) => {
    // Par défaut en premier
    if (a.is_default && !b.is_default) return -1;
    if (!a.is_default && b.is_default) return 1;

    // Puis par date de création (plus récentes en premier)
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return dateB - dateA;
  });
};

/**
 * Vérifier si une adresse est valide (champs obligatoires remplis)
 * @param address L'adresse à vérifier
 * @returns true si valide, false sinon
 */
export const isAddressValid = (address: Partial<Address>): boolean => {
  return !!(
    address.street &&
    address.city &&
    address.postal_code &&
    address.country &&
    address.address_type
  );
};

/**
 * Obtenir le badge de couleur pour un type d'adresse
 * @param type Type d'adresse
 * @returns Couleur du badge (Tailwind classes)
 */
export const getAddressTypeBadgeColor = (type: AddressType): string => {
  switch (type) {
    case 'home':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    case 'work':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
    case 'other':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
  }
};

/**
 * Obtenir l'icône pour un type d'adresse
 * @param type Type d'adresse
 * @returns Nom de l'icône Ionicons
 */
export const getAddressTypeIcon = (type: AddressType): string => {
  switch (type) {
    case 'home':
      return 'home';
    case 'work':
      return 'briefcase';
    case 'other':
      return 'location';
    default:
      return 'location';
  }
};

/**
 * Vérifier si deux adresses sont identiques (même contenu)
 * @param addr1 Première adresse
 * @param addr2 Deuxième adresse
 * @returns true si identiques, false sinon
 */
export const areAddressesEqual = (
  addr1: Partial<Address>,
  addr2: Partial<Address>
): boolean => {
  return (
    addr1.street === addr2.street &&
    addr1.city === addr2.city &&
    addr1.postal_code === addr2.postal_code &&
    addr1.country === addr2.country &&
    addr1.address_type === addr2.address_type
  );
};

/**
 * Calculer le nombre de slots restants
 * @param currentCount Nombre actuel d'adresses
 * @returns Nombre de slots disponibles
 */
export const getRemainingSlots = (currentCount: number): number => {
  return Math.max(0, MAX_ADDRESSES - currentCount);
};
