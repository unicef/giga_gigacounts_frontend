import { PopoverAlignment, SkeletonText, Tooltip } from '@carbon/react'
import { CSSProperties, ReactNode } from 'react'
import { Stack } from 'src/components/stack'
import { useTheme } from 'src/theme'
import { Typography } from '../typography'

export type Color = 'error' | 'info' | 'warning' | 'success' | 'unknown'
type PercentageBarProps = {
  data: readonly { percentage: number; color: Color; tooltip?: ReactNode }[] | null
  width: CSSProperties['width']
  tooltipAlign?: (
    item: {
      percentage: number
      color: Color
      tooltip?: ReactNode
    },
    i: number
  ) => PopoverAlignment | undefined
}

export default function PercentageBar({ data, width, tooltipAlign }: PercentageBarProps) {
  const { palette, spacing } = useTheme()
  const itemStyle = (percentage: number, color: Color, tooltip?: boolean) =>
    ({
      textAlign: 'left',
      padding: spacing.xs,
      width: tooltip ? '100%' : `${percentage}%`,
      backgroundColor: color === 'unknown' ? palette.grey[360] : palette[color].light
    } as const)

  const isValidPercentage = (percentage: number) =>
    !Number.isNaN(Number(percentage)) && Number(percentage) !== 0
  return (
    <Stack orientation="horizontal" style={{ width }}>
      {data && data.some((d) => isValidPercentage(d.percentage)) ? (
        data.map((item, i) => {
          const renderItem = (
            <button
              type="button"
              key={item.color + item.percentage}
              style={{
                ...itemStyle(item.percentage, item.color, Boolean(item.tooltip)),
                border: 'none'
              }}
            >
              <Typography>{item.percentage}%</Typography>
            </button>
          )

          return (
            isValidPercentage(item.percentage) &&
            (item.tooltip ? (
              <Tooltip
                leaveDelayMs={0}
                align={(() => {
                  if (tooltipAlign) return tooltipAlign(item, i)
                  return i === 0 ? 'top-left' : 'top-right'
                })()}
                style={{
                  width: `${item.percentage}%`
                }}
                description={item.tooltip}
              >
                {renderItem}
              </Tooltip>
            ) : (
              renderItem
            ))
          )
        })
      ) : (
        <SkeletonText />
      )}
    </Stack>
  )
}
