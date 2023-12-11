import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter } from 'src/@types'
import { ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import UsersApprovalTableFilters from './UsersApprovalTableFilters'

type Props = {
  setFilterSearch: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  setFilterRole: Setter<string>
  roleOptions: string[]
  filterRole: string
  filterSearch: string
}

export default function UsersApprovalTableToolbar({
  setPage,
  setFilterSearch,
  filterRole,
  roleOptions,
  setFilterRole,
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
          <UsersApprovalTableFilters
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            roleOptions={roleOptions}
            closePopover={popover.close}
            setFilterSearch={setFilterSearch}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
