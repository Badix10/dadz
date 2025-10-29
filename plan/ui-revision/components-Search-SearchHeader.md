## Objectif
- Normaliser les couleurs de `SearchHeader` en fonction des tokens Tailwind.

## Problèmes actuels
- Couleurs calculées dynamiquement (`isDark ? '#9CA3AF' : '#6B7280'`, etc.).
- Mix entre classes Tailwind (`bg-surface-dark`) et couleurs inline, ce qui complique la maintenance.

## Plan d’action
1. Remplacer les ternaires par des classes `bg-surface`, `dark:bg-surface-dark`, `text-foreground`, `text-muted`.
2. Pour les placeholders, utiliser les mêmes tokens que `SearchBar` (prévoir utilitaire partagé).
3. Harmoniser le bouton filtre (fond + badge) avec `bg-primary`, `text-primary-foreground`, `bg-destructive` pour la pastille.
4. Réduire l’usage de `useColorScheme` au strict nécessaire ou le supprimer si les classes suffisent.

## Vérifications
- Ouvrir la page de recherche en Light/Dark, vérifier le champ, la croix de clear, le badge de filtre.
