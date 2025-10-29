## Objectif
- Assurer que `AddressEmptyState` utilise les tokens Tailwind pour texte et icônes.

## Problèmes actuels
- Texte `text-gray-500`, icônes `#9CA3AF`, boutons `bg-primary` mais sans `text-primary-foreground`.

## Plan d’action
1. Remplacer les textes par `text-muted`, `dark:text-muted-dark`.
2. Harmoniser le bouton CTA avec `PrimaryButton` ou `bg-primary` + `text-primary-foreground`.
3. Vérifier l’icône et le conteneur pour qu’ils utilisent `text-muted`.

## Vérifications
- Afficher l’état vide en Light/Dark (depuis AddressesScreen).
