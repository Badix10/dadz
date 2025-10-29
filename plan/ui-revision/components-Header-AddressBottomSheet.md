## Objectif
- Harmoniser `AddressBottomSheet` avec les tokens Tailwind et supprimer les hex.

## Problèmes actuels
- Utilise des couleurs directes (`#3B82F6`, `#666666`, `#CCCCCC`, etc.).
- Certaines classes (`bg-surface-dark`) existent mais cohabitent avec du code inline JS.
- Icônes et textes conditionnels gérés via `isDark`.

## Plan d’action
1. Remplacer les couleurs inline par les classes Tailwind (`bg-primary/10`, `text-muted`, `text-primary`).
2. Définir, si nécessaire, des couleurs supplémentaires dans `tailwind.config.js` (ex. `info` pour le bleu).
3. Réduire l’usage de `isDark` au profit des classes `dark:`.
4. Vérifier les badges (`temp`, `default`) afin qu’ils utilisent des tokens cohérents.

## Vérifications
- Ouvrir la bottom sheet en Light/Dark et s’assurer du contraste pour les listes/badges/boutons.
