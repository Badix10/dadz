## Objectif
- Réduire les couleurs codées en dur dans `LocationSelector` et adopter les tokens Tailwind.

## Problèmes actuels
- `Ionicons` avec `#FFC700`/`#FFFFFF`.
- Texte `text-gray-300`/`dark:text-gray-400` qui n’est peut-être pas aligné sur les tokens `muted`.

## Plan d’action
1. Utiliser `text-primary` ou `text-accent` du thème pour l’icône de localisation.
2. Appliquer `text-muted`/`dark:text-muted-dark` pour les sous-textes et `text-foreground` pour la ligne principale.
3. Vérifier la taille et le contraste du chevron.

## Vérifications
- Visualiser en Light/Dark et confirmer la cohérence avec le header parent.
