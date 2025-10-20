import { useMemo } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import i18n, { saveLanguage, type SupportedLanguage } from '@/i18n/config';

/**
 * Hook pour l'internationalisation (i18n + RTL)
 * Principes: KISS, DRY, YAGNI
 *
 * Fournit:
 * - t: fonction de traduction
 * - language: langue actuelle
 * - changeLanguage: changer de langue
 * - isRTL: mode RTL (arabe)
 * - flexDirection: helper pour inverser flex-direction
 *
 * @example
 * const { t, language, changeLanguage, isRTL, flexDirection } = useTranslation();
 *
 * <Text>{t('home:title')}</Text>
 * <View style={{ flexDirection: flexDirection('row') }}>
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();

  // Détection RTL
  const isRTL = useMemo(() => i18n.language === 'ar', [i18n.language]);

  // Helper pour inverser flex-direction en RTL
  const flexDirection = useMemo(() => {
    return (direction: 'row' | 'row-reverse' | 'column' = 'row') => {
      if (!isRTL || direction === 'column') return direction;
      return direction === 'row' ? 'row-reverse' : 'row';
    };
  }, [isRTL]);

  // Fonction pour changer de langue
  const changeLanguage = useMemo(() => {
    return async (lang: SupportedLanguage) => {
      await i18n.changeLanguage(lang);
      await saveLanguage(lang);
    };
  }, [i18n]);

  return {
    t,
    i18n,
    language: i18n.language as SupportedLanguage,
    changeLanguage,
    isRTL,
    flexDirection,
  };
};
