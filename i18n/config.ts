import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des traductions
import authFr from './locales/fr/auth.json';
import chartFr from './locales/fr/chart.json';
import commonFr from './locales/fr/common.json';
import homeFr from './locales/fr/home.json';
import offerFr from './locales/fr/offer.json';
import orderFr from './locales/fr/order.json';
import profileFr from './locales/fr/profile.json';

import authEn from './locales/en/auth.json';
import chartEn from './locales/en/chart.json';
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import offerEn from './locales/en/offer.json';
import orderEn from './locales/en/order.json';
import profileEn from './locales/en/profile.json';

import authAr from './locales/ar/auth.json';
import chartAr from './locales/ar/chart.json';
import commonAr from './locales/ar/common.json';
import homeAr from './locales/ar/home.json';
import offerAr from './locales/ar/offer.json';
import orderAr from './locales/ar/order.json';
import profileAr from './locales/ar/profile.json';

// Clé de stockage pour la langue
const STORAGE_KEY = '@app_language';

// Configuration des ressources de traduction
const resources = {
  fr: {
    common: commonFr,
    auth: authFr,
    home: homeFr,
    profile: profileFr,
    order: orderFr,
    chart: chartFr,
    offer: offerFr,
  },
  en: {
    common: commonEn,
    auth: authEn,
    home: homeEn,
    profile: profileEn,
    order: orderEn,
    chart: chartEn,
    offer: offerEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    home: homeAr,
    profile: profileAr,
    order: orderAr,
    chart: chartAr,
    offer: offerAr,
  },
};

// Langues supportées
export const SUPPORTED_LANGUAGES = ['fr', 'en', 'ar'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Configuration des langues avec leurs labels
export const LANGUAGE_CONFIG = {
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English', flag: '🇬🇧' },
  ar: { label: 'العربية', flag: '🇸🇦' },
} as const;

/**
 * Récupère la langue sauvegardée ou détecte la langue système
 */
export const getInitialLanguage = async (): Promise<SupportedLanguage> => {
  try {
    // Essayer de récupérer la langue sauvegardée
    const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as SupportedLanguage)) {
      return savedLanguage as SupportedLanguage;
    }

    // Sinon, détecter la langue système
    const systemLanguage = Localization.getLocales()[0]?.languageCode;
    if (systemLanguage && SUPPORTED_LANGUAGES.includes(systemLanguage as SupportedLanguage)) {
      return systemLanguage as SupportedLanguage;
    }

    // Fallback en français
    return 'fr';
  } catch (error) {
    console.error('Error getting initial language:', error);
    return 'fr';
  }
};

/**
 * Sauvegarde la langue choisie
 */
export const saveLanguage = async (language: SupportedLanguage): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

/**
 * Initialise i18n avec la langue détectée
 */
export const initI18n = async (): Promise<void> => {
  const initialLanguage = await getInitialLanguage();

  // Initialiser i18n - retourne une Promise
  return new Promise((resolve, reject) => {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: initialLanguage,
        fallbackLng: 'fr',
        defaultNS: 'common',
        ns: ['common', 'auth', 'home', 'profile', 'order', 'chart', 'offer'],
        interpolation: {
          escapeValue: false, // React already escapes
        },
        react: {
          useSuspense: false, // Important pour React Native
        },
        compatibilityJSON: 'v4', // Pour éviter les warnings
      }, (err) => {
        if (err) {
          console.error('Error initializing i18n:', err);
          reject(err);
        } else {
          resolve();
        }
      });
  });
};

export default i18n;
