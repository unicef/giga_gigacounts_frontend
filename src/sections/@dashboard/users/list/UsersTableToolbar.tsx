import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter } from 'src/@types'
import { ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import UsersTableFilters from './UsersTableFilters'

type Props = {
  setFilterSearch: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: Setter<string>
  countryOptions: string[]
  countryName: string
  setFilterRole: Setter<string>
  roleOptions: string[]
  filterRole: string
  filterIsp: string
  setFilterIsp: Setter<string>
  ispOptions: string[]
  filterSearch: string
}

export default function UsersTableToolbar({
  setPage,
  setFilterSearch,
  setFilterCountry,
  countryOptions,
  countryName,
  filterRole,
  roleOptions,
  setFilterRole,
  filterIsp,
  ispOptions,
  setFilterIsp,
  filterSearch
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
          <UsersTableFilters
            filterIsp={filterIsp}
            ispOptions={ispOptions}
            setFilterIsp={setFilterIsp}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            roleOptions={roleOptions}
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
