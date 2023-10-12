import { TOptionsBase } from 'i18next'
import { useTranslation } from 'react-i18next'
import { Translation } from 'src/@types'
import localStorageAvailable from 'src/utils/localStorageAvailable'
import {
  replaceTranslated,
  replaceTwoTranslated,
  translateCapitalized
} from 'src/utils/translation'
import { allLangs, defaultLang } from './config-lang'

export default function useLocales() {
  const { i18n, t: translate } = useTranslation()

  const storageAvailable = localStorageAvailable()

  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : ''

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: Translation, options?: TOptionsBase & object & { defaultValue: string }) =>
      options ? String(translate(text, options)) : String(translate(text)),
    currentLang,
    allLangs,
    replaceTranslated: (message: Translation, replace: string, value: Translation) =>
      replaceTranslated(message, replace, value, translate),
    translateCapitalized: (message: Translation | Capitalize<Translation>) =>
      translateCapitalized(message, translate),
    replaceTwoTranslated: (
      message: Translation,
      replace: string,
      replace2: string,
      value: Translation | (string & {}),
      value2: number | string
    ) => replaceTwoTranslated(message, replace, replace2, value as Translation, value2, translate)
  }
}
