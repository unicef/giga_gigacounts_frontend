export const capitalizeFirstLetter = (value: string) => {
  if (value === '') return ''
  return value[0].toUpperCase() + value.slice(1)
}
export const uncapitalizeFirstLetter = (value: string) => {
  if (value === '') return ''
  return value[0].toLowerCase() + value.slice(1)
}

export const applyToEveryWord = (string: string, fn: (word: string) => string) =>
  string.split(' ').map(fn).join(' ')

export const threeDots = (string: string, maxChars: number) => {
  if (!string) return string
  return string.length > maxChars ? `${string.slice(0, maxChars - 3)}...` : string
}