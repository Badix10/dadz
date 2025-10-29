## Objectif
- S’assurer que `LanguageSelector` exploite les tokens Tailwind et les nouvelles bases communes.

## Problèmes actuels
- Classes `bg-field-light`, `text-text-primary` inexistantes.
- Couleurs conditionnelles codées en dur (`text-black`).

## Plan d’action
1. Remplacer les backgrounds par `bg-surface`/`dark:bg-surface-dark` et `bg-primary` pour l’état actif.
2. Utiliser `text-foreground`, `text-primary-foreground` et variantes `dark:` pour le texte.
3. Harmoniser la couleur de l’icône drapeau si nécessaire (probablement inchangé).
4. Vérifier que la bordure reflète `border-border`.

## Vérifications
- Test en Light/Dark + changement de langue pour valider les états actifs/inactifs.
