## Objectif
- Remplacer l’utilisation de `COLORS` et des classes obsolètes dans `SearchSuggestions`.

## Problèmes actuels
- `COLORS.text.primary/secondary` pointeront sur les nouveaux tokens → planifier la migration.
- Couleurs de listes et puces basées sur `COLORS`, risque d’incohérence.

## Plan d’action
1. Après refonte de `constants/classNames`, basculer vers les classes Tailwind directes (`text-foreground`, `text-muted`).
2. Ajouter des classes utilitaires pour les puces (`text-muted`) au lieu de `COLORS.text.secondary`.
3. Vérifier les backgrounds (`bg-gray-100`, `dark:bg-gray-800`) et choisir `bg-muted`, `dark:bg-muted-dark` si nécessaire.

## Vérifications
- Comparer le rendu en Light/Dark, surtout pour les puces et la carte de suggestions.
