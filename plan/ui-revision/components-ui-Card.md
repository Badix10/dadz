## Objectif
- Synchroniser `Card` avec les tokens Tailwind (`card`, `card-foreground`, `card-border`).

## Problèmes actuels
- Utilise `bg-white`, `dark:bg-field-dark`, `border-field-light` qui n’existent pas.

## Plan d’action
1. Définir les variantes en se basant sur `bg-card`, `dark:bg-card-dark`, `shadow-card`.
2. Pour la variante `outlined`, utiliser `border-border`.
3. Ajouter, si besoin, des tokens `card` supplémentaires dans `tailwind.config.js`.

## Vérifications
- Rendu des cartes par défaut/élevées/outlined en Light/Dark.
