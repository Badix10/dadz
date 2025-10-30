# 🌓 Guide Dark Mode - Application Food Delivery

**Dernière mise à jour:** 2025-10-29
**Version:** 2.0 (Post UI Revision)

## 📋 Table des Matières
- [Architecture](#architecture)
- [Design Tokens](#design-tokens)
- [Usage Recommandé](#usage-recommandé)
- [Migration depuis l'ancien COLORS](#migration-depuis-lancien-colors)
- [Exemples Pratiques](#exemples-pratiques)
- [Principes Appliqués](#principes-appliqués)

---

## 🏗️ Architecture

### Structure Actuelle (Post-Refactor)
```
├── tailwind.config.js           # ✅ Source unique de vérité pour les couleurs
├── constants/
│   └── classNames.ts            # ✅ Helpers et patterns réutilisables (THEME_TOKENS)
├── lib/utils/
│   └── themeColors.ts           # ✅ Couleurs hex pour ActivityIndicator, StatusBar, etc.
├── contexts/
│   └── ColorSchemeProvider.tsx  # Persistence du dark mode
└── components/ui/
    ├── Surface.tsx              # Wrapper pour surfaces
    └── Typography.tsx           # Wrapper pour texte
```

### Changements depuis v1.0

**✅ Nouveau:**
- `lib/utils/themeColors.ts` - Helper pour composants non-className
- `constants/classNames.ts` refactorisé - `COLORS` obsolète supprimé, remplacé par `THEME_TOKENS`
- Tokens Tailwind enrichis (primary-foreground, destructive-foreground, etc.)

**❌ Supprimé:**
- `COLORS` object (obsolète) - Utilisait des hex hardcodés incohérents

---

## 🎨 Design Tokens

### Couleurs Sémantiques (tailwind.config.js)

```javascript
colors: {
  // ==================== CORE TOKENS ====================

  // Background (arrière-plan principal)
  background: {
    DEFAULT: '#fffaf1',      // Light mode - crème très clair
    dark: '#1e1e1e',         // Dark mode - noir doux
  },

  // Foreground (texte principal)
  foreground: {
    DEFAULT: '#2b2b2b',      // Light mode - gris très foncé
    dark: '#fffaf1',         // Dark mode - crème clair
  },

  // Card (cartes)
  card: {
    DEFAULT: '#fff5d6',      // Light mode - jaune très pâle
    foreground: '#333333',   // Light mode text
    dark: '#2a2a2a',         // Dark mode - gris foncé
    'dark-foreground': '#fffaf1', // Dark mode text
  },

  // Primary (couleur principale - JAUNE)
  primary: {
    DEFAULT: '#f9c500',      // Light mode - jaune vif
    foreground: '#000000',   // Texte noir sur jaune
    dark: '#ffcb05',         // Dark mode - jaune légèrement plus clair
    'dark-foreground': '#000000', // Dark mode text
  },

  // Destructive (erreur/suppression - ROUGE)
  destructive: {
    DEFAULT: '#e74c3c',      // Light mode - rouge
    foreground: '#ffffff',   // Texte blanc sur rouge
    dark: '#ff6246',         // Dark mode - rouge orangé
    'dark-foreground': '#ffffff', // Dark mode text
  },

  // Muted (couleurs atténuées)
  muted: {
    DEFAULT: '#f2e7c9',      // Light mode - beige pâle
    foreground: '#5a4a1b',   // Light mode text - brun
    dark: '#3a3a3a',         // Dark mode - gris moyen
    'dark-foreground': '#f0e6b3', // Dark mode text - beige clair
  },

  // ==================== STATUS COLORS ====================

  success: {
    DEFAULT: '#79b851',      // Vert
    foreground: '#ffffff',
  },

  error: {
    DEFAULT: '#e74c3c',
    foreground: '#ffffff',
  },

  warning: {
    DEFAULT: '#ff8c42',      // Orange
    foreground: '#ffffff',
  },

  // ==================== UI TOKENS ====================

  border: {
    DEFAULT: '#f4d36b',      // Light mode - jaune doré
    dark: '#f9c500',         // Dark mode - jaune vif
  },

  input: {
    DEFAULT: '#e8bf3a',      // Light mode - jaune moutarde
    dark: '#ffcb05',         // Dark mode - jaune vif
  },

  // Surface (backward compatibility)
  surface: {
    DEFAULT: '#fffaf1',      // = background light
    dark: '#1e1e1e',         // = background dark
  },
}
```

---

## 🎯 Usage Recommandé

### **Option 1: Tailwind Classes Directes** (Recommandé)

**Utiliser pour:** Tous les composants avec support `className`

```tsx
// ✅ BEST PRACTICE - Automatic dark mode
<View className="bg-background dark:bg-background-dark">
  <Text className="text-foreground dark:text-foreground-dark font-bold">
    Hello World
  </Text>
</View>

// Card
<View className="bg-card dark:bg-card-dark rounded-2xl shadow-md p-4">
  <Text className="text-card-foreground dark:text-card-dark-foreground">
    Card content
  </Text>
</View>

// Button
<TouchableOpacity className="bg-primary rounded-full px-6 py-4">
  <Text className="text-primary-foreground font-bold">
    Click Me
  </Text>
</TouchableOpacity>
```

### **Option 2: THEME_TOKENS** (Pour patterns répétitifs)

**Utiliser pour:** Patterns communs, éviter duplication

```tsx
import { THEME_TOKENS, LAYOUTS } from '@/constants/classNames';

// Screen avec background
<View className={THEME_TOKENS.background}>
  <Text className={THEME_TOKENS.text}>Content</Text>
</View>

// Layout patterns
<View className={LAYOUTS.screen}>  {/* flex-1 + bg */}
  <View className={LAYOUTS.card}>  {/* card styling */}
    <Text className={LAYOUTS.sectionTitle}>Title</Text>
  </View>
</View>
```

### **Option 3: themeColors Helper** (Pour composants sans className)

**Utiliser pour:** ActivityIndicator, StatusBar, RefreshControl, placeholderTextColor

```tsx
import { themeColors, useThemeColors } from '@/lib/utils/themeColors';

function MyComponent() {
  const { getPrimaryColor, isDark } = useThemeColors();

  return (
    <>
      {/* StatusBar */}
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* ActivityIndicator */}
      <ActivityIndicator color={getPrimaryColor()} />

      {/* RefreshControl */}
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={themeColors.primary}
        colors={[themeColors.primary]}
      />

      {/* TextInput placeholder */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? themeColors.mutedDark : themeColors.muted}
      />
    </>
  );
}
```

---

## 🔄 Migration depuis l'ancien COLORS

### ⚠️ Breaking Changes

L'objet `COLORS` a été **supprimé** de `constants/classNames.ts`.

### Tableau de Migration

| Ancien (COLORS) | Nouveau (Tailwind) |
|-----------------|-------------------|
| `COLORS.text.primary` | `text-foreground dark:text-foreground-dark` |
| `COLORS.text.secondary` | `text-muted-foreground dark:text-muted-dark-foreground` |
| `COLORS.surface.primary` | `bg-surface dark:bg-surface-dark` |
| `COLORS.surface.card` | `bg-card dark:bg-card-dark` |
| `COLORS.background.primary` | `bg-background dark:bg-background-dark` |
| `COLORS.input.background` | `bg-input dark:bg-input-dark` |
| `COLORS.border.default` | `border-border dark:border-border-dark` |
| `COLORS.accent.primary` | `text-primary` |
| `COLORS.accent.primaryBg` | `bg-primary` |
| `COLORS.status.success` | `text-success` |
| `COLORS.status.error` | `text-destructive` |
| `COLORS.status.warning` | `text-warning` |

### Exemples de Migration

**AVANT ❌**
```tsx
import { COLORS } from '@/constants/classNames';

<View className={COLORS.surface.primary}>
  <Text className={COLORS.text.primary}>Hello</Text>
</View>
```

**APRÈS ✅ (Option 1: Direct)**
```tsx
<View className="bg-background dark:bg-background-dark">
  <Text className="text-foreground dark:text-foreground-dark">Hello</Text>
</View>
```

**APRÈS ✅ (Option 2: THEME_TOKENS)**
```tsx
import { THEME_TOKENS } from '@/constants/classNames';

<View className={THEME_TOKENS.background}>
  <Text className={THEME_TOKENS.text}>Hello</Text>
</View>
```

---

## 💡 Exemples Pratiques

### Exemple 1: Restaurant Card

```tsx
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

export default function RestaurantCard({ restaurant }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity className="bg-card dark:bg-card-dark rounded-2xl shadow-md overflow-hidden">
      <Image source={{ uri: restaurant.image }} className="w-full h-40" />

      {/* Favorite button with surface bg */}
      <TouchableOpacity className="absolute top-2 right-2 bg-surface/80 dark:bg-surface-dark/80 rounded-full p-2">
        <Ionicons
          name="heart"
          size={20}
          color="#e74c3c"  // destructive color
        />
      </TouchableOpacity>

      <View className="p-4">
        <Text className="text-foreground dark:text-foreground-dark font-bold text-base">
          {restaurant.name}
        </Text>

        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="star" size={14} color="#f9c500" /> {/* primary color */}
          <Text className="text-foreground dark:text-foreground-dark font-semibold text-sm">
            {restaurant.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
```

### Exemple 2: FilterDrawer

```tsx
import { useThemeColors } from '@/lib/utils/themeColors';

export function FilterDrawer({ visible, onClose }) {
  const { isDark } = useThemeColors();

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Overlay */}
      <View className="flex-1 justify-end bg-black/60">

        {/* Drawer */}
        <View className="bg-background dark:bg-background-dark h-[85vh] rounded-t-[32px]">

          {/* Header */}
          <View className="flex-row items-center justify-between p-5">
            <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
              Filter your search
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={isDark ? '#fffaf1' : '#2b2b2b'} />
            </TouchableOpacity>
          </View>

          <View className="h-px bg-border dark:bg-border-dark" />

          {/* Filter chips */}
          <View className="flex-row flex-wrap gap-2 p-5">
            <TouchableOpacity className="px-4 py-2.5 rounded-full bg-muted dark:bg-muted-dark">
              <Text className="text-sm font-semibold text-foreground dark:text-foreground-dark">
                Option
              </Text>
            </TouchableOpacity>

            {/* Selected chip */}
            <TouchableOpacity className="px-4 py-2.5 rounded-full bg-primary">
              <Text className="text-sm font-semibold text-primary-foreground">
                Selected
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer buttons */}
          <View className="flex-row gap-3 p-5">
            <TouchableOpacity className="flex-1 h-14 items-center justify-center border-2 border-destructive rounded-full">
              <Text className="text-base font-bold text-destructive">Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 h-14 items-center justify-center bg-primary rounded-full">
              <Text className="text-base font-bold text-primary-foreground">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
```

### Exemple 3: Screen avec RefreshControl

```tsx
import { themeColors, useThemeColors } from '@/lib/utils/themeColors';

export default function HomeScreen() {
  const { getPrimaryColor, isDark } = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView
        className="flex-1 bg-background dark:bg-background-dark"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={getPrimaryColor()}
            colors={[themeColors.primary]}
          />
        }
      >
        {loading ? (
          <ActivityIndicator color={getPrimaryColor()} size="large" />
        ) : (
          <View className="p-4">
            <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
              Welcome
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
```

### Exemple 4: CustomInput (Component Pattern)

```tsx
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

export function CustomInput({ error, ...props }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View>
      <TextInput
        className={`
          bg-input dark:bg-input-dark
          text-foreground dark:text-foreground-dark
          rounded-xl px-4 py-3
          border-2
          ${error ? 'border-destructive' : 'border-border dark:border-border-dark'}
        `}
        placeholderTextColor={isDark ? themeColors.mutedDark : themeColors.muted}
        {...props}
      />
      {error && (
        <Text className="text-destructive text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
```

---

## 🔍 Checklist de Migration

### Pour chaque composant:

- [ ] **Importer hooks nécessaires**
  ```tsx
  import { useColorScheme } from 'nativewind';
  import { useThemeColors } from '@/lib/utils/themeColors';
  ```

- [ ] **Remplacer hardcoded colors**
  - `#FFD700` → `text-primary` ou `themeColors.primary`
  - `#1A1A1A` → `bg-background-dark` ou `themeColors.backgroundDark`
  - `#FFFFFF` → `text-foreground` ou `themeColors.foreground`
  - `#EF4444` → `text-destructive` ou `themeColors.destructive`

- [ ] **Utiliser dark: variants**
  ```tsx
  className="bg-card dark:bg-card-dark text-foreground dark:text-foreground-dark"
  ```

- [ ] **StatusBar dynamique**
  ```tsx
  <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
  ```

- [ ] **ActivityIndicator / RefreshControl**
  ```tsx
  <ActivityIndicator color={themeColors.primary} />
  <RefreshControl tintColor={themeColors.primary} colors={[themeColors.primary]} />
  ```

- [ ] **Tester en Light ET Dark mode**

---

## ✅ Principes Appliqués

### 🎯 Single Source of Truth
- **TOUT** vient de `tailwind.config.js`
- `classNames.ts` ne fait que mapper vers Tailwind
- `themeColors.ts` synchronisé avec tailwind.config.js

### 🔄 DRY (Don't Repeat Yourself)
- Design tokens centralisés
- `THEME_TOKENS` pour patterns communs
- `useThemeColors` hook réutilisable

### 💋 KISS (Keep It Simple, Stupid)
- Préférer Tailwind direct quand possible
- Helpers seulement pour cas edge (ActivityIndicator, etc.)
- Pas de sur-abstraction

### 🚫 YAGNI (You Aren't Gonna Need It)
- Seulement tokens utilisés dans l'app
- Pas de features spéculatives
- Progressive enhancement

### 🧹 Clean Code
- Noms sémantiques (`primary`, `destructive`, `muted`)
- Documentation inline
- Types TypeScript stricts

---

## 📚 Ressources

### Fichiers Clés
- **Tokens:** `tailwind.config.js`
- **Helpers:** `constants/classNames.ts`
- **Theme Colors:** `lib/utils/themeColors.ts`
- **Plan UI Revision:** `plan/ui-revision/` (42 composants)

### Documentation
- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Plan UI Revision](../plan/ui-revision/)

### Quick Reference

```tsx
// ✅ Prefer
className="bg-primary text-primary-foreground"

// ✅ OK for patterns
className={THEME_TOKENS.primary}

// ✅ Only when no className support
color={themeColors.primary}

// ❌ Never
color="#FFD700"
className="bg-[#FFD700]"
```

---

## ✅ Statut de la Migration (Mise à jour: 2025-10-30)

### Étapes Complétées

#### Étape 1: Déblocage de la migration ✅
- [x] Ajout de `mutedDarkForeground: '#f0e6b3'` dans `themeColors.ts`
- [x] Ajout des variantes success (light/dark) et error (light/dark)
- [x] Migration de `NoResultsState.tsx` (dernier composant utilisant l'ancien `COLORS`)
- [x] Suppression complète de tous les imports `@/constants/colors`
- [x] Synchronisation totale entre `tailwind.config.js` et `themeColors.ts`

#### Étape 2: Finalisation des composants métier ✅
- [x] **Navigation & Layout**: `BottomNavigation`, `Header`, `PageHeader` - couleurs adaptées au dark mode
- [x] **Recherche**: `SearchBar`, `SearchSuggestions`, `EmptySearchState`, `NoResultsState` - tokens unifiés
- [x] **Filtres/Settings/Adresses**: `FilterDrawer`, `LanguageSelector`, `SettingsItem`, `LocationButton` - vérifiés ✅
- [x] **Restaurant**: `RestaurantCard`, `RestaurantGrid`, `CategoryList` - aucune couleur hex hardcodée

#### Étape 3: Migration des écrans ✅
- [x] **Écran search**: Migration de `#FFD700` et `text-gray-500` vers tokens
- [x] **Écrans order/chart/offer**: Migration complète vers tokens (bg, text, icons)
- [x] **Écrans home/profile/addresses**: Vérifiés et alignés avec les nouveaux variants
- [x] **ActivityIndicator**: Tous adaptés au dark mode (`isDark ? primaryDark : primary`)
- [x] **RefreshControl**: Adaptation de `tintColor` et `colors` au dark mode
- [x] **StatusBar**: Tous les écrans utilisent `barStyle` dynamique (`isDark ? "light-content" : "dark-content"`)

#### Étape 4: QA & Documentation ✅
- [x] **Vérification complète**: 0 couleur hex hardcodée restante dans `components/` et `app/`
- [x] **Tests dark mode**: Tous les composants et écrans utilisent les tokens Tailwind
- [x] **Documentation**: Guide à jour avec exemples et bonnes pratiques

### Résumé des Changements

**Fichiers modifiés:**
- `lib/utils/themeColors.ts` - Ajout de 4 nouvelles variantes
- `components/Search/NoResultsState.tsx` - Migration complète
- `components/BottomNavigation/BottomNavigation.tsx` - Icônes adaptées au dark mode
- `app/search.tsx` - ActivityIndicator et textes migrés
- `app/(tabs)/home.tsx` - ActivityIndicator et RefreshControl adaptés
- `app/(tabs)/profile.tsx` - ActivityIndicator adapté
- `app/addresses/index.tsx` - ActivityIndicator adapté
- `app/(tabs)/order.tsx` - Migration complète
- `app/(tabs)/chart.tsx` - Migration complète
- `app/(tabs)/offer.tsx` - Migration complète

**Résultats:**
- ✅ 0 import de `@/constants/colors` restant
- ✅ 0 couleur hex hardcodée dans les composants/écrans
- ✅ Tous les composants système (ActivityIndicator, RefreshControl, StatusBar) adaptés
- ✅ 100% des tokens Tailwind utilisés de manière cohérente

---

**Made with ❤️ following DRY, KISS, YAGNI & Clean Code**
**Version 2.0 - Post UI Revision - Migration Complète ✅**
