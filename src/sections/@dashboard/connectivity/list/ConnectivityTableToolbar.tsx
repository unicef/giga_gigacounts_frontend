import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ConnectivityStatus, EducationLevel, MinMax, Setter } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import ConnectivityTableFilters from './ConnectivityTableFilters'

type Props = {
  filterBudget?: MinMax<string>
  setFilterBudget?: MinMax<Setter<string>>
  setFilterSearch: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  educationLevelOptions: (EducationLevel | FilterAll)[]
  filterEducationLevel: string
  setFilterEducationLevel: Setter<EducationLevel | FilterAll>
  filterRegion: string
  setFilterRegion: Setter<string>
  regionOptions: string[]
  setFilterStatus: Setter<ConnectivityStatus | FilterAll>
  filterSearch: string
  filterStatus: string
}

export default function ConnectivityTableToolbar({
  filterSearch,
  filterBudget,
  setFilterBudget,
  setPage,
  setFilterSearch,
  educationLevelOptions,
  filterEducationLevel,
  setFilterEducationLevel,
  filterRegion,
  regionOptions,
  setFilterRegion,
  setFilterStatus,
  filterStatus
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

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
        onChange={(e: any) => handleFilterSearch(e.target.value)}
      />

      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={ICONS.Filter}
          hasIconOnly
          iconDescription={translate('filter')}
          tooltipPosition="bottom"
          tooltipAlignment="end"
        />
        <PopoverContent>
          <ConnectivityTableFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterRegion={filterRegion}
            regionOptions={regionOptions}
            setFilterRegion={setFilterRegion}
            closePopover={popover.close}
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            filterBudget={filterBudget}
            setFilterBudget={setFilterBudget}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
