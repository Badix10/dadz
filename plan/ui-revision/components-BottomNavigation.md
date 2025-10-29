## Objectif
- Actualiser `BottomNavigation` pour utiliser la palette Tailwind.

## Problèmes actuels
- Fond `bg-white` fixe, bordure `border-yellow-400`, icônes `#FFC700`/`#9CA3AF`.
- Aucun support `dark:` (barre reste blanche en Dark Mode).

## Plan d’action
1. Utiliser `bg-surface`/`dark:bg-surface-dark` pour l’arrière-plan et `border-border`.
2. Mapper les icônes sur `text-primary` pour l’onglet actif et `text-muted` pour les autres.
3. Définir `text-primary`/`text-primary-dark` dans le thème si nécessaire.
4. Vérifier que la barre conserve les coins arrondis et l’ombre existante.

## Vérifications
- Tester la navigation dans les deux modes, vérifier contraste des icônes et labels.
