## Objectif
- Harmoniser `RadioButton` avec les tokens Tailwind et supprimer `COLORS`.

## Problèmes actuels
- Bordures `COLORS.border.default`, absence de gestion cohérente du texte.
- Couleurs directes (`bg-primary`) sans déclinaison `dark`.

## Plan d’action
1. Remplacer les bordures par `border-border` et `dark:border-border-dark` si défini.
2. Utiliser `bg-primary` + `text-primary-foreground` pour l’état sélectionné.
3. Appliquer `text-foreground`/`dark:text-foreground-dark` au label.
4. Supprimer `COLORS` et importer un utilitaire `cn` si nécessaire.

## Vérifications
- Tester les états sélectionné/désactivé en Light/Dark.
