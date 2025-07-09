import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import JSON as raw text
import viRaw from 'shared-contracts/i18n/locales/vi.json?raw';
import enRaw from 'shared-contracts/i18n/locales/en.json?raw';

// Parse to object
const vi = JSON.parse(viRaw);
const en = JSON.parse(enRaw);

const resources = {
  vi: { translation: vi },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;