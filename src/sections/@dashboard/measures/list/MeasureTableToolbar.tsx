import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { EducationLevel } from 'src/@types'
import MeasuresTableFilter from './MeasuresTableFilter'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  educationLevelOptions?: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
  filterEducationLevel?: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel?: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
}

export default function MeasureTableToolbar({
  setPage,
  setFilterSearch,
  setFilterEducationLevel,
  educationLevelOptions,
  filterEducationLevel
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
              closePopover={popover.close}
              educationLevelOptions={educationLevelOptions}
              filterEducationLevel={filterEducationLevel}
              setFilterEducationLevel={setFilterEducationLevel}
              setPage={setPage}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
