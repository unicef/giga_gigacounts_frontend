import { Link } from '@carbon/react'
import type { Icon, Translation } from 'src/@types'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  onClick?: () => void
  description: Translation
  icon: Icon
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
  size?: 16 | 20 | 24 | 32 | '16' | '20' | '24' | '32'
}

export default function ActionLink({
  onClick,
  description,
  icon,
  variant = 'default',
  size = 16
}: Props) {
  const Icon = ICONS[icon]
  const { translate } = useLocales()
  const { spacing, palette } = useTheme()

  const colors: { [k in Props['variant'] as string]: string } = {
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

  const color = colors[variant]
  return (
    <Link
      onClick={onClick}
      style={{
        color,
        cursor: 'pointer',
        fontSize: Number(size) - 4,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xxs
      }}
    >
      <Icon size={size} /> {capitalizeFirstLetter(translate(description))}
    </Link>
  )
}
