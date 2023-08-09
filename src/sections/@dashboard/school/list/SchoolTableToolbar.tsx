import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { EducationLevel } from 'src/@types'
import SchoolTableFilters from './SchoolTableFilters'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setFilterRegion: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  regionOptions: string[]
  filterRegion: string
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
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
      <TableToolbarSearch onChange={(e: any) => handleFilterName(e.target.value)} />
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
