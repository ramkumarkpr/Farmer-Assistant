import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ta from "./ta.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    lng: "ta",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  .then(() => console.log("i18n ready:", i18n.language))
  .catch((e) => console.log("i18n init failed:", e));

export default i18n;
