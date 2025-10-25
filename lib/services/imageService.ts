import { supabase } from '@/lib/supabase';

/**
 * Type d'image supporté
 */
export type ImageType = 'restaurant-logo' | 'restaurant-cover' | 'dish';

/**
 * Configuration des buckets et paths
 */
const BUCKET_CONFIG = {
  'restaurant-logo': {
    bucket: 'restaurants',
    folder: 'logos',
  },
  'restaurant-cover': {
    bucket: 'restaurants',
    folder: 'covers',
  },
  'dish': {
    bucket: 'dishes',
    folder: '',
  },
} as const;

/**
 * Types d'images acceptés
 */
const ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Service pour gérer l'upload et la gestion des images
 * Utilisé principalement par le Dashboard Restaurateur
 */
export const imageService = {
  /**
   * Valider un fichier image
   */
  validateImage: (file: File): { valid: boolean; error?: string } => {
    // Vérifier le type MIME
    if (!ACCEPTED_MIME_TYPES.includes(file.type as any)) {
      return {
        valid: false,
        error: `Type de fichier non supporté. Types acceptés: ${ACCEPTED_MIME_TYPES.join(', ')}`,
      };
    }

    // Vérifier la taille
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `Fichier trop volumineux. Taille max: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      };
    }

    return { valid: true };
  },

  /**
   * Upload une image vers Supabase Storage
   *
   * @param file - Fichier image à uploader
   * @param type - Type d'image (logo, cover, dish)
   * @param entityId - ID du restaurant ou du plat
   * @returns URL publique de l'image
   *
   * @example
   * // Upload logo restaurant
   * const url = await imageService.uploadImage(file, 'restaurant-logo', restaurantId);
   *
   * // Upload image plat
   * const url = await imageService.uploadImage(file, 'dish', dishId);
   */
  uploadImage: async (
    file: File,
    type: ImageType,
    entityId: string
  ): Promise<string> => {
    // Validation
    const validation = imageService.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const config = BUCKET_CONFIG[type];

    // Générer le chemin du fichier
    const fileExt = file.name.split('.').pop();
    const fileName = `${entityId}.${fileExt}`;
    const folder = config.folder ? `${config.folder}/` : '';

    // Pour les plats, ajouter le restaurant_id dans le path si disponible
    // Format: dishes/{restaurant_id}/{dish_id}.jpg
    const filePath = type === 'dish'
      ? `${folder}${fileName}`
      : `${folder}${fileName}`;

    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(config.bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Remplacer si existe déjà
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Obtenir l'URL publique
    const { data: urlData } = supabase.storage
      .from(config.bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },

  /**
   * Supprimer une image de Supabase Storage
   *
   * @param imageUrl - URL complète de l'image à supprimer
   */
  deleteImage: async (imageUrl: string): Promise<void> => {
    if (!imageUrl) return;

    try {
      // Extraire le bucket et le path depuis l'URL
      // Format: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
      const urlParts = imageUrl.split('/storage/v1/object/public/');
      if (urlParts.length !== 2) {
        throw new Error('Invalid image URL format');
      }

      const [bucket, ...pathParts] = urlParts[1].split('/');
      const filePath = pathParts.join('/');

      // Supprimer le fichier
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  },

  /**
   * Obtenir l'URL publique d'une image
   * (Pour les images déjà uploadées)
   */
  getPublicUrl: (bucket: string, path: string): string => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  /**
   * Obtenir une URL signée (temporaire) pour une image privée
   * Note: Actuellement les buckets sont publics, mais cette fonction
   * sera utile si on décide de rendre certains buckets privés
   */
  getSignedUrl: async (
    bucket: string,
    path: string,
    expiresIn: number = 3600
  ): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw error;
    }

    return data.signedUrl;
  },

  /**
   * Lister toutes les images d'un dossier
   * Utile pour le dashboard restaurateur
   */
  listImages: async (
    bucket: string,
    folder: string = ''
  ): Promise<string[]> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);

    if (error) {
      throw error;
    }

    return data
      .filter((file) => !file.id) // Filtrer les dossiers
      .map((file) => imageService.getPublicUrl(bucket, `${folder}/${file.name}`));
  },

  /**
   * Helper pour générer un placeholder si pas d'image
   */
  getPlaceholder: (type: ImageType): string => {
    const placeholders = {
      'restaurant-logo': 'https://via.placeholder.com/200x200?text=Logo',
      'restaurant-cover': 'https://via.placeholder.com/800x400?text=Cover',
      'dish': 'https://via.placeholder.com/400x300?text=Dish',
    };

    return placeholders[type];
  },
};

/**
 * Hook React Native pour upload d'image avec react-native-image-picker
 * NOTE: Ceci est pour référence future (Dashboard Restaurateur)
 * Ne pas utiliser dans l'app mobile client
 */

// import { launchImageLibrary } from 'react-native-image-picker';
//
// export const useImagePicker = () => {
//   const [uploading, setUploading] = useState(false);
//
//   const pickAndUploadImage = async (
//     type: ImageType,
//     entityId: string
//   ): Promise<string | null> => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         quality: 0.8,
//         maxWidth: 1920,
//         maxHeight: 1080,
//       });
//
//       if (result.didCancel || !result.assets?.[0]) {
//         return null;
//       }
//
//       const asset = result.assets[0];
//       const file = {
//         uri: asset.uri!,
//         type: asset.type!,
//         name: asset.fileName!,
//       };
//
//       setUploading(true);
//       const url = await imageService.uploadImage(file, type, entityId);
//       setUploading(false);
//
//       return url;
//     } catch (error) {
//       setUploading(false);
//       console.error('Error picking/uploading image:', error);
//       throw error;
//     }
//   };
//
//   return { pickAndUploadImage, uploading };
// };
