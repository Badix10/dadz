## Objectif
- Refaire la palette de `SocialButton` pour refléter les tokens Tailwind et supprimer les classes orphelines.

## Problèmes actuels
- Utilise `bg-field-light`, `border-gray-200`, `text-text-primary` inexistants.
- Couleur d’icône Ionicons en hex (`#9CA3AF`).

## Plan d’action
1. Remplacer les classes de fond/bordure par les tokens (`bg-surface`, `dark:bg-surface-dark`, `border-border`, etc.).
2. Appliquer des classes textuelles cohérentes (`text-foreground`, `dark:text-foreground-dark`).
3. Définir une classe utilitaire pour l’icône (ex. `text-muted`) et l’utiliser via `className`/`color`.
4. Vérifier l’état `disabled` (opacity) reste fonctionnel.

## Vérifications
- Visualiser en Light/Dark.
- S’assurer que les images Ionicons restent contrastées dans les deux modes.
