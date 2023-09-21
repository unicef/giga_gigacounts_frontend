import { Translation } from 'src/@types'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from './strings'

export const replaceTranslated = (
  message: Translation,
  replace: string,
  value: Translation | '',
  translateFn: (value: Translation) => string
) =>
  value
    ? capitalizeFirstLetter(translateFn(message).replace(replace, translateFn(value)))
    : capitalizeFirstLetter(translateFn(message).replace(replace, ''))

export const replaceTwoTranslated = (
  message: Translation,
  replace: string,
  replace2: string,
  value: Translation,
  value2: number | string,
  translateFn: (value: Translation) => string
) =>
  capitalizeFirstLetter(
    translateFn(message).replace(replace, translateFn(value)).replace(replace2, String(value2))
  )

export const translateCapitalized = (
  s: Translation | Capitalize<Translation>,
  translateFn: (value: Translation) => string
) => capitalizeFirstLetter(translateFn(uncapitalizeFirstLetter(s) as Translation))
