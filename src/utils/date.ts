export const formatDate = (date: string | Date, separator: '-' | '/' = '-') => {
  if (date === '') return ''
  if (date instanceof Date && separator === '-') return date.toISOString().slice(0, 10)
  if (date instanceof Date && separator === '/')
    return date.toISOString().slice(0, 10).replace(/-/g, '/')
  if (separator === '/') return new Date(date).toISOString().slice(0, 10).replace(/-/g, '/')
  return new Date(date).toISOString().slice(0, 10)
}

export function formatDateTime(inputDate: string | Date, separator: '-' | '/' = '-') {
  const date = new Date(inputDate)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`.replace('/', separator)
}
