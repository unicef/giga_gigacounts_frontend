import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ContractStatus, MinMax } from 'src/@types'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import ContractTableFilters from './ContractTableFilters'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<ContractStatus | typeof FILTER_ALL_DEFAULT>>
  filterBudget: MinMax
  filterSchools: MinMax
  filterRegion: string
  filterIsp: string
  setFilterSearch: Dispatch<SetStateAction<string>>
  setFilterRegion: Dispatch<SetStateAction<string>>
  setFilterSchools: Dispatch<SetStateAction<MinMax>>
  setFilterBudget: Dispatch<SetStateAction<MinMax>>
  setFilterIsp: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  ispOptions: string[]
}

export default function ContractTableToolbar({
  setFilterStatus,
  setPage,
  filterBudget,
  filterSchools,
  filterIsp,
  filterRegion,
  regionOptions,
  ispOptions,
  setFilterSearch,
  setFilterRegion,
  setFilterSchools,
  setFilterBudget,
  setFilterIsp
}: Props) {
  const popover = useModal()

  const { translate } = useLocales()

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
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
            closePopover={popover.close}
            filterIsp={filterIsp}
            filterRegion={filterRegion}
            filterBudget={filterBudget}
            filterSchools={filterSchools}
            regionOptions={regionOptions}
            ispOptions={ispOptions}
            setFilterBudget={setFilterBudget}
            setFilterRegion={setFilterRegion}
            setFilterSchools={setFilterSchools}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setFilterIsp={setFilterIsp}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
