# 🧪 Guide de Testing

Ce dossier contient la documentation et les exemples pour les tests dans l'application Dadz.

## 📋 Table des matières

- [Installation](#installation)
- [Commandes](#commandes)
- [Structure](#structure)
- [Types de tests](#types-de-tests)
- [Exemples](#exemples)
- [Best Practices](#best-practices)

---

## Installation

Toutes les dépendances de test sont déjà installées :
- ✅ Jest - Test runner
- ✅ @testing-library/react-native - Pour tester les composants
- ✅ @testing-library/react-hooks - Pour tester les hooks
- ✅ MSW - Pour mocker les API calls
- ✅ @types/jest - Types TypeScript pour Jest

---

## Commandes

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch (re-run automatique)
npm run test:watch

# Lancer les tests avec couverture de code
npm run test:coverage

# Lancer les tests en mode CI (pour GitHub Actions, etc.)
npm run test:ci
```

---

## Structure

```
project/
├── lib/
│   └── services/
│       ├── restaurantService.ts
│       └── __tests__/
│           └── restaurantService.test.ts
├── hooks/
│   ├── useRestaurants.ts
│   └── __tests__/
│       └── useRestaurants.test.ts
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── __tests__/
│   │       └── Header.test.tsx
└── jest.config.js
└── jest.setup.js
```

**Convention :** Créer un dossier `__tests__` à côté du code testé.

---

## Types de tests

### 1. Tests Unitaires (Unit Tests)

**Quoi tester :** Fonctions pures, logique métier, calculs

**Exemple :**
```typescript
// lib/services/__tests__/example.test.ts
describe('calculateDeliveryFee', () => {
  it('should calculate fee correctly', () => {
    const result = calculateDeliveryFee(2.5, 0.5, 5);
    expect(result).toBe(5.0);
  });
});
```

### 2. Tests de Hooks

**Quoi tester :** Hooks React (useState, useEffect, custom hooks)

**Exemple :**
```typescript
// hooks/__tests__/useAddresses.test.ts
import { renderHook } from '@testing-library/react-hooks';

it('should return addresses', () => {
  const { result } = renderHook(() => useAddresses());
  expect(result.current.currentAddress).toBeDefined();
});
```

### 3. Tests de Composants

**Quoi tester :** Rendu, interactions utilisateur, props

**Exemple :**
```typescript
// components/__tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';

it('should call onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button onPress={onPress}>Click</Button>);

  fireEvent.press(getByText('Click'));
  expect(onPress).toHaveBeenCalled();
});
```

### 4. Tests d'Intégration

**Quoi tester :** Flux complets, interaction entre plusieurs composants/services

**Exemple :**
```typescript
it('should fetch restaurants and update UI', async () => {
  // Mock API response
  // Render component
  // Wait for data
  // Assert UI updated
});
```

---

## Exemples

### Tester un Service avec Supabase

```typescript
// lib/services/__tests__/restaurantService.test.ts
import { restaurantService } from '../restaurantService';
import { supabase } from '@/lib/supabase';

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('restaurantService', () => {
  it('should fetch restaurants', async () => {
    const mockData = [{ id: '1', name: 'Pizza Roma' }];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: mockData,
          error: null,
        }),
      }),
    });

    const result = await restaurantService.getRestaurants();
    expect(result).toEqual(mockData);
  });
});
```

### Tester un Hook avec React Query

```typescript
// hooks/__tests__/useRestaurants.test.tsx
import { renderHook, waitFor } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRestaurants } from '../useRestaurants';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

it('should fetch restaurants', async () => {
  const { result } = renderHook(
    () => useRestaurants({ latitude: 48.8566, longitude: 2.3522 }),
    { wrapper: createWrapper() }
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

### Tester un Store Zustand

```typescript
// lib/store/__tests__/addressStore.test.ts
import { useAddressStore } from '../addressStore';

describe('addressStore', () => {
  beforeEach(() => {
    // Reset le store avant chaque test
    useAddressStore.setState({ addresses: [], currentAddress: null });
  });

  it('should add address', () => {
    const newAddress = { id: '1', street: 'Test St' };

    useAddressStore.getState().addAddress(newAddress);

    const addresses = useAddressStore.getState().addresses;
    expect(addresses).toContain(newAddress);
  });
});
```

---

## Best Practices

### 1. Isolation des tests
```typescript
beforeEach(() => {
  jest.clearAllMocks(); // Clear tous les mocks
});
```

### 2. Nommage descriptif
```typescript
// ❌ Mauvais
it('test 1', () => {});

// ✅ Bon
it('should return delivery fee when distance is valid', () => {});
```

### 3. Arrange-Act-Assert (AAA)
```typescript
it('should calculate total', () => {
  // Arrange - Préparer
  const price = 10;
  const quantity = 2;

  // Act - Exécuter
  const result = price * quantity;

  // Assert - Vérifier
  expect(result).toBe(20);
});
```

### 4. Mock uniquement ce qui est nécessaire
```typescript
// Mock Supabase mais pas les fonctions de calcul pures
jest.mock('@/lib/supabase');
```

### 5. Tester les cas limites
```typescript
describe('calculateDeliveryFee', () => {
  it('should handle distance = 0', () => {});
  it('should handle negative distance', () => {});
  it('should handle very large distance', () => {});
});
```

### 6. Éviter les tests fragiles
```typescript
// ❌ Fragile - dépend de l'ordre des éléments
expect(result[0].name).toBe('Pizza');

// ✅ Robuste
expect(result).toContainEqual(expect.objectContaining({ name: 'Pizza' }));
```

---

## Ressources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [React Hooks Testing Library](https://react-hooks-testing-library.com/)
- [Testing React Query](https://tanstack.com/query/latest/docs/framework/react/guides/testing)

---

## Seuils de Couverture

Configuration actuelle dans `jest.config.js` :
```javascript
coverageThreshold: {
  global: {
    statements: 50,
    branches: 50,
    functions: 50,
    lines: 50,
  },
},
```

**Objectif :** Maintenir au minimum 50% de couverture de code.
