import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks';
import { LANGUAGE_CONFIG, SupportedLanguage, SUPPORTED_LANGUAGES } from '@/i18n/config';

interface LanguageSelectorProps {
  /**
   * Style personnalisé pour le conteneur
   */
  containerClassName?: string;
}

/**
 * Composant de sélection de langue
 *
 * Principes appliqués:
 * - KISS: Interface simple et directe
 * - CLEAN CODE: Composant réutilisable et bien nommé
 * - DRY: Un seul composant pour toute l'application
 *
 * @example
 * ```tsx
 * <LanguageSelector />
 * ```
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  containerClassName = ''
}) => {
  const { language, changeLanguage } = useTranslation();

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang !== language) {
      await changeLanguage(lang);
    }
  };

  return (
    <View className={`flex-row justify-center gap-4 ${containerClassName}`}>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const config = LANGUAGE_CONFIG[lang];
        const isActive = language === lang;

        return (
          <TouchableOpacity
            key={lang}
            onPress={() => handleLanguageChange(lang)}
            className={`
              flex-1 flex-row items-center justify-center
              px-4 py-3 rounded-lg border-2
              ${isActive
                ? 'bg-primary border-primary'
                : 'bg-field-light dark:bg-field-dark border-transparent'
              }
            `}
            activeOpacity={0.7}
          >
            <Text className="text-2xl mr-2">{config.flag}</Text>
            <Text
              className={`
                text-sm font-semibold
                ${isActive
                  ? 'text-black'
                  : 'text-text-primary dark:text-white'
                }
              `}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LanguageSelector;
