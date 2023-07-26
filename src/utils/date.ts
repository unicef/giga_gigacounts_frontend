export const formatDate = (date: string | Date, separator: '-' | '/' = '-') => {
  if (date instanceof Date && separator === '-') return date.toISOString().slice(0, 10)
  if (date instanceof Date && separator === '/')
    return date.toISOString().slice(0, 10).replace(/-/g, '/')
  if (separator === '/') return new Date(date).toISOString().slice(0, 10).replace(/-/g, '/')
  return new Date(date).toISOString().slice(0, 10)
}
