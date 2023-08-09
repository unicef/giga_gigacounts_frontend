import { Theme } from '@carbon/react'
import { CSSProperties } from 'react'
import { STRING_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'

type Props = {
  width?: number
  name: 'uptime' | 'latency' | 'upload_speed' | 'download_speed'
  value: number | null
  subtitle?: string
  style?: CSSProperties
  theme?: 'g90' | 'white'
}

export default function QosCard({ width, name, value, subtitle, style, theme = 'white' }: Props) {
  const label = getMetricLabel(name)
  const { translate } = useLocales()
  const { spacing } = useTheme(theme)

  return (
    <Theme theme={theme}>
      <Stack
        style={{ width, padding: spacing.md, ...style }}
        gap={spacing.md}
        orientation="vertical"
      >
        <Typography as="h4">{capitalizeFirstLetter(translate(name))}</Typography>
        <div>
          {subtitle && <Typography as="p">{capitalizeFirstLetter(subtitle)}</Typography>}
          <Typography as="h3">{value ? `${value}${label}` : STRING_DEFAULT}</Typography>
        </div>
      </Stack>
    </Theme>
  )
}
