import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Web3TransactionStatus } from 'src/@types'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import TransactionTableFilters from './TransactionTableFilters'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<Web3TransactionStatus | typeof FILTER_ALL_DEFAULT>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

export default function TransactionTableToolbar({
  setFilterStatus,
  setPage,
  setFilterSearch
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} persistent />
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
