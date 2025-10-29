## Objectif
- Adapter `SettingsItem` aux tokens Tailwind et réduire les hex inline.

## Problèmes actuels
- Utilise `bg-background-light`, `text-text-primary`, `text-text-secondary` inexistants.
- Icône `Ionicons` colorisée via `isDark ? '#FFFFFF' : '#1A1A1A'`.

## Plan d’action
1. Remplacer les classes par `bg-surface`, `text-foreground`, `text-muted` et les variantes `dark:`.
2. Utiliser les tokens `primary`, `muted`, `foreground` pour les icônes et textes.
3. S’assurer que l’option `rightElement` reste compatible (ex. `DarkModeToggle`).

## Vérifications
- Vérifier la section paramètres dans l’écran Profile (Light/Dark).
