export type Spacing = keyof typeof spacing

const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32
} as const

export default spacing
