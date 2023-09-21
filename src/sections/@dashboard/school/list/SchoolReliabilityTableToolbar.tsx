import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Setter } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import SchoolReliabilityTableFilters from './SchoolReliabilityTableFilters'

type Props = {
  setFilterSearch: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: Setter<string>
  countryOptions: string[]
  countryName: string
  educationLevelOptions: (EducationLevel | FilterAll)[]
  filterEducationLevel: string
  setFilterEducationLevel: Setter<string>
  regionOptions: string[]
  filterRegion: string
  setFilterRegion: Setter<string>
  filterSearch: string
}

export default function SchoolReliabilityTableToolbar({
  setPage,
  setFilterSearch,
  setFilterCountry,
  countryOptions,
  countryName,
  educationLevelOptions,
  filterEducationLevel,
  setFilterEducationLevel,
  regionOptions,
  filterRegion,
  filterSearch,
  setFilterRegion
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
        // @ts-ignore
        value={filterSearch}
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
          <SchoolReliabilityTableFilters
            regionOptions={regionOptions}
            filterRegion={filterRegion}
            setFilterRegion={setFilterRegion}
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
