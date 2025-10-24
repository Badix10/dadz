import { z } from 'zod';

/**
 * Schéma de validation Zod pour les adresses
 * Les messages d'erreur utilisent des clés i18n qui seront traduites
 */
export const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'addresses:validation.streetRequired')
    .min(5, 'addresses:validation.streetMin')
    .max(200, 'addresses:validation.streetMax'),

  city: z
    .string()
    .min(1, 'addresses:validation.cityRequired')
    .min(2, 'addresses:validation.cityMin')
    .max(100, 'addresses:validation.cityMax'),

  postal_code: z
    .string()
    .min(1, 'addresses:validation.postalCodeRequired')
    .regex(/^[0-9]{4,10}$/, 'addresses:validation.postalCodeInvalid'),

  country: z
    .string()
    .min(1, 'addresses:validation.countryRequired')
    .min(2, 'addresses:validation.countryMin')
    .max(100, 'addresses:validation.countryMax'),

  address_type: z.enum(['home', 'work', 'other'], {
    errorMap: () => ({ message: 'addresses:validation.addressTypeRequired' }),
  }),

  is_default: z.boolean().optional().default(false),
});

/**
 * Type TypeScript inféré du schéma Zod
 * Utilisé pour les formulaires
 */
export type AddressFormData = z.infer<typeof addressSchema>;

/**
 * Schéma partiel pour la mise à jour d'une adresse
 * Tous les champs sont optionnels
 */
export const addressUpdateSchema = addressSchema.partial();

export type AddressUpdateFormData = z.infer<typeof addressUpdateSchema>;
