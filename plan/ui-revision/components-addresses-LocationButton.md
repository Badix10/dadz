## Objectif
- Harmoniser `LocationButton` avec les tokens Tailwind.

## Problèmes actuels
- ActivityIndicator et icônes utilisent `#3B82F6`, `#9CA3AF` (bleu hors palette définie).
- Fond `bg-blue-50`/`bg-blue-900/20` qui n’existent pas dans la charte.

## Plan d’action
1. Déterminer les couleurs sémantiques à utiliser (ex. `info`, `muted`) dans `tailwind.config.js`.
2. Remplacer les backgrounds/texte par les classes associées (`bg-info/10`, `text-info`).
3. Ajuster `ActivityIndicator` pour utiliser `info` ou `primary`.

## Vérifications
- Tester le bouton en Light/Dark avec les différents états (`loading`, `disabled` si applicable).
