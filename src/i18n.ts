import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translations.json";
import ptTranslation from "./locales/pt/translations.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
    },
    lng: "pt",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
