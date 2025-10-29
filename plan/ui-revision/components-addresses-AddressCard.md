## Objectif
- Refaire la palette de `AddressCard` en utilisant les tokens Tailwind.

## Problèmes actuels
- Mélange d’hex (`#FFC700`, `#6B7280`, `#EF4444`) et de classes `bg-white`/`dark:bg-surface-dark`.
- Boutons d’action avec couleurs codées en dur.

## Plan d’action
1. Remplacer les badges par des classes basées sur les tokens (`bg-primary/20`, `text-primary`, `text-destructive`).
2. Utiliser `text-foreground` et `text-muted` pour les textes.
3. Harmoniser les boutons Modifier/Supprimer/Par défaut avec les couleurs sémantiques (`text-primary`, `text-destructive`).
4. Vérifier que `getAddressTypeBadgeColor` renvoie désormais des tokens (refacto dans utils si nécessaire).

## Vérifications
- Afficher plusieurs cartes en Light/Dark pour valider badges et actions.
