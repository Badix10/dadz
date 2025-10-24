# Plan d'implémentation - Gestion des Adresses

## 📋 Vue d'ensemble

Implémentation d'un système complet de gestion des adresses pour les clients, avec:
- CRUD complet sur les adresses (max 3 par utilisateur)
- Géolocalisation gratuite avec `expo-location`
- Formulaire de saisie manuelle avec validation
- État global avec Zustand
- Tests unitaires et d'intégration
- Support i18n (en, fr, ar)
- Support du dark mode

---

## 🎯 Objectifs et contraintes

### Contraintes métier
1. **Maximum 3 adresses par utilisateur**
2. **Une seule adresse peut être marquée comme "par défaut"**
3. **Types d'adresse**: home, work, other
4. **Si suppression de l'adresse par défaut**: la première adresse restante devient par défaut

### Contraintes techniques
- **Coût de développement: 0€** (pas de Google Places API)
- **Architecture en couches**: Services → Store → Hooks → Components → Screens
- **Tests obligatoires** pour assurer la non-régression
- **Séparation claire**: requêtes Supabase isolées dans des services

---

## 🏗️ Architecture

```
lib/
  services/
    addressService.ts       # Toutes les requêtes Supabase pour addresses
    locationService.ts      # Géolocalisation avec expo-location

  store/
    addressStore.ts         # Store Zustand pour état global des adresses

  validations/
    addressSchema.ts        # Schémas Zod pour validation

  utils/
    addressHelpers.ts       # Fonctions helpers métier

hooks/
  useAddresses.ts           # Hook qui consomme le store Zustand
  useLocation.ts            # Hook pour géolocalisation

components/
  addresses/
    AddressCard.tsx         # Carte affichant une adresse
    AddressForm.tsx         # Formulaire de création/édition
    AddressModal.tsx        # Modale conteneur
    AddressEmptyState.tsx   # État vide
    LocationButton.tsx      # Bouton "Ma position"

app/
  addresses/
    index.tsx               # Screen principal - liste des adresses

i18n/
  locales/
    en/addresses.json
    fr/addresses.json
    ar/addresses.json

__tests__/
  services/
    addressService.test.ts
    locationService.test.ts
  store/
    addressStore.test.ts
  hooks/
    useAddresses.test.ts
  components/
    AddressCard.test.tsx
    AddressForm.test.tsx
```

---

## 📦 Dépendances installées

### Production
```json
{
  "zustand": "^4.x",           // State management global
  "expo-location": "^17.x",     // Géolocalisation gratuite
  "zod": "^3.x",                // Validation (déjà installé)
  "react-hook-form": "^7.x"     // Formulaires (déjà installé)
}
```

### Développement
```json
{
  "@testing-library/react-native": "^13.x",
  "@testing-library/react-hooks": "^8.x",
  "jest": "^29.x"               // Déjà installé avec React Native
}
```

---

## 🔄 Flux de données

```
User Action
    ↓
Component (AddressCard, AddressForm)
    ↓
Hook (useAddresses)
    ↓
Store Zustand (addressStore)
    ↓
Service (addressService)
    ↓
Supabase
```

### Store Zustand - Structure

```typescript
interface AddressState {
  // État
  addresses: Address[];
  selectedAddress: Address | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAddresses: (userId: string) => Promise<void>;
  createAddress: (address: AddressInsert) => Promise<void>;
  updateAddress: (id: string, updates: AddressUpdate) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setAsDefault: (id: string) => Promise<void>;
  selectAddress: (address: Address | null) => void;

  // Getters
  getDefaultAddress: () => Address | null;
  canAddAddress: () => boolean;
}
```

---

## 🗃️ Services

### addressService.ts

```typescript
export const addressService = {
  // Récupérer toutes les adresses d'un utilisateur
  getAddresses: async (profileId: string): Promise<Address[]> => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Créer une nouvelle adresse
  createAddress: async (address: TablesInsert<'addresses'>): Promise<Address> => {
    const { data, error } = await supabase
      .from('addresses')
      .insert(address)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour une adresse
  updateAddress: async (id: string, updates: TablesUpdate<'addresses'>): Promise<Address> => {
    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer une adresse
  deleteAddress: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Retirer le flag "default" de toutes les adresses sauf une
  removeDefaultFromOthers: async (profileId: string, exceptId?: string): Promise<void> => {
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

  // Compter les adresses d'un utilisateur
  countAddresses: async (profileId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('addresses')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId);

    if (error) throw error;
    return count || 0;
  }
};
```

### locationService.ts

