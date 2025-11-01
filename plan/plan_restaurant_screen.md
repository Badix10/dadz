## Plan d’implémentation – Écran Restaurant (focus Navigation & Chargement)

### 1. Préparation Schéma & Types (en suspens)
- ✅ Migration V7 couvre déjà l’ensemble des tables nécessaires.  
- ↺ Mise à jour automatique des types via MCP Supabase différée : à traiter une fois la navigation finalisée.  
- ✅ Types UI & mapper en place (`types/index.ts`, `lib/mappers/restaurantDetailsMapper.ts`).

### 2. Navigation & Chargement via ID (à détailler et finaliser)

**2.1. Flux d’entrée**
- Validations initiales : si `restaurantId` absent ou invalide → redirection/back immédiat avec toast/erreur.
- Loader d’adresse actuelle (`useAddresses`) exécuté avant d’invoquer `useRestaurantDetails` afin de passer latitude/longitude cohérentes.

**2.2. Hook `useRestaurantDetails`**
- Entrées : `{ restaurantId, latitude?, longitude?, includeReviews, reviewsLimit, autoRefresh }`.
- Expose : données mappées (`RestaurantDetailsUI`), états (`isLoading`, `isError`, `isRefreshing`, `error`), actions (`refetch`, `toggleFavorite`), filtres (`activeCategoryId`, `setActiveCategoryId`, `searchTerm`, `setSearchTerm`, `filteredMenu`).
- À verrouiller :
  - Ajout d’un drapeau `hasInitialFetch` pour savoir si la première charge est terminée avant d’afficher le skeleton.
  - Option `autoRefresh`: décider si on revalidate en focus (React Query) ou sur pull-to-refresh uniquement.

**2.3. Gestion des états dans l’écran `[id].tsx`**
- `Loading` :  
  - Avant `hasInitialFetch` → afficher `RestaurantSkeleton` (placeholder complet).  
  - Après initial fetch mais `isRefreshing` → conserver les données visibles et montrer un spinner discret.  
- `Error` :  
  - Cas `not found` (404 Supabase) → écran dédié avec CTA “Retour”.  
  - Cas erreurs réseau/serveur → message + bouton “Réessayer” (`refetch`).  
- `Success` :  
  - ScrollView unique, rafraîchissable (`RefreshControl` branché sur `refetch`).  
  - Propager `toggleFavorite`, `setActiveCategoryId`, `setSearchTerm` aux composants enfants (Menu, Header).

**2.4. Navigation sortante**
- Depuis Home/Search : `router.push('/restaurant/${restaurant.id}')` (déjà en place).  
- Depuis le screen restaurant :  
  - Bouton retour = `router.back()`, mais prévoir fallback `router.replace('/(tabs)/home')` si navigation directe (deep link).  
  - CTA “Commander” (future intégration) => pour l’instant `console.warn` ou `alert`, mais anticiper param additionnels : `router.push('/order?restaurantId=...')`.

**2.5. Recherche & filtrage menu**
- Exposer `searchTerm`, `activeCategoryId` via un header sticky dans le menu :  
  - Champ de recherche → appelle `setSearchTerm` (debounce 200ms).  
  - Bandeau de catégories (chips) → `setActiveCategoryId`.  
- `filteredMenu` (retour hook) déjà filtré : l’écran n’a qu’à itérer dessus.  
- En cas de zéro résultat : message spécifique (ex. `t('restaurant:menu.noResults', { searchTerm })`).

**2.6. Favoris**
- `toggleFavorite` ne fait que basculer un état local pour l’instant.  
- Prévoir interface visuelle cohérente (icône cœur dans header + bouton secondaire dans `RestaurantHero`).  
- Garder à l’esprit la future mutation Supabase : `toggleFavorite` devra exposer un `isMutating` pour gérer le feedback.

**2.7. Refresh & revalidation**
- `RefreshControl` → appelle `refetch()` manuellement.  
- Config React Query : `staleTime` 5 min, `refetchOnWindowFocus` désactivé (mobile).  
- Envisager un timestamp de dernière mise à jour pour afficher “Mis à jour il y a X min”.

**2.8. Gestion des deep-links**
- S’assurer que l’écran supporte une ouverture directe (ex. notification).  
- Si aucune adresse courante n’est définie, charger quand même les données restaurant mais masquer les infos distance/frais (les calculs du mapper les rendent optionnels).

### 3. Composition UI & Sections (reporté)
- Création du dossier `components/Restaurant/` et intégration du design `designs/RestaurantDetails.png` prévue après stabilisation du flux navigation/chargement.  
- Brancher ultérieurement les helpers `searchTerm`/`activeCategoryId` dans `RestaurantMenu`.

### 4. Internationalisation, QA & suivi (reporté)
- Namespace `restaurant` déjà créé ; l’enregistrement dans `i18n/config.ts`, les tests, la doc et l’intégration panier seront traités une fois la navigation solidifiée.  
- Rappel : section “Suivi & Intégration Future” reste analytique, sans code pour le moment.
