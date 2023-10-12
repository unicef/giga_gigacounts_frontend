import { CSSProperties } from 'react'
import { MetricSnake } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { STRING_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  name: MetricSnake
  value?: number | null
  expectedValue: number
  hideExpected?: boolean
  hideLabel?: boolean
  style?: CSSProperties
  average?: boolean
  period?: { dateTo?: string; dateFrom?: string }
}

export default function ComparingCard({
  width,
  name,
  value,
  expectedValue,
  hideExpected = false,
  hideLabel = false,
  style,
  average,
  period,
  height
}: Props) {
  const label = getMetricLabel(name)
  const { translate } = useLocales()
  const { spacing, palette } = useTheme()

  const getComparisonVariant = (real: number, total: number) => {
    let percentage = real / total
    if (name === MetricSnake.Latency) percentage **= -1
    if (percentage >= 0.9) return 'success'
    if (percentage >= 0.7) return 'warning'
    return 'error'
  }

  return (
    <Stack
      style={{
        width,
        height,
        padding: spacing.md,
        backgroundColor: palette.background.neutral,
        ...style
      }}
      gap={spacing.lg}
      justifyContent="flex-end"
      orientation="vertical"
    >
      <Typography as="h5">
        {capitalizeFirstLetter(translate(average ? `widgets.map.average_${name}` : name))}
      </Typography>
      <Stack orientation="horizontal">
        {!hideExpected && (
          <Stack
            orientation="vertical"
            justifyContent="space-between"
            gap={spacing.md}
            style={{
              width: '50%',
              padding: spacing.xs,
              borderRightColor: palette.divider,
              borderRightWidth: '1px',
              borderRightStyle: 'solid',
              marginRight: spacing.xs,
              paddingRight: spacing.xs * 2
            }}
          >
            {!hideLabel && (
              <Typography as="h6">{capitalizeFirstLetter(translate('agreement'))}</Typography>
            )}
            <Typography as="p" size={28}>
              {expectedValue ? `${expectedValue}${label}` : STRING_DEFAULT}
            </Typography>
          </Stack>
        )}
        <Stack
          justifyContent="space-between"
          style={{
            width: hideExpected ? '100%' : '50%',
            padding: spacing.xs
          }}
          gap={spacing.md}
          orientation="vertical"
        >
          {!hideLabel && (
            <Typography as="h6">
              {period
                ? `${formatDate(period.dateFrom, '/')}
                  ${translate('to')}
                  ${formatDate(period.dateTo, '/')}`
                : capitalizeFirstLetter(translate('current_delivery'))}
            </Typography>
          )}
          <Typography
            as="p"
            size={28}
            style={{ justifySelf: 'center' }}
            variant={value ? getComparisonVariant(value, expectedValue) : 'default'}
          >
            {value ? `${value}${label}` : STRING_DEFAULT}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
