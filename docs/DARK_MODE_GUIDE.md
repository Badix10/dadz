# 🌓 Guide Dark Mode - Application Food Delivery

## 📋 Table des Matières
- [Architecture](#architecture)
- [Design Tokens](#design-tokens)
- [Composants](#composants)
- [Migration des Écrans](#migration-des-écrans)
- [Exemples](#exemples)
- [Principes Appliqués](#principes-appliqués)

---

## 🏗️ Architecture

### Structure
```
├── tailwind.config.js          # Design tokens (couleurs sémantiques)
├── constants/
│   └── classNames.ts           # Classes réutilisables (DRY)
├── utils/
│   └── cn.ts                   # Helper pour merger les classes
├── contexts/
│   └── ColorSchemeProvider.tsx # Persistence du dark mode
└── components/ui/
    ├── Surface.tsx             # Wrapper pour surfaces
    └── Typography.tsx          # Wrapper pour texte
```

---

## 🎨 Design Tokens

### Couleurs Sémantiques (tailwind.config.js)

```javascript
colors: {
  // Surfaces (arrière-plans)
  surface: {
    DEFAULT: '#FFFFFF',        // Light mode
    secondary: '#F8F8F5',      // Light mode alternative
    dark: '#1A1A1A',           // Dark mode
    'dark-secondary': '#2D2D2D' // Dark mode alternative
  },

  // Texte
  foreground: {
    DEFAULT: '#1A1A1A',        // Light mode principal
    secondary: '#6B7280',      // Light mode secondaire
    tertiary: '#9CA3AF',       // Light mode tertiaire
    dark: '#FFFFFF',           // Dark mode principal
    'dark-secondary': '#E5E5E5', // Dark mode secondaire
    'dark-tertiary': '#A1A1A1'   // Dark mode tertiaire
  },

  // Bordures
  border: {
    DEFAULT: '#E5E7EB',
    dark: '#374151'
  },

  // Inputs
  input: {
    DEFAULT: '#F4F2E6',
    dark: '#2D291A'
  }
}
```

### Usage Direct (Tailwind)
```tsx
// ✅ Automatic dark mode avec classes Tailwind
<View className="bg-surface dark:bg-surface-dark">
  <Text className="text-foreground dark:text-foreground-dark">
    Hello
  </Text>
</View>
```

---

## 🧩 Composants

### 1. Surface

**Wrapper pour les conteneurs avec dark mode automatique**

```tsx
import { Surface } from '@/components/ui';

// Variants disponibles
<Surface variant="primary">   {/* Surface principale */}
<Surface variant="secondary"> {/* Surface alternative */}
<Surface variant="card">      {/* Carte avec ombre */}

// Exemple complet
<Surface variant="card" className="p-4">
  <Text>Content</Text>
</Surface>
```

### 2. Typography

**Wrapper pour le texte avec dark mode automatique**

```tsx
import { Typography } from '@/components/ui';

// Variants disponibles
<Typography variant="primary">   {/* Texte principal */}
<Typography variant="secondary"> {/* Texte secondaire */}
<Typography variant="tertiary">  {/* Texte tertiaire */}

// Exemple complet
<Typography variant="primary" className="font-bold text-xl">
  Title
</Typography>
<Typography variant="secondary">
  Subtitle
</Typography>
```

### 3. Classes Réutilisables (COLORS)

**Import depuis constants/classNames.ts**

```tsx
import { COLORS, LAYOUTS } from '@/constants/classNames';

// Surfaces
<View className={COLORS.surface.primary}>
<View className={COLORS.surface.card}>

// Texte
<Text className={COLORS.text.primary}>
<Text className={COLORS.text.secondary}>

// Bordures
<View className={`border ${COLORS.border.default}`}>

// Inputs
<TextInput className={COLORS.input.background}>

// Layouts prédéfinis
<View className={LAYOUTS.screen}>      {/* flex-1 + surface */}
<View className={LAYOUTS.card}>        {/* card avec ombre */}
<View className={LAYOUTS.section}>     {/* px-4 mb-6 */}
```

---

## 🔄 Migration des Écrans

### Template de Migration

```tsx
import { Surface, Typography } from '@/components/ui';
import { COLORS, LAYOUTS } from '@/constants/classNames';
import { useColorScheme } from 'nativewind';

export default function MyScreen() {
  // 1. Hook pour détecter le mode
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1">
      {/* 2. StatusBar dynamique */}
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* 3. Surface principale */}
      <Surface variant="primary" className="flex-1">

        {/* 4. Cartes avec Surface */}
        <Surface variant="card" className="p-4 m-4">
          <Typography variant="primary" className="font-bold text-xl">
            Title
          </Typography>
          <Typography variant="secondary">
            Subtitle
          </Typography>
        </Surface>

      </Surface>
    </SafeAreaView>
  );
}
```

### Checklist de Migration

- [ ] Import `useColorScheme` de NativeWind
- [ ] Ajouter `const { colorScheme } = useColorScheme(); const isDark = colorScheme === 'dark';`
- [ ] Mettre à jour `StatusBar` : `barStyle={isDark ? "light-content" : "dark-content"}`
- [ ] Remplacer `bg-white` par `Surface variant="primary"` ou `COLORS.surface.primary`
- [ ] Remplacer textes par `Typography` ou `COLORS.text.primary`
- [ ] Mettre à jour les icônes: `color={isDark ? '#FFFFFF' : '#000000'}`
- [ ] Tester en mode light ET dark

---

## 💡 Exemples

### Exemple 1: Card Simple

**Avant ❌**
```tsx
<View className="bg-white rounded-2xl p-4 shadow-soft">
  <Text className="text-black font-bold text-xl">Title</Text>
  <Text className="text-gray-500">Subtitle</Text>
</View>
```

**Après ✅ (Option 1: Composants)**
```tsx
<Surface variant="card" className="p-4">
  <Typography variant="primary" className="font-bold text-xl">
    Title
  </Typography>
  <Typography variant="secondary">
    Subtitle
  </Typography>
</Surface>
```

**Après ✅ (Option 2: Classes)**
```tsx
<View className={`${LAYOUTS.card} p-4`}>
  <Text className={`${COLORS.text.primary} font-bold text-xl`}>
    Title
  </Text>
  <Text className={COLORS.text.secondary}>
    Subtitle
  </Text>
</View>
```

**Après ✅ (Option 3: Tailwind direct)**
```tsx
<View className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-soft">
  <Text className="text-foreground dark:text-foreground-dark font-bold text-xl">
    Title
  </Text>
  <Text className="text-foreground-secondary dark:text-foreground-dark-secondary">
    Subtitle
  </Text>
</View>
```

### Exemple 2: Input avec Dark Mode

```tsx
import { CustomInput } from '@/components/ui';

<CustomInput
  label="Email"
  placeholder="example@email.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
// ✅ Dark mode géré automatiquement !
```

### Exemple 3: Icônes avec Dark Mode

```tsx
import { useColorScheme } from 'nativewind';

const { colorScheme } = useColorScheme();
const isDark = colorScheme === 'dark';

<Ionicons
  name="home"
  size={24}
  color={isDark ? '#FFFFFF' : '#1A1A1A'}
/>
```

---

## ✅ Principes Appliqués

### 🔄 DRY (Don't Repeat Yourself)
- Design tokens centralisés dans `tailwind.config.js`
- Classes réutilisables dans `constants/classNames.ts`
- Composants `Surface` et `Typography` évitent la duplication

### 💋 KISS (Keep It Simple, Stupid)
- Architecture simple: Tailwind + NativeWind
- Hook natif `useColorScheme` (pas de custom context complexe)
- Wrappers simples sans over-engineering

### 🚫 YAGNI (You Aren't Gonna Need It)
- Seulement les variants nécessaires (primary, secondary, tertiary)
- Pas de features inutiles
- Progressive enhancement (migration au fur et à mesure)

### 🧹 Clean Code
- Noms explicites (`Surface`, `Typography`, `foreground`, `surface`)
- Responsabilités uniques
- Code auto-documenté
- Comments uniquement où nécessaire

---

## 📝 Notes

### Ordre de Migration Recommandé

1. ✅ **profile.tsx** (FAIT)
2. ✅ **home.tsx** (FAIT - exemple de référence)
3. **sign.tsx** (formulaires avec CustomInput)
4. **order.tsx**, **offer.tsx**, **chart.tsx**
5. Composants globaux (Header, BottomNavigation, RestaurantCard, etc.)

### Tips

1. **Préférer les composants** (`Surface`, `Typography`) pour la cohérence
2. **Utiliser COLORS** pour les patterns répétitifs
3. **Tailwind direct** pour les cas spécifiques
4. **Toujours tester** en light ET dark mode
5. **StatusBar** doit TOUJOURS être dynamique

---

## 🎯 Ressources

- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Design tokens: `tailwind.config.js`
- Constants: `constants/classNames.ts`
- Utils: `utils/cn.ts`

---

**Made with ❤️ following DRY, KISS, YAGNI & Clean Code**
