## Objectif
- Faire correspondre `CategoryItem` aux tokens Tailwind pour gérer Light/Dark sans JS inutile.

## Problèmes actuels
- `bg-white`, `bg-black`, `bg-[#2A2A2A]`, `#000000`/`#FFFFFF` codés en dur.
- Utilise `COLORS.text.*` obsolètes.

## Plan d’action
1. Remplacer les `bg` par `bg-surface`, `dark:bg-surface-dark`, et `bg-primary` pour l’état sélectionné.
2. Utiliser `text-foreground`/`dark:text-foreground-dark` pour les textes.
3. Pour les icônes `Ionicons`, passer à `text-primary-foreground` ou `text-foreground` selon l’état.
4. Supprimer la logique `isDark` excédentaire si les classes `dark:` suffisent.

## Vérifications
- Afficher la liste des catégories en Light/Dark et tester l’état sélectionné.
