import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Setter } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import SchoolTableFilters from './SchoolTableFilters'

type Props = {
  setFilterSearch: Setter<string>
  setFilterRegion: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  filterRegion: string
  educationLevelOptions: (EducationLevel | FilterAll)[]
  filterEducationLevel: string
  setFilterEducationLevel: Setter<EducationLevel | FilterAll>
}

export default function SchoolTableToolbar({
  setPage,
  setFilterSearch,
  setFilterRegion,
  regionOptions,
  filterRegion,
  educationLevelOptions,
  filterEducationLevel,
  setFilterEducationLevel
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterName = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch
        persistent
        placeholder={capitalizeFirstLetter(translate('search'))}
        onChange={(e: any) => handleFilterName(e.target.value)}
      />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={ICONS.Filter}
          tooltipPosition="bottom"
          tooltipAlignment="end"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <SchoolTableFilters
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            filterRegion={filterRegion}
            setFilterSearch={setFilterSearch}
            closePopover={popover.close}
            regionOptions={regionOptions}
            setFilterRegion={setFilterRegion}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
