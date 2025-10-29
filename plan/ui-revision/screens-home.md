## Objectif
- Nettoyer l’écran `app/(tabs)/home.tsx` des couleurs inline et l’aligner avec le thème Tailwind.

## Problèmes actuels
- `RefreshControl` utilise `#FFD700`, ActivityIndicator idem.
- Le header enfant (`Header`) et les composants listés utilisent encore des palettes mixtes.

## Plan d’action
1. Utiliser un helper centralisé pour récupérer la couleur primaire (`themeColors.primary`) et l’appliquer au `StatusBar`, `RefreshControl`, `ActivityIndicator`.
2. Vérifier que les composants enfants (SearchBar, CategoryList, RestaurantGrid, FilterDrawer, AddressBottomSheet) ont bien été refactorés selon leurs plans.
3. Supprimer toute référence à `#FFD700` ou `#FFFFFF`.

## Vérifications
- Tester scroll/refresh en Light/Dark.
- Confirmer que les loaders, messages d’erreur, etc. respectent la palette.
