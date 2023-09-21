import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ConnectivityStatus, EducationLevel, Setter } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import MeasuresTableFilter from './MeasuresTableFilter'

type Props = {
  setFilterSearch: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  filterName: string
  educationLevelOptions?: (EducationLevel | FilterAll)[]
  filterEducationLevel: string
  setFilterEducationLevel: Setter<string>
  setFilterCountry: Setter<string>
  filterRegion: string
  setFilterRegion: Setter<string>
  regionOptions: string[]
  countryOptions: string[]
  countryName: string
  setFilterStatus: Setter<ConnectivityStatus | FilterAll>
  filterStatus: string
}

export default function MeasureTableToolbar({
  setPage,
  setFilterSearch,
  setFilterRegion,
  filterRegion,
  regionOptions,
  setFilterEducationLevel,
  educationLevelOptions,
  filterEducationLevel,
  setFilterCountry,
  countryOptions,
  countryName,
  setFilterStatus,
  filterName,
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
        value={filterName}
        persistent
        placeholder={capitalizeFirstLetter(translate('search'))}
        onChange={(e: any) => handleFilterSearch(e.target.value)}
      />
      {setFilterEducationLevel && educationLevelOptions && filterEducationLevel && (
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
            <MeasuresTableFilter
              filterStatus={filterStatus}
              countryName={countryName}
              countryOptions={countryOptions}
              closePopover={popover.close}
              setFilterRegion={setFilterRegion}
              filterRegion={filterRegion}
              regionOptions={regionOptions}
              educationLevelOptions={educationLevelOptions}
              filterEducationLevel={filterEducationLevel}
              setFilterCountry={setFilterCountry}
              setFilterEducationLevel={setFilterEducationLevel}
              setPage={setPage}
              setFilterStatus={setFilterStatus}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
