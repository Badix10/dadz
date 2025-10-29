## Objectif
- Faire en sorte que `Divider` repose sur les utilitaires Tailwind existants.

## Problèmes actuels
- `bg-field-light dark:bg-field-dark` et `text-subtext-light` n’existent pas.
- Couleurs du texte non alignées sur `foreground`/`muted`.

## Plan d’action
1. Remplacer les classes de ligne par `bg-border` et `dark:bg-border-dark`.
2. Utiliser `text-muted`/`dark:text-muted-dark` pour le texte central.
3. Prévoir un fallback via `cn` pour permettre la surcharge depuis l’extérieur.

## Vérifications
- Vérifier le rendu en Light/Dark et la continuité avec les autres séparateurs.
