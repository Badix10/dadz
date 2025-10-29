## Objectif
- Remplacer les classes orphelines de `PageHeader` par les utilitaires Tailwind issus des tokens.

## Problèmes actuels
- `bg-field-light dark:bg-field-dark` et `text-subtext-light` inexistants.
- Texte principal utilise `text-text-primary` inexistant.

## Plan d’action
1. Choisir le couple de tokens adéquats (`bg-card`, `dark:bg-card-dark`, `text-foreground`, `text-muted`).
2. Remplacer les classes et supprimer toute référence à des noms personnalisés.
3. Vérifier que les marges/paddings restent identiques après mise à jour.

## Vérifications
- Contrôle visuel sur les écrans `Profile`, `Order`, `Chart`, `Offer` (utilisateurs du composant).
