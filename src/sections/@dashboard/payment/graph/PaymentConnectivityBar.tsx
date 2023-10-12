import { PopoverAlignment, Theme } from '@carbon/react'
import { ReactNode } from 'react'
import { Translation } from 'src/@types'
import { PercentageBar } from 'src/components/percentage'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'

type Props = {
  data: readonly { color: 'error' | 'success' | 'warning' | 'unknown'; percentage: number }[] | null
  variant: 'days' | 'status'
  tooltipAlign?: (
    item: {
      percentage: number
      color: 'error' | 'success' | 'warning' | 'unknown' | 'info'
      tooltip?: ReactNode
    },
    i: number
  ) => PopoverAlignment | undefined
}

export default function PaymentConnectivityBar({ data, variant, tooltipAlign }: Props) {
  const { replaceTranslated } = useLocales()
  return (
    <PercentageBar
      width="100%"
      tooltipAlign={tooltipAlign}
      data={
        data
          ? data.map((d) => ({
              ...d,
              tooltip: (
                <Theme theme="g90">
                  <Typography>
                    {replaceTranslated(
                      `tooltips.connectivity_graph.${variant}.${d.color}`,
                      '{{number}}',
                      String(d.percentage) as Translation
                    )}
                  </Typography>
                </Theme>
              )
            }))
          : null
      }
    />
  )
}
