import { Stack } from 'src/components/stack'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

type PercentageBarProps = {
  data: readonly { percentage: number; color: 'error' | 'info' | 'warning' | 'success' }[]
  width: number
}

export default function PercentageBar({ data, width }: PercentageBarProps) {
  const { palette, spacing } = useTheme()
  const { translate } = useLocales()
  const itemStyle = (percentage: number, color: 'error' | 'info' | 'warning' | 'success') =>
    ({
      textAlign: 'left',
      padding: spacing.xs,
      width: (width * percentage) / 100,
      backgroundColor: palette[color].light
    } as const)

  const isValidPercentage = (percentage: number) =>
    !Number.isNaN(Number(percentage)) && Number(percentage) !== 0
  return (
    <Stack orientation="horizontal" style={{ width }}>
      {data && data.some((d) => isValidPercentage(d.percentage)) ? (
        data.map(
          (item) =>
            isValidPercentage(item.percentage) && (
              <div
                key={item.color + item.percentage}
                style={itemStyle(item.percentage, item.color)}
              >
                {item.percentage}%
              </div>
            )
        )
      ) : (
        <div style={itemStyle(100, 'error')}>{translate('no_data')}</div>
      )}
    </Stack>
  )
}
