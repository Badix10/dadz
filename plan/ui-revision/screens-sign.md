## Objectif
- Réaligner l’écran `app/sign.tsx` sur les tokens Tailwind et les composants UI refactorés.

## Problèmes actuels
- Fond `bg-background-light` inexistant, texte `text-subtext-light`.
- Dépend fortement des anciens composants (`CustomInput`, `Divider`, `TextLink`) avec palette obsolète.
- Boutons/Alertes utilisent des couleurs codées en dur via leurs composants.

## Plan d’action
1. Après mise à jour des composants UI, remplacer les classes écran par `bg-background`/`dark:bg-background-dark`.
2. Vérifier tous les éléments textuels (titres, liens) pour qu’ils utilisent `Typography` ou les classes `text-foreground`.
3. Ajuster les spinners/couleurs Supabase (`ActivityIndicator`) avec le token primaire partagé.
4. Faire un passage d’accessibilité (contraste) après refonte.

## Vérifications
- Tester les deux onglets (login/signup) en Light/Dark.
- Vérifier l’affichage des alertes de succès/erreur.
