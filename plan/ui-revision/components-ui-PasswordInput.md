## Objectif
- Harmoniser `PasswordInput` avec les couleurs Tailwind et les ajustements prévus pour `CustomInput`.

## Problèmes actuels
- Utilise `Ionicons` avec une couleur hex (`#9E9047`) non reliée aux tokens.
- Dépend indirectement des classes obsolètes de `CustomInput`.

## Plan d’action
1. Après la refonte de `CustomInput`, vérifier que `PasswordInput` n’a plus besoin d’override couleur ; sinon appliquer un token (ex. `text-muted-dark`).
2. Remplacer la couleur de l’icône par `text-foreground-secondary` + `dark:text-foreground-dark-secondary`.
3. Confirmer que l’accessibilité (contraste) est suffisante dans les deux modes.

## Vérifications
- Contrôler visuellement les icônes en Light/Dark.
- S’assurer que l’import `CustomInput` reste valide après refactor.
