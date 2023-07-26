/* eslint-disable import/no-duplicates */
import { enUS, es, fr, ptBR } from 'date-fns/locale'
import { format, getTime, formatDistanceToNow } from 'date-fns'

type InputValue = Date | string | number | null

const getDateLocate = (): Locale => {
  const language = localStorage.getItem('i18nextLng')?.toUpperCase() || 'ENUS'
  const localeMap: { [key: string]: Locale } = { ENUS: enUS, ES: es, FR: fr, PTBR: ptBR }
  const locale = localeMap[language as keyof typeof localeMap]
  return locale
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy'

  return date ? format(new Date(date), fm, { locale: getDateLocate() }) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p'

  return date ? format(new Date(date), fm, { locale: getDateLocate() }) : ''
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: getDateLocate()
      })
    : ''
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : ''
}