```typescript
import * as Location from 'expo-location';

export const locationService = {
  // Demander la permission de localisation
  requestPermission: async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  },

  // Récupérer l'adresse actuelle via géolocalisation
  getCurrentAddress: async (): Promise<ParsedAddress> => {
    // Vérifier permission
    const hasPermission = await locationService.requestPermission();
    if (!hasPermission) {
      throw new Error('Permission de localisation refusée');
    }

    // Obtenir coordonnées
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    // Reverse geocoding
    const addresses = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (!addresses || addresses.length === 0) {
      throw new Error('Impossible de récupérer l\'adresse');
    }

    // Parser le résultat
    const addr = addresses[0];
    return {
      street: `${addr.streetNumber || ''} ${addr.street || ''}`.trim(),
      city: addr.city || '',
      postal_code: addr.postalCode || '',
      country: addr.country || 'France',
    };
  }
};

interface ParsedAddress {
  street: string;
  city: string;
  postal_code: string;
  country: string;
}
```

---

## ✅ Validation Zod

### addressSchema.ts

```typescript
import { z } from 'zod';

export const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'validation.streetRequired')
    .min(5, 'validation.streetMin'),

  city: z
    .string()
    .min(1, 'validation.cityRequired')
    .min(2, 'validation.cityMin'),

  postal_code: z
    .string()
    .min(1, 'validation.postalCodeRequired')
    .regex(/^[0-9]{4,10}$/, 'validation.postalCodeInvalid'),

  country: z
    .string()
    .min(1, 'validation.countryRequired')
    .min(2, 'validation.countryMin'),

  address_type: z.enum(['home', 'work', 'other'], {
    errorMap: () => ({ message: 'validation.addressTypeRequired' })
  }),

  is_default: z.boolean().optional().default(false),
});

export type AddressFormData = z.infer<typeof addressSchema>;
```

---

## 🌐 Traductions (i18n)

### Structure des fichiers

#### fr/addresses.json

```json
{
  "title": "Mes adresses",
  "subtitle": "Gérez vos adresses de livraison (max 3)",

  "emptyState": {
    "title": "Aucune adresse enregistrée",
    "message": "Ajoutez votre première adresse de livraison pour commander",
    "action": "Ajouter une adresse"
  },

  "addButton": "Ajouter une adresse",
  "limitBadge": "{{count}}/3 adresses",
  "maxReached": "Limite atteinte",
  "maxReachedMessage": "Vous avez atteint la limite de 3 adresses. Supprimez-en une pour en ajouter une nouvelle.",

  "addressTypes": {
    "home": "Domicile",
    "work": "Travail",
    "other": "Autre"
  },

  "form": {
    "title": {
      "create": "Nouvelle adresse",
      "edit": "Modifier l'adresse"
    },

    "manualEntry": "Saisie manuelle",
    "useLocation": "Utiliser ma position",

    "fields": {
      "street": {
        "label": "Rue",
        "placeholder": "Ex: 123 Rue de la Paix"
      },
      "city": {
        "label": "Ville",
        "placeholder": "Ex: Paris"
      },
      "postalCode": {
        "label": "Code postal",
        "placeholder": "Ex: 75001"
      },
      "country": {
        "label": "Pays",
        "placeholder": "Ex: France"
      },
      "addressType": {
        "label": "Type d'adresse"
      },
      "isDefault": {
        "label": "Adresse par défaut",
        "helper": "Sera utilisée par défaut pour vos commandes"
      }
    },

    "actions": {
      "save": "Enregistrer",
      "cancel": "Annuler",
      "saving": "Enregistrement..."
    }
  },

  "validation": {
    "streetRequired": "La rue est requise",
    "streetMin": "La rue doit contenir au moins 5 caractères",
    "cityRequired": "La ville est requise",
    "cityMin": "La ville doit contenir au moins 2 caractères",
    "postalCodeRequired": "Le code postal est requis",
    "postalCodeInvalid": "Code postal invalide (4-10 chiffres)",
    "countryRequired": "Le pays est requis",
    "countryMin": "Le pays doit contenir au moins 2 caractères",
    "addressTypeRequired": "Le type d'adresse est requis"
  },

  "actions": {
    "edit": "Modifier",
    "delete": "Supprimer",
    "setAsDefault": "Définir par défaut",
    "viewDetails": "Voir détails"
  },

  "deleteConfirm": {
    "title": "Supprimer l'adresse ?",
    "message": "Cette action est irréversible.",
    "confirm": "Supprimer",
    "cancel": "Annuler"
  },

  "messages": {
    "createSuccess": "Adresse ajoutée avec succès",
    "updateSuccess": "Adresse mise à jour",
    "deleteSuccess": "Adresse supprimée",
    "setDefaultSuccess": "Adresse par défaut mise à jour",
    "createError": "Impossible d'ajouter l'adresse",
    "updateError": "Impossible de mettre à jour l'adresse",
    "deleteError": "Impossible de supprimer l'adresse",
    "locationPermissionDenied": "Permission de localisation refusée",
    "locationError": "Impossible de récupérer votre position",
    "maxAddressesError": "Vous avez atteint la limite de 3 adresses"
  },

  "labels": {
    "default": "Par défaut",
    "notDefault": "Non par défaut"
  }
}
```

