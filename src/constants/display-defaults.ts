import palette from 'src/theme/palette'

export const STRING_DEFAULT = '--'
export const FILTER_ALL_DEFAULT = 'all'
export const KEY_DEFAULTS = ['', '-'] as const
export const TRANSLATION_SEPARATOR = '_'
export const REQUIRED_MARKER = '*'

export const FILTER_TAG_BORDER = `2px solid ${palette('white').primary.main}`
export type FilterAll = typeof FILTER_ALL_DEFAULT
