import { useTranslation } from 'react-i18next'
import localStorageAvailable from 'src/utils/localStorageAvailable'
import { replaceTranslated, replaceTwoTranslated } from '../utils/translation'
import { allLangs, defaultLang } from './config-lang'
import { Translation } from './types'

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
    translate: (text: Translation, options?: any) => String(translate(text, options)),
    currentLang,
    allLangs,
    replaceTranslated: (message: Translation, replace: string, value: Translation) =>
      replaceTranslated(message, replace, value, translate),
    replaceTwoTranslated: (
      message: Translation,
      replace: string,
      replace2: string,
      value: Translation,
      value2: number
    ) => replaceTwoTranslated(message, replace, replace2, value, value2, translate)
  }
}
