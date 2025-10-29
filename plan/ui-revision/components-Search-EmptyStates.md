## Objectif
- Uniformiser `EmptySearchState` et `NoResultsState` avec les tokens Tailwind.

## Problèmes actuels
- Utilisent `COLORS.text.primary/secondary` et des classes `bg-gray-100`/`bg-gray-800` non alignées avec la charte.
- Icônes `Ionicons` avec couleurs `text-primary` (non définies).

## Plan d’action
1. Remplacer les backgrounds par `bg-muted`/`dark:bg-muted-dark`.
2. Utiliser `text-foreground`, `text-muted` pour les textes.
3. Harmoniser les icônes (ex. `text-primary`/`dark:text-primary-dark`) après avoir défini ces tokens dans Tailwind.

## Vérifications
- Visualiser les états vides en Light/Dark sur la page Search.
