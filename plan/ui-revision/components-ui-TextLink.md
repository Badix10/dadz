## Objectif
- Garantir que `TextLink` exploite les tokens de texte Tailwind existants.

## Problèmes actuels
- Classe `text-subtext-light` inconnue.
- Couleur du lien figée sur `text-primary` (non déclarée).

## Plan d’action
1. Remplacer le texte principal par `text-muted`/`dark:text-muted-dark`.
2. Utiliser `text-primary`/`dark:text-primary-dark` (ou autre token sémantique) pour le lien cliquable.
3. Ajouter les utilitaires manquants dans `tailwind.config.js` si besoin (ex. `primary-foreground`).

## Vérifications
- Vérifier le contraste Light/Dark et l’état focus/accessibilité.
