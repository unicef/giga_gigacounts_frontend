import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, MinMax } from 'src/@types'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import ConnectivityTableFilters from './ConnectivityTableFilters'

type Props = {
  filterBudget?: MinMax
  setFilterBudget?: Dispatch<SetStateAction<MinMax>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
}

export default function ConnectivityTableToolbar({
  filterBudget,
  setFilterBudget,
  setPage,
  setFilterSearch,
  educationLevelOptions,
  filterEducationLevel,
  setFilterEducationLevel
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterSearch(e.target.value)}
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
