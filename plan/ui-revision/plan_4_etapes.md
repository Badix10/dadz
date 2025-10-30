# 🛠️ Plan en 4 étapes – Finalisation UI Tokens

## Étape 1 — Débloquer la migration
- Ajouter les variantes manquantes dans `themeColors` (ex. `mutedDarkForeground`) et ajuster tous les appels (`SearchHeader`, `SettingsItem`, etc.).
- Migrer `components/Search/NoResultsState.tsx` pour supprimer l’ultime import `COLORS`, puis vérifier avec `rg` qu’il n’en reste aucun.
- Repasser sur `tailwind.config.js` et `lib/utils/themeColors.ts` pour assurer la synchronisation des palettes (primary, muted, destructive…).

## Étape 2 — Finaliser les composants métier
- Navigation & layout : contrôler `BottomNavigation`, `Header`, `PageHeader` et les composants associés (espace promo/cta éventuels).
- Recherche : harmoniser `SearchBar`, `SearchSuggestions`, `EmptySearchState`, `NoResultsState` avec les tokens et le thème dark.
- Filtres / Settings / Adresses : valider `FilterDrawer`, `LanguageSelector`, `SettingsItem`, `LocationButton` (overlay, switches, badges).
- Restaurant : purger les couleurs hex restantes (badges, ratings) et uniformiser les états pressés.

## Étape 3 — Migrer les écrans restants
- Traiter `app/(tabs)/search.tsx`, `app/(auth)/sign-in.tsx`, `app/(auth)/sign-up.tsx` et `app/order/offer-chart.tsx`.
- Repasser sur `home`, `profile`, `addresses` pour aligner les sous-composants si des props/variants ont évolué.
- Vérifier que `ActivityIndicator`, `RefreshControl`, `StatusBar` utilisent `themeColors` partout.

## Étape 4 — QA & Documentation
- Balayer chaque composant/écran en light & dark (checklist ou captures) pour valider les tokens.
- Tester les cas bord (erreurs d’inputs, modales, overlays, toasts).
- Actualiser la doc (`docs/DARK_MODE_GUIDE.md`, plans) et préparer la check finale (tests automatiques si disponibles, guide de vérif manuelle).
