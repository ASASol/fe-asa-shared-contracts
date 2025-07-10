// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import vi from './locales/vi.js';
import en from './locales/en.js';

const resources = {
  vi: {
    translation: vi
  },
  en: {
    translation: en
  }
};
console.log("✅ i18n initialized")
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    debug: false,

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    }
  });
export default i18n;