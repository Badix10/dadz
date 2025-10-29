## Objectif
- Mettre `AddressForm` en conformité avec les composants `CustomInput` refactorés et les tokens Tailwind.

## Problèmes actuels
- Fond `bg-background-light`, border `border-gray-200`, texte `#000`.
- `Switch` configurée avec `trackColor`/`thumbColor` hex.

## Plan d’action
1. Après la mise à jour de `CustomInput`, retirer les classes personnalisées et s’appuyer sur la surface/card standard.
2. Remplacer les wrappers `View` par `bg-surface`, `border-border`.
3. Définir un helper pour la `Switch` afin d’utiliser `primary`/`muted` plutôt que des hex.
4. Vérifier que les messages d’erreur utilisent `text-destructive`.

## Vérifications
- Ouvrir la modale d’adresse en Light/Dark, valider les états du formulaire.
