## Objectif
- Harmoniser `RestaurantCard` avec les tokens Tailwind et réduire les couleurs inline.

## Problèmes actuels
- Classes `dark:bg-card-dark` (à vérifier) + `Ionicons` avec `#EF4444`, `#FFD700`.
- Utilise `COLORS.text.*` qui vont évoluer.
- Badge de temps `bg-black/70` constant quelle que soit la palette.

## Plan d’action
1. Remplacer les couleurs directes par `text-destructive`, `text-warning`, `text-primary` selon le vocabulaire Tailwind.
2. S’assurer que la carte utilise `bg-card`/`dark:bg-card-dark` (définir si manquant).
3. Harmoniser le badge de temps avec un token `bg-foreground/70` ou `bg-muted`.
4. Vérifier le fallback `favoriteBgColor` pour utiliser des classes (ou `StyleSheet`).

## Vérifications
- Rendu horizontal & vertical en Light/Dark, icône favori + label temps/distance.
