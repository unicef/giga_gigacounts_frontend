import { Button, Dropdown, Tag, TextInput } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ContractStatus, MinMax } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, CONTRACT_STATUS_COLORS } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  filterRegion: string
  filterIsp: string
  filterBudget: MinMax
  filterSchools: MinMax
  setFilterStatus: Dispatch<SetStateAction<ContractStatus | typeof FILTER_ALL_DEFAULT>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setFilterRegion: Dispatch<SetStateAction<string>>
  setFilterIsp: Dispatch<SetStateAction<string>>
  setFilterSchools: Dispatch<SetStateAction<MinMax>>
  setFilterBudget: Dispatch<SetStateAction<MinMax>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  ispOptions: string[]
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
  setFilterSearch,
  closePopover
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()

  const handleFilter = (filterChange: () => void) => {
    setPage(1)
    filterChange()
  }

  const handleFilterCountry = (country: string) => handleFilter(() => setFilterRegion(country))
  const handleFilterIsp = (country: string) => handleFilter(() => setFilterIsp(country))

  const handleMaxBudget = (max: string) =>
    handleFilter(() => setFilterBudget((prev) => ({ ...prev, max })))

  const handleMinBudget = (min: string) =>
    handleFilter(() => setFilterBudget((prev) => ({ ...prev, min })))

  const handleMaxSchools = (max: string) =>
    handleFilter(() => setFilterSchools((prev) => ({ ...prev, max })))

  const handleMinSchools = (min: string) =>
    handleFilter(() => setFilterSchools((prev) => ({ ...prev, min })))

  const handleFilterStatus = (status: ContractStatus | typeof FILTER_ALL_DEFAULT) =>
    handleFilter(() => setFilterStatus(status))

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterSearch('')
    setFilterRegion(FILTER_ALL_DEFAULT)
    setFilterIsp(FILTER_ALL_DEFAULT)
    setFilterStatus(FILTER_ALL_DEFAULT)
    setFilterBudget({ min: '', max: '' })
    setFilterSchools({ min: '', max: '' })
  }
  return (
    <Stack style={{ padding: spacing.md }} orientation="vertical">
      <PopoverTitle title="status" />
      <Stack orientation="horizontal">
        {STATUS_OPTIONS.slice(0, 3).map((opt) => (
          <Tag
            key={opt}
            style={{ border: 'none' }}
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
            style={{ border: 'none' }}
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
        id="region-filter"
        items={regionOptions}
        itemToString={(item) =>
          item === FILTER_ALL_DEFAULT
            ? capitalizeFirstLetter(translate(item))
            : capitalizeFirstLetter(item)
        }
        selectedItem={filterRegion}
        onChange={(data) => handleFilterCountry(data.selectedItem ?? FILTER_ALL_DEFAULT)}
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        disabled={regionOptions.length <= 1}
      />
      <PopoverTitle title="isp" />
      <Dropdown
        id="isp-filter"
        items={ispOptions}
        itemToString={(item) =>
          item === FILTER_ALL_DEFAULT
            ? capitalizeFirstLetter(translate(item))
            : capitalizeFirstLetter(item)
        }
        selectedItem={filterIsp}
        onChange={(data) => handleFilterIsp(data.selectedItem ?? FILTER_ALL_DEFAULT)}
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
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
