## Objectif
- Appliquer la palette Tailwind sur `app/(tabs)/order.tsx`, `offer.tsx`, `chart.tsx`.

## Problèmes actuels
- Fond `bg-white` et `StatusBar` forcés en `light-content`.
- Icônes et textes en gris (`#D1D5DB`, `#9CA3AF`, `text-gray-400`) hors palette officielle.
- Dépendance au `PageHeader` non encore refactoré.

## Plan d’action
1. Remplacer `SafeAreaView className="bg-white"` par `bg-background dark:bg-background-dark`.
2. Ajuster `StatusBar` en fonction de `useColorScheme`.
3. Utiliser des tokens pour les icônes et textes placeholder (`text-muted`, `text-muted-dark`).
4. Après refonte de `PageHeader`, vérifier l’intégration.

## Vérifications
- Tester les trois écrans en bascule Light/Dark pour s’assurer que les placeholders restent lisibles.
