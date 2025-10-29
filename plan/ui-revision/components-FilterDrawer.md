## Objectif
- Refondre `FilterDrawer` pour qu’il respecte la palette Tailwind et évite les hexadécimaux.

## Problèmes actuels
- Fond général forcé à `#1A1A1A`, boutons `bg-[#2A2A2A]`, textes `#FFFFFF`, etc.
- Les chips sélectionnées reposent sur `bg-primary` mais sans `text-primary-foreground`.
- Utilisation du hook `isDark` pour piloter des couleurs en dur.

## Plan d’action
1. Remplacer les couleurs JS par des combinaisons Tailwind (`bg-surface-dark`, `text-foreground`, `bg-muted`).
2. Garder `useColorScheme` seulement si nécessaire (ex. dégradés personnalisés), sinon s’en remettre aux classes `dark:`.
3. Harmoniser les boutons Reset/Apply via `PrimaryButton` ou via tokens (`border-destructive`, `bg-primary`).
4. Vérifier le contraste des textes dans les chips.

## Vérifications
- Tester l’ouverture du drawer en Light/Dark.
- Vérifier l’état sélectionné/non sélectionné des options.
