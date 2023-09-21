import {
  Button,
  ComboBox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Tag,
  TextInput
} from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ContractStatus, MinMax, Setter } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import {
  CONTRACT_STATUS_COLORS,
  FILTER_ALL_DEFAULT,
  FILTER_TAG_BORDER,
  FilterAll
} from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  filterRegion: string
  filterIsp: string
  filterBudget: MinMax<string>
  filterSchools: MinMax<string>
  filterDates: MinMax<string>
  setFilterStatus: Setter<ContractStatus | FilterAll>
  setFilterSearch: Setter<string>
  setFilterRegion: Setter<string>
  setFilterIsp: Setter<string>
  setFilterSchools: MinMax<Setter<string>>
  setFilterBudget: MinMax<Setter<string>>
  setFilterDates: MinMax<Setter<string>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  ispOptions: string[]
  filterStatus: string
  closePopover: () => void
}
const STATUS_OPTIONS = [FILTER_ALL_DEFAULT, ...Object.values(ContractStatus)] as const

export default function ContractTableFilters({
  setPage,
  setFilterBudget,
  setFilterRegion,
  setFilterIsp,
  setFilterSchools,
  setFilterStatus,
  regionOptions,
  ispOptions,
  filterRegion,
  filterIsp,
  filterSchools,
  filterBudget,
  filterDates,
  setFilterDates,
  setFilterSearch,
  closePopover,
  filterStatus
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()

  const handleFilter = (filterChange: () => void) => {
    setPage(1)
    filterChange()
  }

  const handleFilterCountry = (country: string) => handleFilter(() => setFilterRegion(country))
  const handleFilterIsp = (country: string) => handleFilter(() => setFilterIsp(country))
  const handleMaxBudget = (max: string) => handleFilter(() => setFilterBudget.max(max))
  const handleMinBudget = (min: string) => handleFilter(() => setFilterBudget.min(min))
  const handleMaxSchools = (max: string) => handleFilter(() => setFilterSchools.max(max))
  const handleMinSchools = (min: string) => handleFilter(() => setFilterSchools.min(min))
  const handleMaxDate = (max: string) => handleFilter(() => setFilterDates.max(max))
  const handleMinDate = (min: string) => handleFilter(() => setFilterDates.min(min))
  const handleFilterStatus = (status: ContractStatus | FilterAll) =>
    handleFilter(() => setFilterStatus(status))

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterSearch('')
    setFilterRegion(FILTER_ALL_DEFAULT)
    setFilterIsp(FILTER_ALL_DEFAULT)
    setFilterStatus(FILTER_ALL_DEFAULT)
    setFilterBudget.max('')
    setFilterBudget.min('')
    setFilterSchools.max('')
    setFilterSchools.min('')
    setFilterDates.max('')
    setFilterDates.min('')
  }

  const sortedRegionOptions =
    regionOptions.length > 0
      ? regionOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
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
        {STATUS_OPTIONS.slice(0, 3).map((opt) => (
          <Tag
            key={opt}
            style={{ border: opt === filterStatus ? FILTER_TAG_BORDER : 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : CONTRACT_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.contract.${opt}`))}
          </Tag>
        ))}
      </Stack>
      <Stack orientation="horizontal">
        {STATUS_OPTIONS.slice(3).map((opt) => (
          <Tag
            key={opt}
            style={{ border: opt === filterStatus ? FILTER_TAG_BORDER : 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : CONTRACT_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.contract.${opt}`))}
          </Tag>
        ))}
      </Stack>

      <PopoverTitle title="country" />
      <Dropdown
        id="region-contract-filter"
        items={sortedRegionOptions}
        itemToString={itemToString}
        selectedItem={sortedRegionOptions.includes(filterRegion) ? filterRegion : 'none'}
        onChange={(data: { selectedItem: string }) =>
          handleFilterCountry(data.selectedItem ?? FILTER_ALL_DEFAULT)
        }
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        disabled={sortedRegionOptions.length <= 1}
      />
      <PopoverTitle title="isp" />
      <ComboBox
        id="isp-filter"
        items={ispOptions}
        value={itemToString(ispOptions.includes(filterIsp) ? filterIsp : 'none')}
        itemToString={itemToString}
        selectedItem={ispOptions.includes(filterIsp) ? filterIsp : 'none'}
        onChange={(data: { selectedItem: string }) =>
          handleFilterIsp(data.selectedItem ?? FILTER_ALL_DEFAULT)
        }
        disabled={ispOptions.length <= 1}
      />
      <PopoverTitle title="contract_budget" />
      <Stack orientation="horizontal">
        <TextInput
          style={{ marginRight: spacing.xs }}
          id="contract-budget-min"
          value={filterBudget.min}
          labelText={capitalizeFirstLetter('min')}
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
            handleMinBudget(e.target.value)
          }}
        />
        <TextInput
          id="contract-budget-max"
          value={filterBudget.max}
          labelText={capitalizeFirstLetter('max')}
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
            handleMaxBudget(e.target.value)
          }}
        />
      </Stack>
      <PopoverTitle title="number_of_schools" />
      <Stack orientation="horizontal">
        <TextInput
          style={{ marginRight: spacing.xs }}
          id="contract-schools-min"
          value={filterSchools.min}
          labelText={capitalizeFirstLetter('min')}
          type="number"
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
            handleMinSchools(e.target.value)
          }}
        />
        <TextInput
          id="contract-schools-max"
          value={filterSchools.max}
          labelText={capitalizeFirstLetter('max')}
          type="number"
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
            handleMaxSchools(e.target.value)
          }}
        />
      </Stack>
      <PopoverTitle title="contract_period" />
      <DatePicker
        value={filterDates.min}
        datePickerType="single"
        allowInput={false}
        onFocus={(e) => e.target.blur()}
        onChange={(dates) => handleMinDate(dates[0].toISOString())}
      >
        <DatePickerInput
          placeholder="yyyy/mm/dd"
          labelText={translate('start_date')}
          id="contract-start-date-filter"
          datePickerType="single"
        />
      </DatePicker>
      <DatePicker
        value={filterDates.max}
        datePickerType="single"
        allowInput={false}
        onFocus={(e) => e.target.blur()}
        onChange={(dates) => handleMaxDate(dates[0].toISOString())}
      >
        <DatePickerInput
          placeholder="yyyy/mm/dd"
          labelText={translate('end_date')}
          id="contract-end-date-filter"
          datePickerType="single"
        />
      </DatePicker>

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
