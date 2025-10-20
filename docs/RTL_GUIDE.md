# Guide d'utilisation du RTL Dynamique

## 🎯 Objectif
Ce système permet de changer la langue (y compris l'arabe RTL) **instantanément sans recharger l'application**.

## ✨ Avantages
- ✅ Changement de langue instantané (FR ↔ EN ↔ AR)
- ✅ Pas de rechargement nécessaire
- ✅ Meilleure expérience utilisateur (UX)
- ✅ Pattern utilisé par les grandes apps (Facebook, Twitter, etc.)
- ✅ **Tout centralisé dans un seul hook** (KISS, DRY)

## 🔧 Comment utiliser

### 1. Hook `useTranslation()`

Tout est centralisé dans le hook `useTranslation` :

```tsx
import { useTranslation } from '@/hooks';

const MyComponent = () => {
  const { t, isRTL, flexDirection, language, changeLanguage } = useTranslation();

  return (
    <View style={{ flexDirection: flexDirection('row') }}>
      <Text style={{ textAlign: isRTL ? 'right' : 'left' }}>
        {t('home:title')}
      </Text>
      <Button onPress={() => changeLanguage('ar')}>العربية</Button>
    </View>
  );
};
```

### 2. Propriétés disponibles

```tsx
const {
  // Traductions
  t,                // Fonction de traduction
  i18n,             // Instance i18next

  // Langue
  language,         // Langue actuelle ('fr' | 'en' | 'ar')
  changeLanguage,   // Fonction pour changer de langue

  // RTL
  isRTL,            // Boolean - true si langue RTL (arabe)
  flexDirection,    // Helper pour inverser flex-direction
} = useTranslation();

// Utilisation du helper flexDirection
flexDirection('row')          // → 'row' en LTR, 'row-reverse' en RTL
flexDirection('row-reverse')  // → 'row-reverse' en LTR, 'row' en RTL
flexDirection('column')       // → 'column' (pas d'inversion)
```

### 3. Exemples pratiques

#### Exemple 1 : Flex Row avec RTL
```tsx
// ❌ AVANT (ne supporte pas RTL)
<View className="flex-row items-center gap-2">
  <Icon name="user" />
  <Text>Username</Text>
</View>

// ✅ APRÈS (supporte RTL dynamique)
const { flexDirection } = useTranslation();

<View
  className="items-center gap-2"
  style={{ flexDirection: flexDirection('row') }}
>
  <Icon name="user" />
  <Text>Username</Text>
</View>
```

#### Exemple 2 : Text Alignment
```tsx
// ❌ AVANT
<Text className="text-left">Hello</Text>

// ✅ APRÈS
const { isRTL, t } = useTranslation();

<Text style={{ textAlign: isRTL ? 'right' : 'left' }}>
  {t('common:hello')}
</Text>
```

#### Exemple 3 : Positionnement absolu
```tsx
// ❌ AVANT
<View className="absolute right-2" />

// ✅ APRÈS
const { isRTL } = useTranslation();

<View
  className="absolute"
  style={isRTL ? { left: 8 } : { right: 8 }}
/>
```

#### Exemple 4 : Marges conditionnelles
```tsx
// ❌ AVANT
<View style={{ marginLeft: 16 }} />

// ✅ APRÈS
const { isRTL } = useTranslation();

<View style={{
  marginLeft: isRTL ? 0 : 16,
  marginRight: isRTL ? 16 : 0,
}} />
```

#### Exemple 5 : Composant complet avec traductions + RTL
```tsx
import { useTranslation } from '@/hooks';

const ProfileCard = () => {
  const { t, isRTL, flexDirection } = useTranslation();

  return (
    <View style={{ flexDirection: flexDirection('row') }}>
      <Avatar />
      <View>
        <Text style={{ textAlign: isRTL ? 'right' : 'left' }}>
          {t('profile:name')}
        </Text>
        <Text style={{ textAlign: isRTL ? 'right' : 'left' }}>
          {t('profile:email')}
        </Text>
      </View>
    </View>
  );
};
```

## 📋 Composants à mettre à jour

Quand vous créez ou modifiez un composant, vérifiez ces points :

### ✅ Checklist RTL

- [ ] Les `flex-row` utilisent `flexDirection()` du hook
- [ ] Les alignements de texte sont conditionnels (`isRTL`)
- [ ] Les positions absolues utilisent `start`/`end` au lieu de `left`/`right`
- [ ] Les marges/paddings directionnelles sont inversées
- [ ] Les icônes directionnelles sont inversées si nécessaire
- [ ] Les badges de notification sont positionnés correctement

## 🎨 Pattern de refactoring

Pour refactoriser un composant existant :

1. **Importer le hook (un seul import)**
   ```tsx
   import { useTranslation } from '@/hooks';
   ```

2. **Utiliser le hook (tout est dedans)**
   ```tsx
   const { t, isRTL, flexDirection, language, changeLanguage } = useTranslation();
   ```

3. **Remplacer les `flex-row` hardcodées**
   ```tsx
   // Avant: className="flex-row"
   // Après: style={{ flexDirection: flexDirection('row') }}
   ```

4. **Ajuster les alignements de texte**
   ```tsx
   // Ajouter: style={{ textAlign: isRTL ? 'right' : 'left' }}
   ```

5. **Ajuster les positions absolues**
   ```tsx
   // Avant: style={{ right: 4 }}
   // Après: style={isRTL ? { left: 4 } : { right: 4 }}
   ```

## 🚀 Exemple complet : Header

Voir `components/Header/Header.tsx` pour un exemple complet d'implémentation.

## 🔍 Debugging

Pour vérifier que le RTL fonctionne :

1. Changez la langue en arabe dans le sélecteur de langue
2. L'interface devrait s'inverser **instantanément**
3. Vérifiez que les traductions changent aussi instantanément
4. Testez FR ↔ EN ↔ AR sans rechargement

## ⚠️ Notes importantes

- **Pas de rechargement nécessaire** : Le système applique le RTL dynamiquement
- **Compatible avec NativeWind** : Vous pouvez mixer `className` et `style`
- **Performance** : Optimisé avec `useMemo` pour éviter les re-calculs
- **Production ready** : Utilise `react-i18next` (standard de l'industrie)
- **Simple** : Un seul hook pour tout (KISS)

## 📚 Ressources

- Hook principal : `hooks/useTranslation.ts` (tout est dedans)
- Context : `contexts/LocalizationContext.tsx` (simple provider)
- Exemple : `components/Header/Header.tsx`
- Rapport d'optimisation : `docs/I18N_OPTIMIZATION_REPORT.md`
