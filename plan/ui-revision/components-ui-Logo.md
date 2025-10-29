## Objectif
- Vérifier que le composant `Logo` reste cohérent avec la définition du token `primary`.

## Problèmes actuels
- Icône colorée en `white` alors que `primary.foreground` est `#000000` dans la config actuelle.
- Pas de support direct `dark:` si l’on veut varier la couleur de fond.

## Plan d’action
1. Analyser si `primary` doit toujours être jaune (cas marketing). Si oui, prévoir `primary-foreground` dans Tailwind pour appliquer la bonne couleur d’icône.
2. Remplacer `color="white"` par le token correspondant (`text-primary-foreground` via style).
3. Documenter si le logo doit changer entre Light/Dark.

## Vérifications
- Rendu du logo sur fond clair/sombre et contraste de l’icône.
