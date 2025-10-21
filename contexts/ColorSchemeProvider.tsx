import React, { useEffect, ReactNode } from 'react';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLOR_SCHEME_KEY = '@app/color_scheme';

interface ColorSchemeProviderProps {
  children: ReactNode;
}

/**
 * Provider pour gérer la persistence du color scheme
 * Utilise le hook useColorScheme natif de NativeWind
 * Principes: KISS, YAGNI
 *
 * NativeWind gère automatiquement:
 * - Le système de dark mode avec les classes dark:
 * - La synchronisation avec le système
 * - L'application du colorScheme
 */
export const ColorSchemeProvider: React.FC<ColorSchemeProviderProps> = ({ children }) => {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    loadColorScheme();
  }, []);

  /**
   * Charge le color scheme sauvegardé
   */
  const loadColorScheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(COLOR_SCHEME_KEY);
      if (saved && (saved === 'light' || saved === 'dark')) {
        setColorScheme(saved);
      }
    } catch (error) {
      console.error('[ColorSchemeProvider] Error loading:', error);
    }
  };

  return <>{children}</>;
};

/**
 * Hook pour persister le color scheme
 */
export const usePersistColorScheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const persistAndSet = async (scheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem(COLOR_SCHEME_KEY, scheme);
      setColorScheme(scheme);
    } catch (error) {
      console.error('[usePersistColorScheme] Error saving:', error);
    }
  };

  const persistAndToggle = async () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    await persistAndSet(newScheme);
  };

  return {
    colorScheme,
    setColorScheme: persistAndSet,
    toggleColorScheme: persistAndToggle,
  };
};
