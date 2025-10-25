# 📸 Guide : Gestion des Images (Restaurants & Plats)

## 🎯 Vue d'Ensemble

Ce guide explique comment fonctionnent les images dans l'application Dadz.

### Responsabilités

- **📱 App Mobile Client** : **Affichage uniquement** (pas d'upload)
- **💼 Dashboard Restaurateur** : Upload, modification, suppression des images

---

## 🗂️ Structure Supabase Storage

### Buckets créés

```
restaurants/           (5MB max par fichier, public)
├── logos/
│   ├── {restaurant-id}.jpg
│   ├── {restaurant-id}.png
│   └── ...
└── covers/
    ├── {restaurant-id}.jpg
    └── ...

dishes/               (5MB max par fichier, public)
└── {dish-id}.jpg
└── {dish-id}.png
└── ...
```

### Types MIME acceptés
- `image/jpeg` / `image/jpg`
- `image/png`
- `image/webp`

---

## 🔐 Permissions (RLS)

### Lecture (SELECT) - Public ✅
Tout le monde peut **voir** les images (clients, visiteurs, etc.)

### Écriture (INSERT/UPDATE/DELETE) - Authentifié 🔒
Seuls les utilisateurs **authentifiés** peuvent uploader/modifier/supprimer
*(Plus tard : uniquement restaurateurs)*

---

## 📋 Tables & Champs

### Table `restaurants`
```sql
logo_url         TEXT,    -- URL du logo (200x200px recommandé)
cover_image_url  TEXT,    -- URL de la couverture (1200x400px recommandé)
```

### Table `dishes`
```sql
image_url        TEXT,    -- URL de l'image du plat (800x600px recommandé)
```

---

## 💻 Utilisation dans le Code

### 1. App Mobile (Affichage uniquement)

```typescript
import { Image } from 'react-native';
import { imageService } from '@/lib/services/imageService';

// Afficher logo restaurant
<Image
  source={{ uri: restaurant.logo_url || imageService.getPlaceholder('restaurant-logo') }}
  style={{ width: 100, height: 100 }}
/>

// Afficher cover restaurant
<Image
  source={{ uri: restaurant.cover_image_url || imageService.getPlaceholder('restaurant-cover') }}
  style={{ width: '100%', height: 200 }}
/>

// Afficher image plat
<Image
  source={{ uri: dish.image_url || imageService.getPlaceholder('dish') }}
  style={{ width: 300, height: 200 }}
/>
```

### 2. Dashboard Restaurateur (Upload)

```typescript
import { imageService } from '@/lib/services/imageService';

// Upload logo restaurant
const handleUploadLogo = async (file: File, restaurantId: string) => {
  try {
    const url = await imageService.uploadImage(
      file,
      'restaurant-logo',
      restaurantId
    );

    // Sauvegarder l'URL dans la DB
    await supabase
      .from('restaurants')
      .update({ logo_url: url })
      .eq('id', restaurantId);

    console.log('Logo uploaded:', url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Upload cover restaurant
const handleUploadCover = async (file: File, restaurantId: string) => {
  const url = await imageService.uploadImage(
    file,
    'restaurant-cover',
    restaurantId
  );

  await supabase
    .from('restaurants')
    .update({ cover_image_url: url })
    .eq('id', restaurantId);
};

// Upload image plat
const handleUploadDish = async (file: File, dishId: string) => {
  const url = await imageService.uploadImage(
    file,
    'dish',
    dishId
  );

  await supabase
    .from('dishes')
    .update({ image_url: url })
    .eq('id', dishId);
};

// Supprimer une image
const handleDeleteImage = async (imageUrl: string) => {
  await imageService.deleteImage(imageUrl);

  // Retirer l'URL de la DB
  await supabase
    .from('restaurants')
    .update({ logo_url: null })
    .eq('id', restaurantId);
};
```

---

## 🚀 Flow Complet

### Upload (Dashboard Restaurateur)

```
1. Restaurateur sélectionne une image
2. Validation (type, taille)
3. Upload vers Supabase Storage
   → restaurants/logos/{restaurant-id}.jpg
4. Récupération de l'URL publique
5. Sauvegarde de l'URL dans la table
   → restaurants.logo_url = "https://..."
```

### Affichage (App Mobile)

```
1. Requête à la DB
   → SELECT logo_url FROM restaurants WHERE id = ...
2. Récupération de l'URL
3. Affichage avec <Image source={{ uri: logo_url }} />
4. Si logo_url = null → Afficher placeholder
```

---

## 📊 Exemples de Requêtes SQL

### Récupérer restaurants avec images
```sql
SELECT
  id,
  name,
  logo_url,
  cover_image_url,
  rating
FROM restaurants
WHERE is_active = true;
```

### Récupérer plats avec images
```sql
SELECT
  d.id,
  d.name,
  d.image_url,
  d.price,
  r.name as restaurant_name
FROM dishes d
JOIN restaurants r ON r.id = d.restaurant_id
WHERE d.is_available = true
  AND r.is_active = true;
```

---

## 🎨 Recommandations Images

### Restaurant Logo
- **Dimensions** : 200x200px (carré)
- **Format** : PNG avec transparence ou JPG
- **Poids** : < 500KB

### Restaurant Cover
- **Dimensions** : 1200x400px (ratio 3:1)
- **Format** : JPG ou WebP
- **Poids** : < 1MB

### Plat
- **Dimensions** : 800x600px (ratio 4:3)
- **Format** : JPG ou WebP
- **Poids** : < 800KB

---

## 🛠️ Commandes Utiles

### Vérifier les buckets
```sql
SELECT * FROM storage.buckets;
```

### Lister les fichiers d'un bucket
```typescript
const { data, error } = await supabase.storage
  .from('restaurants')
  .list('logos');
```

### Obtenir l'URL publique
```typescript
const { data } = supabase.storage
  .from('restaurants')
  .getPublicUrl('logos/abc-123.jpg');

console.log(data.publicUrl);
```

---

## ⚠️ Notes Importantes

1. **App Mobile** = Pas d'upload, uniquement affichage
2. **Dashboard** = Upload, modification, suppression
3. Les images sont **publiques** (pas besoin d'authentification pour les voir)
4. Les URLs sont stockées dans la DB (pas les fichiers eux-mêmes)
5. Toujours fournir un **placeholder** si pas d'image

---

## 🔮 Évolutions Futures

- [ ] Compression automatique des images
- [ ] Génération de miniatures (thumbnails)
- [ ] Support des images multiples par restaurant
- [ ] Galerie photos pour les plats
- [ ] Restreindre upload aux restaurateurs uniquement (role-based)
- [ ] Watermarking automatique

---

## 📚 Ressources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [RLS for Storage](https://supabase.com/docs/guides/storage/security/access-control)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)