---

## 🧪 Stratégie de tests

### Tests à implémenter

#### 1. Services Tests

##### addressService.test.ts
- ✅ Récupération des adresses
- ✅ Création d'une adresse
- ✅ Mise à jour d'une adresse
- ✅ Suppression d'une adresse
- ✅ Retirer le flag default des autres adresses
- ✅ Compter les adresses
- ✅ Gestion des erreurs Supabase

##### locationService.test.ts
- ✅ Demande de permission
- ✅ Récupération de l'adresse actuelle
- ✅ Permission refusée
- ✅ Erreur de géolocalisation
- ✅ Parsing de l'adresse

#### 2. Store Tests

##### addressStore.test.ts
- ✅ État initial
- ✅ fetchAddresses met à jour l'état
- ✅ createAddress ajoute une adresse
- ✅ updateAddress met à jour l'adresse
- ✅ deleteAddress retire l'adresse
- ✅ setAsDefault change l'adresse par défaut
- ✅ canAddAddress retourne false si 3 adresses
- ✅ getDefaultAddress retourne la bonne adresse

#### 3. Hooks Tests

##### useAddresses.test.ts
- ✅ Récupération initiale des adresses
- ✅ Création d'une adresse
- ✅ Limite de 3 adresses respectée
- ✅ Mise à jour de l'adresse par défaut
- ✅ Suppression avec gestion du default

#### 4. Components Tests

##### AddressCard.test.tsx
- ✅ Affichage des informations
- ✅ Badge "Par défaut" visible si is_default
- ✅ Actions (modifier, supprimer) appellent les callbacks
- ✅ Dark mode support

##### AddressForm.test.tsx
- ✅ Validation des champs
- ✅ Soumission du formulaire
- ✅ Pré-remplissage en mode édition
- ✅ Bouton "Ma position" appelle locationService
- ✅ Messages d'erreur affichés

---

## 📝 Étapes d'implémentation

### Phase 1: Fondations (Services + Validation)
1. ✅ Créer `lib/services/addressService.ts` avec toutes les requêtes Supabase
2. ✅ Créer `lib/services/locationService.ts` avec expo-location
3. ✅ Créer `lib/validations/addressSchema.ts` avec Zod
4. ✅ Créer `lib/utils/addressHelpers.ts` pour fonctions utilitaires

### Phase 2: État global (Store Zustand)
5. ✅ Créer `lib/store/addressStore.ts` avec Zustand
6. ✅ Implémenter toutes les actions (fetch, create, update, delete, setAsDefault)
7. ✅ Implémenter les getters (getDefaultAddress, canAddAddress)

### Phase 3: Traductions
8. ✅ Créer `i18n/locales/en/addresses.json`
9. ✅ Créer `i18n/locales/fr/addresses.json`
10. ✅ Créer `i18n/locales/ar/addresses.json`

### Phase 4: Hooks
11. ✅ Créer `hooks/useAddresses.ts` qui consomme le store
12. ✅ Créer `hooks/useLocation.ts` pour la géolocalisation

### Phase 5: Composants UI
13. ✅ Créer `components/addresses/AddressCard.tsx`
14. ✅ Créer `components/addresses/AddressEmptyState.tsx`
15. ✅ Créer `components/addresses/LocationButton.tsx`
16. ✅ Créer `components/addresses/AddressForm.tsx`
17. ✅ Créer `components/addresses/AddressModal.tsx`

### Phase 6: Screen principal
18. ✅ Créer `app/addresses/index.tsx`
19. ✅ Implémenter la liste des adresses
20. ✅ Implémenter la création via modale
21. ✅ Implémenter l'édition via modale
22. ✅ Implémenter la suppression avec confirmation
23. ✅ Implémenter le toggle "par défaut"

### Phase 7: Intégration
24. ✅ Connecter le bouton "Adresses" dans `app/(tabs)/profile.tsx`
25. ✅ Tester le flux complet

### Phase 8: Tests (après implémentation)
26. ✅ Écrire les tests pour addressService
27. ✅ Écrire les tests pour locationService
28. ✅ Écrire les tests pour addressStore
29. ✅ Écrire les tests pour useAddresses
30. ✅ Écrire les tests pour AddressCard
31. ✅ Écrire les tests pour AddressForm
32. ✅ Lancer la suite de tests complète

---

## 🎨 UX/UI Guidelines

### Parcours utilisateur

#### Création première adresse
1. User arrive sur `/addresses` → Empty state
2. Tap "Ajouter une adresse" → Modale s'ouvre
3. Deux options:
   - Formulaire manuel (champs visibles)
   - Bouton "Utiliser ma position" (GPS icon)
