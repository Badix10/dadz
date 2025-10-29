## Objectif
- Synchroniser les variantes `Typography` avec les tokens `foreground` définis dans `tailwind.config.js`.

## Problèmes actuels
- Référence à `text-foreground-secondary`/`dark:text-foreground-dark-secondary` alors que les couleurs `foreground.dark`, `foreground.DEFAULT`, etc. sont structurées différemment.
- Risque que les classes générées soient ignorées par Tailwind (noms non existants).

## Plan d’action
1. Aligner les noms de classes sur la structure Tailwind (ex. `text-foreground`, `dark:text-foreground-dark`, `text-muted`, `dark:text-muted-dark`).
2. Vérifier et, si nécessaire, enrichir `tailwind.config.js` avec les variantes manquantes (`foreground-secondary`, etc.).
3. Documenter dans un commentaire les correspondances `variant -> token` pour faciliter la maintenance.

## Vérifications
- Utiliser Story/preview pour confirmer que chaque variant change réellement la couleur en Light/Dark.
