## Objectif
- Mettre le composant `components/ui/Header.tsx` en conformité avec les tokens Tailwind.

## Problèmes actuels
- Utilise `text-text-light`/`text-text-primary` inexistants.
- Bouton retour sans gestion explicite du mode sombre.

## Plan d’action
1. Remplacer les classes par `text-foreground`/`dark:text-foreground-dark`.
2. Appliquer un thème cohérent au bouton back (`text-foreground`, `dark:text-foreground-dark` ou `text-muted`).
3. Vérifier l’intégration avec `Typography` si celui-ci est refactoré.

## Vérifications
- Rendu Light/Dark sur les écrans utilisant ce composant (ex. `app/search.tsx`).
