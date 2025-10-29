## Objectif
- Mettre `Checkbox` au standard des tokens Tailwind et supprimer la dépendance à `COLORS`.

## Problèmes actuels
- Utilise `COLORS.input.background` et `COLORS.border.default` obsolètes.
- Couleur `Ionicons` fixée à `black`.

## Plan d’action
1. Remplacer le fond par `bg-surface`/`dark:bg-surface-dark` et la bordure par `border-border`.
2. Utiliser `bg-primary`/`text-primary-foreground` pour l’état coché.
3. Mettre l’icône `checkmark` en `text-primary-foreground` (couleur issue du thème).
4. Supprimer l’import `COLORS`.

## Vérifications
- Vérifier le contraste et l’état `disabled`.
- Tester l’affichage dans les deux modes.
