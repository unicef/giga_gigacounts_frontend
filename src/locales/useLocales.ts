import { TOptionsBase } from 'i18next'
import { useTranslation } from 'react-i18next'
import localStorageAvailable from 'src/utils/localStorageAvailable'
import { Translation } from 'src/@types'
import { replaceTranslated, replaceTwoTranslated } from 'src/utils/translation'
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
    replaceTwoTranslated: (
      message: Translation,
      replace: string,
      replace2: string,
      value: Translation,
      value2: number
    ) => replaceTwoTranslated(message, replace, replace2, value, value2, translate)
  }
}
