import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { EducationLevel } from 'src/@types'
import SchoolReliabilityTableFilters from './SchoolReliabilityTableFilters'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: (countryName: string) => void
  countryOptions: string[]
  countryName: string
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
}

export default function SchoolReliabilityTableToolbar({
  setPage,
  setFilterSearch,
  setFilterCountry,
  countryOptions,
  countryName,
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
          <SchoolReliabilityTableFilters
            countryName={countryName}
            closePopover={popover.close}
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            countryOptions={countryOptions}
            setFilterCountry={setFilterCountry}
            setFilterSearch={setFilterSearch}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
