# 🎯 Plan en 3 Étapes - Finalisation UI Revision

**Date :** 2025-10-30  
**Progression actuelle :** 4/41 fichiers migrés (10%)

---

## ⚡️ Synthèse rapide
- ✅ Fait dans cette branche : `CustomInput`, `PrimaryButton`, `Checkbox`, `RadioButton`, nouvelle doc dark mode et helper `themeColors`.
- ⚠️ Bloquant immédiat : `constants/classNames.ts` n'exporte plus `COLORS` alors que 8 composants l'utilisent encore → migration partielle à terminer avant de merge.
- 🎯 Focus suivant : finir les composants UI de base (Typography, Card, Header, etc.), puis enchaîner sur les composants métier avant d'attaquer les écrans.

---

## 🧱 Étape 1 — Fondations (14 fichiers)
**Objectif :** stabiliser les tokens et migrer toutes les briques UI partagées.

### ✅ Composants déjà migrés
- [x] `components/ui/CustomInput.tsx` — classes `bg-input`, placeholders dynamiques, état erreur `border-destructive`.
- [x] `components/ui/PrimaryButton.tsx` — variantes alignées sur les tokens + spinner via `themeColors`.
- [x] `components/ui/Checkbox.tsx` — fond/bordure sur tokens, icône via `themeColors`.
- [x] `components/ui/RadioButton.tsx` — bordures + label sur tokens Tailwind.

### 🚧 À finaliser en priorité
- [ ] `constants/classNames.ts` — terminer la migration : mettre à jour tous les appels `COLORS` restants ou apporter un fallback temporaire.
- [ ] `components/ui/Typography.tsx` — remplacer `text-foreground-secondary` inexistant par `text-muted-foreground dark:text-muted-dark-foreground`.
- [ ] `components/ui/Card.tsx` — utiliser `bg-card` / `bg-surface` et `border-border dark:border-border-dark`.
- [ ] `components/ui/Divider.tsx` — `bg-border` et texte `text-muted-foreground`.
- [ ] `components/ui/Logo.tsx` — basculer les couleurs sur `text-primary` / `text-foreground`.
- [ ] `components/ui/Header.tsx` — harmoniser les textes (`text-foreground`), icônes Ionicons via `themeColors`, background tokenisé.
- [ ] `components/ui/PasswordInput.tsx` — réutiliser `themeColors` pour l’icône œil et déléguer aux tokens.
- [ ] `components/ui/SocialButton.tsx` — remplacer `bg-field-light` + `border-gray-200` par `bg-secondary` / `border-border`.
- [ ] `components/ui/TextLink.tsx` — texte support `text-muted-foreground`, lien `text-primary`.
- [ ] `components/ui/Alert.tsx` — décliner les variantes (`success`, `warning`, `destructive`, `info`) sur les nouveaux tokens.

### ✅ Critères de validation
- [ ] Plus aucune importation de `COLORS`.
- [ ] Les variantes light/dark utilisent systématiquement les classes `dark:`.
- [ ] Tests visuels Light + Dark sur chaque composant UI.

---

## 🏗️ Étape 2 — Composants métier (21 fichiers)
**Objectif :** appliquer les tokens aux composants fonctionnels de l'app (navigation, restaurant, recherche, filtres, settings, adresses).  
**Statut actuel :** 0/21 migrés.

### A. Navigation & Layout
- [ ] `components/Header.tsx` — StatusBar + background sur tokens, textes `text-foreground`.
- [ ] `components/PageHeader.tsx` — titre via `Typography`, puce `bg-secondary`.
- [ ] `components/BottomNavigation.tsx` — états actif/inactif avec `text-primary` / `text-muted-foreground`.

### B. Restaurant Features
- [ ] `components/RestaurantCard.tsx` — badges favoris + temps avec tokens, suppression des hex.
- [ ] `components/RestaurantGrid.tsx` — wrapper sur `bg-background`.
- [ ] `components/CategoryList/CategoryItem.tsx` — sélection via `bg-primary`, textes via `text-foreground`.

