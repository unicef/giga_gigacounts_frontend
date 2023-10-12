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
    | 'textTertiary'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  style?: CSSProperties
  onClick?: () => void
  weight?: 300 | 400 | 500
  size?: 12 | 14 | 15 | 16 | 20 | 24 | 28 | 32 | 38 | 48
  mode?: 'dark' | 'light'
  className?: string
  id?: string
}

const Typography = ({
  children,
  variant = 'default',
  as = 'p',
  style,
  weight,
  size,
  onClick,
  className,
  id,
  mode = 'light'
}: TypographyProps) => {
  const { palette } = useTheme()

  const lightColors: { [k in TypographyProps['variant'] as string]: string } = {
    default: palette.text.primary,
    textSecondary: palette.text.secondary,
    textTertiary: palette.text.tertiary,
    primary: palette.primary.main,
    secondary: palette.secondary.main,
    info: palette.info.main,
    success: palette.success.main,
    warning: palette.warning.main,
    error: palette.error.main,
    disabled: palette.text.disabled
  }
  const darkColors: { [k in TypographyProps['variant'] as string]: string } = {
    default: palette.text.primary,
    textSecondary: palette.text.secondary,
    textTertiary: palette.text.tertiary,
    primary: palette.primary.main,
    secondary: palette.secondary.dark,
    info: palette.info.dark,
    success: palette.success.dark,
    warning: palette.warning.dark,
    error: palette.error.dark,
    disabled: palette.text.disabled
  }
  const colors = mode === 'dark' ? darkColors : lightColors
  const color = colors[variant]
  const fontWeight = weight
  const fontSize = size

  const wrapperProps = onClick ? {} : { id, className }

  const elements: {
    [k in TypographyProps['as'] as string]: (text: React.ReactNode) => JSX.Element
  } = {
    h1: (text) => (
      <h1 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h1>
    ),
    h2: (text) => (
      <h2 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h2>
    ),
    h3: (text) => (
      <h3 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h3>
    ),
    h4: (text) => (
      <h4 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h4>
    ),
    h5: (text) => (
      <h5 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h5>
    ),
    h6: (text) => (
      <h6 {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </h6>
    ),
    p: (text) => (
      <p {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </p>
    ),
    span: (text) => (
      <span {...wrapperProps} style={{ color, fontWeight, fontSize, ...style }}>
        {text}
      </span>
    )
  }

  const buttonWrapper = (buttonChildren: React.ReactNode): JSX.Element => (
    <button
      id={id}
      className={className}
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
