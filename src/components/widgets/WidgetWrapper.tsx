import { Theme } from '@carbon/react'
import { CSSProperties } from 'react'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from '../stack'
import { Typography } from '../typography'

export default function WidgetWrapper({
  children,
  theme = 'white',
  width,
  height,
  title
}: {
  children: React.ReactNode
  theme?: 'white' | 'g90'
  title?: React.ReactNode | string
  width: CSSProperties['width']
  height: CSSProperties['height']
}) {
  const { spacing, palette } = useTheme(theme)
  return (
    <Theme
      style={{
        padding: spacing.xl,
        backgroundColor: palette.background.default,
        width,
        height,
        overflow: 'hidden'
      }}
      theme={theme}
    >
      <Stack
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <Stack
          style={{
            height: '15%'
          }}
          alignSelf="flex-start"
          justifySelf="flex-start"
        >
          {title && (
            <Typography as="h3" size={24}>
              {typeof title === 'string' ? capitalizeFirstLetter(title) : title}
            </Typography>
          )}
        </Stack>
        <Stack
          style={{
            height: '85%'
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Theme>
  )
}