### C. Search
- [ ] `components/SearchBar.tsx` — input tokens + placeholders dynamiques.
- [ ] `components/Search/SearchHeader.tsx` — header + StatusBar sur tokens.
- [ ] `components/Search/SearchSuggestions.tsx` — listes et badges en tokens.
- [ ] `components/Search/EmptyStates.tsx` & `NoResultsState.tsx` — textes `text-muted-foreground`, icônes dynamiques.

### D. Filters & Modals
- [ ] `components/FilterDrawer.tsx` — overlay + drawer `bg-card`, boutons `PrimaryButton`.
- [ ] `components/Header/AddressBottomSheet.tsx` — surfaces `bg-surface`, textes `text-foreground`.
- [ ] `components/Header/LocationSelector.tsx` — états sélectionnés via `border-primary`.

### E. Settings
- [ ] `components/DarkModeToggle.tsx` — switch tokens + `themeColors`.
- [ ] `components/LanguageSelector.tsx` — bordures / textes via tokens.
- [ ] `components/SettingsItem.tsx` — texte `text-foreground`, icônes dynamiques.

### F. Addresses
- [ ] `components/addresses/AddressCard.tsx` — cartes `bg-card`, badges `text-muted-foreground`.
- [ ] `components/addresses/AddressEmptyState.tsx` — textes `text-muted-foreground`.
- [ ] `components/addresses/AddressForm.tsx` — inputs déjà migrés à vérifier.
- [ ] `components/addresses/LocationButton.tsx` — bouton `bg-secondary` + icône `themeColors`.
- [ ] Autres composants addresses éventuels — alignés sur tokens.

### ✅ Critères de validation
- [ ] Aucune couleur hexadécimale restante.
- [ ] `ActivityIndicator`, `StatusBar`, `RefreshControl` utilisent `themeColors`.
- [ ] Tests Light/Dark sur chaque composant métier.

---

## 📱 Étape 3 — Assemblage (6 écrans)
**Objectif :** intégrer les nouveaux composants sur les écrans principaux une fois toutes les briques migrées.  
**Statut actuel :** 0/6 migrés.

- [ ] `app/(tabs)/home.tsx` — RefreshControl + ActivityIndicator `themeColors`, vérifier enfants migrés.
- [ ] `app/(tabs)/search.tsx` — header, suggestions, empty states sur tokens.
- [ ] `app/(tabs)/profile.tsx` — `SettingsItem`, `DarkModeToggle`, `LanguageSelector`.
- [ ] `app/addresses/index.tsx` — liste, empty state, modals alignés.
- [ ] `app/(auth)/sign-in.tsx` & `sign-up.tsx` — UI complète basée sur composants migrés.
- [ ] `app/order/offer-chart.tsx` — graphes + StatusBar.

### ✅ Critères de validation
- [ ] Tests Light/Dark sur chaque écran.
- [ ] RefreshControl/ActivityIndicator utilisent `themeColors`.
- [ ] Aucun warning couleur en console.

---

## 📊 Récapitulatif

| Étape | Total | Migrés | Restant |
|-------|-------|--------|---------|
| Fondations (Étape 1) | 14 | 4 | 10 |
| Composants métier (Étape 2) | 21 | 0 | 21 |
| Écrans (Étape 3) | 6 | 0 | 6 |
| **TOTAL** | **41** | **4** | **37** |

*(Le total inclut `constants/classNames.ts` et les 40 composants/écrans listés.)*

---

## ✅ Checklist finale
- [ ] 0 import `COLORS`.
- [ ] Tokens Tailwind utilisés partout (`bg-*`, `text-*`, `border-*`).
- [ ] `themeColors` consommé dès qu’un hex est nécessaire.
- [ ] Tests Light/Dark réalisés sur chaque composant + écran.
- [ ] Documentation maintenue à jour.
- [ ] Commits structurés par étape.

---

## 🚀 Prochaines actions suggérées
1. Terminer la migration des composants UI de base (`Typography`, `Card`, `Header`, etc.) et corriger les imports `COLORS`.
2. Chaîner sur les composants métier en commençant par Navigation + Restaurant pour sécuriser les écrans Home/Search.
3. Finaliser par les écrans avec tests complets Light/Dark avant merge.
