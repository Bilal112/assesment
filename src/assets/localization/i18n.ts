import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

const resources = {
  en,
  ar,
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  compatibilityJSON: 'v3',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
