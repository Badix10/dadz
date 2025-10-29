## Objectif
- Harmoniser `app/addresses/index.tsx` avec les nouvelles conventions de thème.

## Problèmes actuels
- Utilise des classes `bg-background-light`, `bg-white`, `dark:bg-surface-dark` mélangées à des hex (`#000000`, `#FFC700`).
- `AddressCard`, `AddressForm`, `AddressEmptyState` doivent être alignés (voir plans dédiés).
- ActivityIndicator et Switch avec couleurs codées en dur.

## Plan d’action
1. Appliquer les nouveaux tokens d’arrière-plan/fond (`bg-background`, `bg-card`, etc.) sur la page principale.
2. Remplacer les icônes/indicateurs par des couleurs tokens (`primary`, `muted`, `destructive`).
3. S’assurer que la modale de formulaire (via `AddressForm`) est cohérente avec son refactor.
4. Vérifier l’intégration de `AddressBottomSheet` une fois mise à jour.

## Vérifications
- Parcourir la page en Light/Dark, créer/éditer une adresse pour vérifier la constance.
