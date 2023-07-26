import { Theme, useTheme as carbonUseTheme } from '@carbon/react'
import palette from './palette'
import spacing from './spacing'

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return <Theme theme="white">{children}</Theme>
}

export const useTheme = (theme?: 'white' | 'g90') => {
  const carbonTheme = carbonUseTheme()
  return { palette: palette(theme ?? carbonTheme.theme), spacing }
}
