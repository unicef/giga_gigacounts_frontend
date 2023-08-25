import { Button, Tag } from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import { PaymentStatus } from 'src/@types';
import { Stack } from 'src/components/stack';
import { PopoverTitle } from 'src/components/typography';
import { FILTER_ALL_DEFAULT, PAYMENT_STATUS_COLORS } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTheme } from 'src/theme';
import { capitalizeFirstLetter } from 'src/utils/strings';

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setFilterStatus: Dispatch<SetStateAction<PaymentStatus | typeof FILTER_ALL_DEFAULT>>
}

const STATUS_OPTIONS = [FILTER_ALL_DEFAULT, ...Object.values(PaymentStatus)] as const

export default function PaymentTableFilters({
  closePopover,
  setPage,
  setFilterSearch,
  setFilterStatus
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterSearch('')
    setFilterStatus(FILTER_ALL_DEFAULT)
  }

  const handleFilterStatus = (status: PaymentStatus | typeof FILTER_ALL_DEFAULT) =>  {
    setPage(1)
    setFilterStatus(status)
  }

  return (
    <Stack style={{ padding: spacing.md }} orientation="vertical">
      <PopoverTitle title="status" />
      <Stack orientation="horizontal">
        {STATUS_OPTIONS.map((opt) => (
          <Tag
            key={opt}
            style={{ border: 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : PAYMENT_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.payment.${opt}`))}
          </Tag>
        ))}
      </Stack>

      <Button
        size="sm"
        className="btn-max-width-limit"
        kind="secondary"
        style={{ marginTop: spacing.md, width: '100%' }}
        onClick={handleResetFilter}
      >
        {capitalizeFirstLetter(translate('clear'))}
      </Button>
    </Stack>
  )
}
