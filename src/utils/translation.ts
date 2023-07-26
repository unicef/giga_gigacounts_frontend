import { Translation } from 'src/locales/types'
import { capitalizeFirstLetter } from './strings'

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
  value2: number,
  translateFn: (value: Translation) => string
) =>
  capitalizeFirstLetter(
    translateFn(message).replace(replace, translateFn(value)).replace(replace2, String(value2))
  )
