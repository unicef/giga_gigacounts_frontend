import { useTheme } from 'src/theme'
import { Stack } from '../stack'

type PercentageBarProps = {
  data: readonly { percentage: number; color: 'error' | 'info' | 'warning' | 'success' }[]
  width: number
}

export default function PercentageBar({ data, width }: PercentageBarProps) {
  const { palette, spacing } = useTheme()
  return (
    <Stack orientation="horizontal" style={{ width }}>
      {data.map(
        (item) =>
          item.percentage !== 0 && (
            <div
              key={item.color + item.percentage}
              style={{
                textAlign: 'left',
                padding: spacing.xs,
                width: (width * item.percentage) / 100,
                backgroundColor: palette[item.color].light
              }}
            >
              {item.percentage}%
            </div>
          )
      )}
    </Stack>
  )
}
