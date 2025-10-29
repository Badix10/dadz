## Objectif
- Mettre à jour `components/Header/Header.tsx` et ses sous-composants pour qu’ils utilisent les tokens Tailwind.

## Problèmes actuels
- Fond du header `bg-[#1A1A1A]` fixe → trop sombre en Light mode.
- Couleurs toutes codées en dur (`#FFFFFF`, `#FFC700`).
- Incohérence avec `tailwind.config.js` (background crème en light).

## Plan d’action
1. Définir les classes `bg-background`/`dark:bg-background-dark` pour l’enveloppe et adapter la couleur du texte via `text-foreground`.
2. Remplacer les icônes en hex par `text-primary`, `text-foreground`.
3. Harmoniser les badges/notification via tokens (`bg-primary`, `text-primary-foreground`).
4. Vérifier l’impact sur les sous-composants (mettre à jour `LocationSelector`, `AddressBottomSheet` selon plans dédiés).

## Vérifications
- Afficher le header en Light/Dark et vérifier la lisibilité du texte et des icônes.
