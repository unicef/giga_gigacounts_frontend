import { STRING_DEFAULT } from 'src/constants/display-defaults'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { CSSProperties } from 'react'
import { Stack } from '../stack'
import { Typography } from '../typography'

type Props = {
  width?: number
  name: 'uptime' | 'latency' | 'upload_speed' | 'download_speed'
  value: number | null
  subtitle?: string
  style?: CSSProperties
}

export default function QosCard({ width, name, value, subtitle, style }: Props) {
  const label = getMetricLabel(name)
  const { translate } = useLocales()
  const { spacing } = useTheme()

  return (
    <Stack style={{ width, padding: spacing.md, ...style }} gap={spacing.md} orientation="vertical">
      <Typography as="h4">{capitalizeFirstLetter(translate(name))}</Typography>
      <div>
        {subtitle && <Typography as="p">{capitalizeFirstLetter(subtitle)}</Typography>}
        <Typography as="h3">{value ? `${value}${label}` : STRING_DEFAULT}</Typography>
      </div>
    </Stack>
  )
}
