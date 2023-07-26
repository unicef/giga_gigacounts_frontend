import React, { CSSProperties } from 'react'
import { useTheme } from 'src/theme'

type TypographyProps = {
  children: React.ReactNode
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'disabled'
    | 'textSecondary'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  style?: CSSProperties
  onClick?: () => void
}

const Typography = ({
  children,
  variant = 'default',
  as = 'p',
  style,
  onClick
}: TypographyProps) => {
  const { palette } = useTheme()

  const colors: { [k in TypographyProps['variant'] as string]: string } = {
    default: palette.text.primary,
    textSecondary: palette.text.secondary,
    primary: palette.primary.main,
    secondary: palette.secondary.main,
    info: palette.info.main,
    success: palette.success.main,
    warning: palette.warning.main,
    error: palette.error.main,
    disabled: palette.text.disabled
  }

  const textColor = colors[variant]

  const elements: {
    [k in TypographyProps['as'] as string]: (text: React.ReactNode) => JSX.Element
  } = {
    h1: (text) => <h1 style={{ color: textColor, ...style }}>{text}</h1>,
    h2: (text) => <h2 style={{ color: textColor, ...style }}>{text}</h2>,
    h3: (text) => <h3 style={{ color: textColor, ...style }}>{text}</h3>,
    h4: (text) => <h4 style={{ color: textColor, ...style }}>{text}</h4>,
    h5: (text) => <h5 style={{ color: textColor, ...style }}>{text}</h5>,
    h6: (text) => <h6 style={{ color: textColor, ...style }}>{text}</h6>,
    p: (text) => <p style={{ color: textColor, ...style }}>{text}</p>,
    span: (text) => <span style={{ color: textColor, ...style }}>{text}</span>
  }

  const buttonWrapper = (buttonChildren: React.ReactNode): JSX.Element => (
    <button
      onClick={onClick}
      type="button"
      style={{
        border: 'none',
        backgroundColor: 'inherit',
        cursor: 'pointer'
      }}
    >
      {buttonChildren}
    </button>
  )

  const element = elements[as](children)
  return onClick ? buttonWrapper(element) : element
}

export default Typography
