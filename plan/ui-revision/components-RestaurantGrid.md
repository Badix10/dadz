## Objectif
- Utiliser la palette Tailwind pour les titres de `RestaurantGrid`.

## Problèmes actuels
- Titre `text-black`/`dark:text-white` codé en dur.
- Version non horizontale n’a pas de classe `dark:` pour le titre.

## Plan d’action
1. Remplacer `text-black`/`dark:text-white` par `text-foreground dark:text-foreground-dark`.
2. Vérifier que les marges et la typographie restent correctes après modification.

## Vérifications
- Afficher la grille en Light/Dark (horizontal + vertical).
