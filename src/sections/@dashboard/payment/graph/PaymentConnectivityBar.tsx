import { PopoverAlignment, Theme } from '@carbon/react'
import { ReactNode } from 'react'
import { Translation } from 'src/@types'
import { PercentageBar } from 'src/components/percentage'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { formatDate } from 'src/utils/date'

type Props = {
  data: readonly { color: 'error' | 'success' | 'warning' | 'unknown'; percentage: number }[] | null
  numberOfSchools: number | string
  dateFrom?: string | Date
  dateTo?: string | Date
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

export default function PaymentConnectivityBar({
  data,
  dateFrom,
  dateTo,
  numberOfSchools,
  variant,
  tooltipAlign
}: Props) {
  const { replaceTranslated, replaceTwoTranslated } = useLocales()
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
                  <Typography>
                    {replaceTranslated(
                      'out_of_number_schools',
                      '{{number}}',
                      numberOfSchools as unknown as Translation
                    )}
                  </Typography>
                  <Typography>
                    {replaceTwoTranslated(
                      'from_date_to_date',
                      '{{dateFrom}}',
                      '{{dateTo}}',
                      formatDate(dateFrom, '/') as Translation,
                      formatDate(dateTo, '/')
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
