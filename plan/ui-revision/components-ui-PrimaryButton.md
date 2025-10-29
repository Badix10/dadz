## Objectif
- Aligner `PrimaryButton` sur les tokens Tailwind pour chaque variante et cohérence des états.

## Problèmes actuels
- Classes `bg-field-light`, `text-text-primary`, etc. inexistantes.
- Couleurs des états (`ActivityIndicator`, `outline`) codées en dur.

## Plan d’action
1. Définir un mapping `variants` utilisant les couleurs du thème (`bg-primary`, `bg-secondary`, `bg-surface`, `border-border`…).
2. Ajouter les utilitaires manquants dans `tailwind.config.js` si nécessaire (`field`, `text-primary`).
3. Harmoniser les couleurs du texte et spinner avec les tokens (`text-foreground`, `text-destructive`).
4. S’assurer que les classes appliquent aussi `dark:` lorsque nécessaire plutôt que d’injecter du JS.

## Vérifications
- Tester les variantes `primary`, `secondary`, `outline`, `danger` en Light/Dark.
- Vérifier l’état `loading` et `disabled`.
