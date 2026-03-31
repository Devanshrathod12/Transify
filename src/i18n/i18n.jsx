import i18n from "i18n-js";

import en from "../i18n/translations/en.json";
import hi from "../i18n/translations/hi.json";
import te from "../i18n/translations/te.json";

i18n.translations = {
  en,
  hi,
  te,
};

i18n.fallbacks = true;
i18n.locale = "en";

export default i18n;