import { Translation } from 'src/@types'
import { STRING_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from '../stack'
import { Typography } from '../typography'

type Props = {
  variant: 'error' | 'warning' | 'success' | 'unknown'
  percentage: number | string
} & (
  | {
      type: 'absolute'
    }
  | {
      type: 'days'
      maxDays: number
    }
)
export default function PercentageDisplay({ variant, type, percentage, ...other }: Props) {
  const isDaysType = type === 'days' && 'maxDays' in other
  const { translate, replaceTranslated, replaceTwoTranslated } = useLocales()

  const LABELS: { [K in Props['type']]: { [Key in Props['variant']]: string } } = {
    absolute: {
      error: capitalizeFirstLetter(translate('no_connection')),
      warning: capitalizeFirstLetter(translate('bad_connection')),
      success: capitalizeFirstLetter(translate('good_connection')),
      unknown: capitalizeFirstLetter(translate('unknown_data'))
    },
    days: {
      error: replaceTranslated('connected_number_days', '{{number}}', '0' as Translation),
      success: capitalizeFirstLetter(translate('connected_every_day')),
      unknown: capitalizeFirstLetter(translate('unknown_data')),
      warning: replaceTwoTranslated(
        'connected_1_to_number_days_out_of_max_days',
        '{{number}}',
        '{{max}}',
        (isDaysType ? other.maxDays - 1 : STRING_DEFAULT) as Translation,
        isDaysType ? other.maxDays : STRING_DEFAULT
      )
    }
  }

  return (
    <Stack style={{ width: 120 }}>
      <Typography
        size={38}
        variant={variant === 'unknown' ? 'disabled' : variant}
      >{`${percentage}%`}</Typography>
      <Typography size={12}>{LABELS[type][variant]}</Typography>
    </Stack>
  )
}
