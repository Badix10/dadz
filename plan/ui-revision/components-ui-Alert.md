## Objectif
- Reconnecter `Alert` aux couleurs sémantiques Tailwind pour les variantes `info/success/warning/danger`.

## Problèmes actuels
- Utilise des classes `bg-info-light`, `text-info-dark` inexistantes.
- Conversion `config.text.replace('text-', '')` casse la couleur des icônes (chaînes non valides).

## Plan d’action
1. Définir dans `tailwind.config.js` des couleurs sémantiques (`info`, `info-foreground`, etc.) ou réutiliser `primary`, `muted`, `destructive`.
2. Mettre à jour le mapping `variants` pour pointer vers ces classes réelles (ex. `bg-info/10`, `text-info`).
3. Remplacer la logique `replace` par un simple token pour `Ionicons` (`text-info` via `StyleSheet.compose` ou `className`).
4. Confirmer la compatibilité avec le Dark Mode (versions `dark:bg-info-dark` si besoin).

## Vérifications
- Tester chaque variante visuellement.
- Vérifier qu’aucune classe n’est rejetée par Tailwind lors du build (log Tailwind).
