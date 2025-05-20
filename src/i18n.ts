import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Завантаження перекладів із файлів
  .use(LanguageDetector) // Автоматичне визначення мови
  .use(initReactI18next) // Інтеграція з React
  .init({
    fallbackLng: 'en', // Мова за замовчуванням
    debug: false,
    interpolation: {
      escapeValue: false, // React автоматично екранує HTML
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  });

export default i18n;
