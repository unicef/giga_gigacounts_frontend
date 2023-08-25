import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import localStorageAvailable from 'src/utils/localStorageAvailable'
import { allLangs, defaultLang } from './config-lang'
import brLocales from './langs/br'
import enLocales from './langs/en'
import esLocales from './langs/es'
import frLocales from './langs/fr'

type Lang = (typeof allLangs)[number]['value']

let lng: Lang = defaultLang.value

const storageAvailable = localStorageAvailable()

if (storageAvailable) {
  lng = (localStorage.getItem('i18nextLng') || defaultLang.value) as Lang
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      es: { translations: esLocales },
      fr: { translations: frLocales },
      br: { translations: brLocales }
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
