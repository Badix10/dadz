## Objectif
- Harmoniser l’écran `app/search.tsx` avec la nouvelle base Tailwind.

## Problèmes actuels
- `ActivityIndicator` et autres éléments utilisent des hex (`#FFD700`).
- Dépend de composants (SearchHeader, FilterDrawer, CategoryList, RestaurantGrid, EmptyStates) qui doivent être refactorés.
- `Surface` applique déjà `bg-surface`, mais l’écran mélange encore logique `isDark` pour les spinners/StatusBar.

## Plan d’action
1. Reprendre les couleurs inline (`ActivityIndicator`, etc.) via un helper `themeColors.primary`.
2. S’assurer que les composants enfants sont mis à jour selon leurs plans avant d’ajuster l’écran.
3. Supprimer les usages superflus de `isDark` une fois les classes `dark:` en place.

## Vérifications
- Lancer une recherche en Light/Dark, vérifier les loaders, les états vides et la cohérence globale.
