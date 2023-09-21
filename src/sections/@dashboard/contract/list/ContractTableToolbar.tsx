import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ContractStatus, MinMax, Setter } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import ContractTableFilters from './ContractTableFilters'

type Props = {
  setFilterStatus: Setter<ContractStatus | FilterAll>
  filterBudget: MinMax<string>
  filterSchools: MinMax<string>
  filterRegion: string
  filterIsp: string
  filterDates: MinMax<string>
  filterSearch: string
  setFilterSearch: Setter<string>
  setFilterRegion: Setter<string>
  setFilterSchools: MinMax<Setter<string>>
  setFilterBudget: MinMax<Setter<string>>
  setFilterIsp: Setter<string>
  setFilterDates: MinMax<Setter<string>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  filterStatus: string
  ispOptions: string[]
}

export default function ContractTableToolbar({
  setFilterStatus,
  setPage,
  filterBudget,
  filterSchools,
  filterIsp,
  filterSearch,
  filterRegion,
  filterDates,
  regionOptions,
  ispOptions,
  setFilterSearch,
  setFilterRegion,
  setFilterSchools,
  setFilterBudget,
  setFilterDates,
  setFilterIsp,
  filterStatus
}: Props) {
  const popover = useModal()

  const { translate } = useLocales()

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch
        // @ts-ignore
        value={filterSearch}
        persistent
        placeholder={capitalizeFirstLetter(translate('search'))}
        onChange={(e: any) => handleFilterSearch(e ? e.target.value : '')}
      />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          id="contract-filter"
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={ICONS.Filter}
          tooltipAlignment="end"
          tooltipPosition="bottom"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <ContractTableFilters
            filterStatus={filterStatus}
            closePopover={popover.close}
            filterIsp={filterIsp}
            filterRegion={filterRegion}
            filterBudget={filterBudget}
            filterSchools={filterSchools}
            filterDates={filterDates}
            regionOptions={regionOptions}
            ispOptions={ispOptions}
            setFilterBudget={setFilterBudget}
            setFilterRegion={setFilterRegion}
            setFilterSchools={setFilterSchools}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setFilterIsp={setFilterIsp}
            setFilterDates={setFilterDates}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