4. Submit → Modale se ferme → Adresse apparaît
5. Toast: "Adresse ajoutée avec succès ✓"

#### Ajout 2ème/3ème adresse
1. Badge "1/3" ou "2/3" visible
2. Bouton "Ajouter" actif
3. À 3 adresses → Bouton désactivé + message

#### Modification
1. Tap sur carte → Modale en mode édition
2. Formulaire pré-rempli
3. Submit → Update optimiste → Toast

#### Suppression
1. Swipe left ou bouton "Supprimer"
2. Alert de confirmation
3. Confirm → Animation de suppression
4. Si dernière → Empty state

#### Définir par défaut
1. Tap sur toggle/étoile
2. Animation
3. Autres cartes perdent le badge "Par défaut"
4. Réorganisation: par défaut en premier

### Design patterns
- Loading states (skeletons)
- Optimistic updates
- Error boundaries
- Pull-to-refresh
- Swipe actions
- Animations fluides
- Dark mode natif

---

## 🔐 Logique métier

### Règles strictes

```typescript
// 1. Limite de 3 adresses
const canAddAddress = (count: number): boolean => count < 3;

// 2. Une seule par défaut
const setAsDefault = async (id: string, profileId: string) => {
  // Retirer default des autres
  await addressService.removeDefaultFromOthers(profileId, id);
  // Mettre à jour celle-ci
  await addressService.updateAddress(id, { is_default: true });
};

// 3. Gestion après suppression
const handleDelete = async (address: Address, addresses: Address[]) => {
  await addressService.deleteAddress(address.id);

  // Si c'était la par défaut et qu'il reste des adresses
  if (address.is_default && addresses.length > 1) {
    const remaining = addresses.filter(a => a.id !== address.id);
    await setAsDefault(remaining[0].id, address.profile_id);
  }
};
```

---

## 📊 Performance

### Optimisations
- **Zustand** pour éviter re-renders inutiles
- **Optimistic updates** pour UX instantanée
- **Debounce** sur les inputs si autocomplete futur
- **Memoization** des composants lourds
- **React.memo** sur AddressCard

### Monitoring
- Temps de chargement des adresses
- Temps de réponse Supabase
- Taux d'erreur de géolocalisation

---

## 🚀 Déploiement et CI/CD

### Checklist avant merge
- [ ] Tous les tests passent
- [ ] Coverage > 80%
- [ ] Traductions complètes (en, fr, ar)
- [ ] Dark mode fonctionnel
- [ ] Testé sur iOS et Android
- [ ] RLS Supabase vérifié
- [ ] Pas de console.log/error

---

## 📚 Documentation technique

### Types TypeScript

```typescript
// Tiré de database.types.ts
type Address = Tables<'addresses'>;
type AddressInsert = TablesInsert<'addresses'>;
type AddressUpdate = TablesUpdate<'addresses'>;

// Type du store
interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
  loading: boolean;
  error: string | null;
  fetchAddresses: (userId: string) => Promise<void>;
  createAddress: (address: AddressInsert) => Promise<void>;
  updateAddress: (id: string, updates: AddressUpdate) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setAsDefault: (id: string) => Promise<void>;
  selectAddress: (address: Address | null) => void;
  getDefaultAddress: () => Address | null;
  canAddAddress: () => boolean;
}
```

---

## 🎯 Résumé des décisions

| Décision | Choix | Raison |
|----------|-------|--------|
| State management | Zustand | État global, simple, performant |
| Géolocalisation | expo-location | Gratuit, intégré Expo |
| Validation | Zod | Type-safe, messages i18n |
| Tests | Jest + Testing Library | Standard React Native |
| Architecture | Layered (Services → Store → Hooks → Components) | Séparation des responsabilités |
| Autocomplete | ❌ Non implémenté | Coût Google Places |

---

## 📅 Estimation

| Phase | Tâches | Temps estimé |
|-------|--------|--------------|
| Phase 1-2 | Services + Store | 2h |
| Phase 3 | Traductions | 30min |
| Phase 4 | Hooks | 1h |
| Phase 5 | Composants | 3h |
| Phase 6 | Screen | 2h |
| Phase 7 | Intégration | 30min |
| Phase 8 | Tests | 3h |
| **TOTAL** | | **~12h** |

---

## ✅ Validation du plan

**Plan validé le:** 2025-10-22

**Validé par:** Équipe de développement

**Statut:** Prêt pour implémentation

---

## 🔄 Prochaines étapes

1. ✅ Installer les dépendances (zustand, expo-location, testing libs)
2. ✅ Sauvegarder ce plan dans `./plan/`
3. 🚀 Commencer Phase 1: Créer les services
