import { Button, ComboBox, DatePicker, DatePickerInput, Tag } from '@carbon/react';
import { Dispatch, SetStateAction } from 'react';
import { MinMax, PaymentStatus, Setter } from 'src/@types';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Stack } from 'src/components/stack';
import { PopoverTitle } from 'src/components/typography';
import {
  FILTER_ALL_DEFAULT,
  FILTER_TAG_BORDER,
  FilterAll,
  PAYMENT_STATUS_COLORS
} from 'src/constants';
import { useLocales } from 'src/locales';
import { useTheme } from 'src/theme';
import { capitalizeFirstLetter } from 'src/utils/strings';

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterSearch?: Setter<string>
  setFilterStatus: Setter<PaymentStatus | FilterAll>
  filterStatus: string
  countryName?: string
  countryOptions?: string[]
  setFilterCountry?: Setter<string>
  setFilterDates: MinMax<Setter<string>>
  filterDates: MinMax<string>
}

const STATUS_OPTIONS = [FILTER_ALL_DEFAULT, ...Object.values(PaymentStatus)] as const

export default function PaymentTableFilters({
  closePopover,
  setPage,
  setFilterSearch,
  setFilterStatus,
  filterStatus,
  countryName,
  countryOptions,
  setFilterCountry,
  filterDates,
  setFilterDates
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user, isAdmin } = useAuthContext()

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    if (setFilterSearch) setFilterSearch('')
    if (setFilterCountry) setFilterCountry(user?.country.name ?? '')
    setFilterStatus(FILTER_ALL_DEFAULT)
    setFilterDates.max('')
    setFilterDates.min('')
  }

  const handleFilterStatus = (status: PaymentStatus | FilterAll) => {
    setPage(1)
    setFilterStatus(status)
  }

  const handleFilterCountry = (status: string) => {
    setPage(1)
    if (setFilterCountry) setFilterCountry(status)
  }
  const handleMaxDate = (max: string) => {
    setPage(1)
    setFilterDates.max(max)
  }
  const handleMinDate = (min: string) => {
    setPage(1)
    setFilterDates.min(min)
  }

  const sortedCountryOptions =
    countryOptions && countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const itemToString = (item: unknown) => {
    if (!item) return ''
    return item === FILTER_ALL_DEFAULT || item === 'none'
      ? capitalizeFirstLetter(translate(item))
      : capitalizeFirstLetter(item as string)
  }
  return (
    <Stack style={{ padding: spacing.md }} orientation="vertical">
      <PopoverTitle title="status" />
      <Stack orientation="horizontal">
        {STATUS_OPTIONS.map((opt) => (
          <Tag
            key={opt}
            style={{ border: opt === filterStatus ? FILTER_TAG_BORDER : 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : PAYMENT_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.payment.${opt}`))}
          </Tag>
        ))}
      </Stack>
      {countryName && setFilterCountry && countryOptions && isAdmin && (
        <>
          <PopoverTitle title="country" />
          <ComboBox
            id="payment-country-select"
            itemToString={itemToString}
            items={sortedCountryOptions}
            selectedItem={countryName}
            onChange={(e) => {
              handleFilterCountry(e.selectedItem ?? user?.country.name)
              closePopover()
            }}
            disabled={sortedCountryOptions.length <= 1}
          />
        </>
      )}

      <PopoverTitle title="payment_period" />
      <DatePicker
        style={{ marginBottom: spacing.sm }}
        value={filterDates.min}
        datePickerType="single"
        allowInput={false}
        onChange={(dates) => handleMinDate(dates[0] instanceof Date ? dates[0].toISOString() : '')}
      >
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText={translate('start_date')}
          id="payment-start-date-filter"
          datePickerType="single"
        />
      </DatePicker>
      <DatePicker
        value={filterDates.max}
        datePickerType="single"
        allowInput={false}
        onFocus={(e) => e.target.blur()}
        onChange={(dates) => handleMaxDate(dates[0] instanceof Date ? dates[0].toISOString() : '')}
      >
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText={translate('end_date')}
          id="payment-end-date-filter"
          datePickerType="single"
        />
      </DatePicker>

      <Button
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
