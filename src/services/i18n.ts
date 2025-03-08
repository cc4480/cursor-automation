import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useAppSelector } from '../store/hooks';

// Import translations
import enTranslations from '../components/i18n/locales/en.json';
import esTranslations from '../components/i18n/locales/es.json';
import frTranslations from '../components/i18n/locales/fr.json';
import deTranslations from '../components/i18n/locales/de.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    de: {
      translation: deTranslations,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Hook to get current language
export const useLanguage = () => {
  const language = useAppSelector((state) => state.profile.preferences.language);
  return language;
};

// Hook to get translation function
export const useTranslation = () => {
  const { t } = i18n;
  return t;
};

// Function to change language
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

// Function to get current language
export const getCurrentLanguage = () => {
  return i18n.language;
};

// Function to get supported languages
export const getSupportedLanguages = () => {
  return Object.keys(i18n.options.resources || {});
};

// Function to get language name
export const getLanguageName = (code: string) => {
  const languageNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
  };
  return languageNames[code] || code;
};

// Function to get language direction
export const getLanguageDirection = (code: string) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(code) ? 'rtl' : 'ltr';
};

// Function to format date
export const formatDate = (date: Date | string, options: Intl.DateTimeFormatOptions = {}) => {
  const language = getCurrentLanguage();
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat(language, defaultOptions).format(new Date(date));
};

// Function to format number
export const formatNumber = (number: number, options: Intl.NumberFormatOptions = {}) => {
  const language = getCurrentLanguage();
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  };
  return new Intl.NumberFormat(language, defaultOptions).format(number);
};

// Function to format currency
export const formatCurrency = (amount: number, currency: string = 'USD') => {
  const language = getCurrentLanguage();
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(amount);
};

// Function to format relative time
export const formatRelativeTime = (date: Date | string) => {
  const language = getCurrentLanguage();
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(language, {
    numeric: 'auto',
  });

  if (diffInSeconds < 60) {
    return rtf.format(-Math.floor(diffInSeconds), 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
};

export default i18n;