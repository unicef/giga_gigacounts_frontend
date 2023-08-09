import { Theme } from '@carbon/react'
import { CSSProperties } from 'react'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Icon as IconType } from 'src/@types'
import { Typography } from '../typography'
import { Stack } from '../stack'

export default function WidgetWrapper({
  children,
  theme = 'white',
  width,
  height,
  title,
  Icon,
  iconColor
}: {
  children: React.ReactNode
  theme?: 'white' | 'g90'
  title?: string
  width: CSSProperties['width']
  height: CSSProperties['height']
  Icon?: IconType
  iconColor?: string
}) {
  const { spacing, palette } = useTheme(theme)
  return (
    <Theme
      style={{
        padding: spacing.md,
        backgroundColor: palette.background.neutral,
        minWidth: width,
        minHeight: height,
        overflow: 'hidden'
      }}
      theme={theme}
    >
      <Stack orientation="horizontal" justifyContent="space-between" alignItems="center">
        {title && <Typography as="h2">{capitalizeFirstLetter(title)}</Typography>}
        {Icon && (
          <div
            style={{
              backgroundColor: palette.grey[300],
              borderRadius: spacing.xxs,
              padding: spacing.xxs
            }}
          >
            <Icon size={spacing.xl} color={iconColor} />
          </div>
        )}
      </Stack>
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          width: '100%'
        }}
      >
        {children}
      </div>
    </Theme>
  )
}
