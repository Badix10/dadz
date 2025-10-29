## Objectif
- Mettre `docs/DARK_MODE_GUIDE.md` à jour pour refléter la configuration Tailwind actuelle.

## Problèmes actuels
- Le guide mentionne d’anciens tokens (`surface.secondary`, `foreground.secondary`, etc.) qui ne correspondent plus au fichier `tailwind.config.js`.
- Risque de confusion pour les développeurs qui se basent sur cette documentation.

## Plan d’action
1. Actualiser les sections “Design Tokens” et “Exemples” avec la structure réelle (`background`, `foreground`, `card`, etc.).
2. Documenter l’usage recommandé (privilégier les classes Tailwind vs `constants/classNames`).
3. Ajouter une note sur la nouvelle organisation (`plan/ui-revision`) et la stratégie de migration.

## Vérifications
- Relecture pour assurer cohérence entre doc et code + vérifier que les snippets compilent avec Tailwind.
