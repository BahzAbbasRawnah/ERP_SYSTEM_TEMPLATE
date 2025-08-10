import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './en/translate.json';
import arTranslations from './ar/translate.json';
import enTemplates from './en/templates.json';
import arTemplates from './ar/templates.json';

// Translation resources
const resources = {
  en: {
    translation: { ...enTranslations, ...enTemplates }
  },
  ar: {
    translation: { ...arTranslations, ...arTemplates }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;