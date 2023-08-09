import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import UsersTableFilters from './UsersTableFilters'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: (countryName: string) => void
  countryOptions: string[]
  countryName: string
}

export default function UsersTableToolbar({
  setPage,
  setFilterSearch,
  setFilterCountry,
  countryOptions,
  countryName
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterName = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterName(e.target.value)} persistent />
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
          <UsersTableFilters
            countryName={countryName}
            closePopover={popover.close}
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
