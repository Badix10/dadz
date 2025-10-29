## Objectif
- Connecter `DarkModeToggle` à la palette Tailwind plutôt qu’à des hex inline.

## Problèmes actuels
- Fond `#FFC700`/`#E5E7EB` codé en dur.
- Pas d’utilisation des tokens `primary`/`muted`.

## Plan d’action
1. Exposer les couleurs via `StyleSheet` utilisant les tokens (ex. `bg-primary`, `bg-muted`) ou ajouter des variables `theme` récupérées de Tailwind.
2. Conserver l’animation mais déléguer les couleurs à un mapping `light`/`dark` issu de la config (import JS si nécessaire).
3. Vérifier que le contraste du thumb est correct.

## Vérifications
- Cliquer sur le toggle en Light/Dark pour s’assurer que les couleurs restent cohérentes avec le reste du thème.
