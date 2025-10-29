## Objectif
- Adapter `SearchBar` aux tokens Tailwind pour les couleurs de fond, icônes et placeholder.

## Problèmes actuels
- `bg-[#2A2A2A]`, `#9CA3AF`, `#6B7280` codés en dur.
- De nouvelles classes `COLORS` ne sont pas utilisées alors qu’elles devraient l’être.

## Plan d’action
1. Remplacer `inputBg`/`iconColor`/`placeholderColor` par des classes Tailwind (`bg-muted`, `dark:bg-muted-dark`, `text-muted`).
2. Utiliser `placeholderTextColor` basé sur les tokens (via `useColorScheme` si nécessaire ou en ajoutant `placeholder:text-muted` dans Tailwind).
3. Aligner le bouton filter sur `bg-primary` + `text-primary-foreground` et prévoir `dark:` si différent.
4. Supprimer l’import `COLORS` si devenu inutile.

## Vérifications
- Tester la SearchBar sur les écrans Home/Search (modes Light/Dark) et vérifier lisibilité + focus.
