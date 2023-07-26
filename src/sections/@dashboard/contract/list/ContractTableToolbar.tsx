import { Filter } from '@carbon/icons-react'
import {
  Button,
  Dropdown,
  Popover,
  PopoverContent,
  TableToolbarSearch,
  // @ts-ignore
  Tag,
  TextInput
} from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ContractStatus } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { CONTRACT_STATUS_COLORS } from 'src/constants/status'
import { useModal } from 'src/hooks/useModal'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<ContractStatus | 'all'>>
  filterBudget: { min: string; max: string }
  filterSchools: { min: string; max: string }
  setFilterSearch: Dispatch<SetStateAction<string>>
  setFilterRegion: Dispatch<SetStateAction<string>>
  setFilterSchools: Dispatch<SetStateAction<{ min: string; max: string }>>
  setFilterBudget: Dispatch<SetStateAction<{ min: string; max: string }>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
}

export default function ContractTableToolbar({
  setFilterStatus,
  setPage,
  filterBudget,
  filterSchools,
  regionOptions,
  setFilterSearch,
  setFilterRegion,
  setFilterSchools,
  setFilterBudget
}: Props) {
  const popover = useModal()

  const { translate } = useLocales()
  const { spacing } = useTheme()

  const statusOptions = ['all', ...Object.values(ContractStatus)] as const

  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterRegion(country)
  }
  const handleMaxBudget = (max: string) => {
    setPage(1)
    setFilterBudget((prev) => ({ ...prev, max }))
  }
  const handleMinBudget = (min: string) => {
    setPage(1)
    setFilterBudget((prev) => ({ ...prev, min }))
  }
  const handleMaxSchools = (max: string) => {
    setPage(1)
    setFilterSchools((prev) => ({ ...prev, max }))
  }
  const handleMinSchools = (min: string) => {
    setPage(1)
    setFilterSchools((prev) => ({ ...prev, min }))
  }
  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  const handleResetFilter = () => {
    popover.close()
    setPage(1)
    setFilterSearch('')
    setFilterRegion('all')
    setFilterStatus('all')
    setFilterBudget({ min: '', max: '' })
    setFilterSchools({ min: '', max: '' })
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} persistent />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={Filter}
          tooltipAlignment="end"
          tooltipPosition="bottom"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <Stack style={{ padding: spacing.md }} orientation="vertical">
            <Typography as="h6">{capitalizeFirstLetter(translate('status'))}</Typography>
            <Stack orientation="horizontal" style={{ marginBlock: spacing.sm }}>
              {statusOptions.slice(0, 3).map((opt) => (
                <Tag
                  key={opt}
                  style={{ border: 'none' }}
                  onClick={() => setFilterStatus(opt)}
                  type={opt === 'all' ? 'gray' : CONTRACT_STATUS_COLORS[opt]}
                >
                  {capitalizeFirstLetter(translate(opt as Translation))}
                </Tag>
              ))}
            </Stack>
            <Stack orientation="horizontal">
              {statusOptions.slice(3).map((opt) => (
                <Tag
                  key={opt}
                  style={{ border: 'none' }}
                  onClick={() => setFilterStatus(opt)}
                  type={opt === 'all' ? 'gray' : CONTRACT_STATUS_COLORS[opt]}
                >
                  {capitalizeFirstLetter(translate(opt as Translation))}
                </Tag>
              ))}
            </Stack>

            <Typography as="h6" style={{ marginBlock: spacing.sm }}>
              {capitalizeFirstLetter(translate('country'))}
            </Typography>
            <Dropdown
              id="region filter"
              items={regionOptions}
              onChange={(data) => handleFilterCountry(data.selectedItem ?? 'all')}
              label={capitalizeFirstLetter(translate('all'))}
            />
            <Typography as="h6" style={{ marginBlock: spacing.sm }}>
              {capitalizeFirstLetter(translate('contract_budget'))}
            </Typography>
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
            <Typography as="h6" style={{ marginBlock: spacing.sm }}>
              {capitalizeFirstLetter(translate('number_of_schools'))}
            </Typography>
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
        </PopoverContent>
      </Popover>
    </>
  )
}
