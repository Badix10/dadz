## Objectif
- Rebrancher `CustomInput` sur les tokens Tailwind (`bg-input`, `text-foreground`, `border-border`) sans dépendre de `COLORS`.

## Problèmes actuels
- Utilise `COLORS.input.background`/`text` obsolètes, plus hex pour `placeholder`.
- Manque de cohérence entre Light/Dark (placeholder jaune/marron non défini dans le thème).

## Plan d’action
1. Remplacer les classes `COLORS.*` par `bg-input`, `dark:bg-input-dark`, `text-foreground`, etc. (définis dans `tailwind.config.js` ou à ajouter si manquants).
2. Centraliser la couleur du placeholder sur un token (ex. `text-muted` + `opacity`) et utiliser `useColorScheme` uniquement si besoin.
3. Vérifier les états `error`/`disabled` : créer des classes sémantiques (`border-destructive`, `opacity-50`, etc.).
4. Supprimer l’import `COLORS`.

## Vérifications
- S’assurer que le champ adopte automatiquement les bonnes couleurs en Light/Dark et que l’état d’erreur utilise `border-destructive`.
