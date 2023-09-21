import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter, Web3TransactionStatus } from 'src/@types'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import TransactionTableFilters from './TransactionTableFilters'

type Props = {
  setFilterStatus: Setter<Web3TransactionStatus | FilterAll>
  setFilterSearch: Setter<string>
  filterSearch: string
  setPage: Dispatch<SetStateAction<number>>
  filterStatus: string
}

export default function TransactionTableToolbar({
  setFilterStatus,
  setPage,
  setFilterSearch,
  filterSearch,
  filterStatus
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
        // @ts-ignore
        value={filterSearch}
        persistent
        placeholder={capitalizeFirstLetter(translate('search'))}
        onChange={(e: any) => handleFilterSearch(e.target.value)}
      />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={ICONS.Filter}
          tooltipAlignment="end"
          tooltipPosition="bottom"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <TransactionTableFilters
            filterStatus={filterStatus}
            closePopover={popover.close}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
