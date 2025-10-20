import React, { useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n, { initI18n } from '@/i18n/config';

interface LocalizationProviderProps {
  children: ReactNode;
}

/**
 * Provider pour l'internationalisation (i18n + RTL)
 * Principes: KISS, DRY, YAGNI
 *
 * Gère:
 * - Initialisation i18n
 * - Support RTL dynamique
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initI18n();
        I18nManager.allowRTL(true); // Active le support RTL
        setIsReady(true);
      } catch (error) {
        console.error('[LocalizationProvider] Initialization error:', error);
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  if (!isReady) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
