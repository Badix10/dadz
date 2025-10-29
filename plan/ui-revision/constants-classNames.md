## Objectif
- Aligner `constants/classNames.ts` sur la palette définie dans `tailwind.config.js` pour éviter les couleurs codées en dur et les classes inexistantes.

## Problèmes actuels
- Palette obsolète (noir/blanc/#FFD100) ne correspondant plus aux tokens Tailwind (`background`, `foreground`, `surface`, etc.).
- Classes composites comme `bg-[#F2F2F2]` ou `text-white` qui contournent la configuration Dark/Light.
- Les composants qui importent `COLORS` héritent donc d’un thème incohérent.

## Plan d’action
1. Remplacer la structure `COLORS`, `LAYOUTS`, `COMPONENTS` par des références aux utilitaires Tailwind existants (`bg-background`, `text-foreground`, `bg-card`, etc.).
2. Introduire les variantes `light`/`dark` via les classes `dark:` plutôt que des hexadécimaux.
3. Mettre à jour ou supprimer les entrées qui n’ont plus de sens (ex. `badge`/`button` si elles dupliquent déjà Tailwind).
4. Exporter seulement les helpers nécessaires (éventuellement `combineClasses`) pour pousser l’usage direct des classes Tailwind.
5. Ajuster tous les imports dépendants (voir plans spécifiques) après refactor.

## Vérifications
- Importer un composant clé (ex. `CustomInput`) et vérifier que les classes proviennent bien des tokens Tailwind.
- Contrôler en Light/Dark mode que la palette correspond à celle attendue.
