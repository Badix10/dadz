## Objectif
- Repasser l’écran `app/(tabs)/profile.tsx` sur les tokens Tailwind et les composants refactorés.

## Problèmes actuels
- Mélange de classes inexistantes (`bg-background-light`, `text-text-light`) et de `bg-white` forcé.
- Icônes et ActivityIndicator avec couleurs hex (`#FFC700`, `#9CA3AF`, etc.).
- Sections utilisent encore `bg-white`/`dark:bg-surface-dark` mais sans cohérence globale.

## Plan d’action
1. Remplacer les classes d’arrière-plan par `bg-background`/`dark:bg-background-dark` (définis dans Tailwind).
2. Utiliser les composants UI refactorés (PageHeader, SettingsItem, PrimaryButton, LanguageSelector).
3. Revoir les couleurs d’icônes : `text-primary`, `text-muted`, `text-destructive`.
4. S’assurer que le spinner (`ActivityIndicator`) récupère la couleur primaire depuis un token partagé.

## Vérifications
- Tester l’écran en Light/Dark connecté/déconnecté.
- Vérifier la cohérence des cartes (ombres, coins).
