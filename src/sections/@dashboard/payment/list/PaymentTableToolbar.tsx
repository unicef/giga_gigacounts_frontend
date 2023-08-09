import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { PaymentStatus } from 'src/@types'
import { DownloadCsv } from 'src/components/download'
import { FILTER_ALL_DEFAULT, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import PaymentTableFilters from './PaymentTableFilters'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<PaymentStatus | typeof FILTER_ALL_DEFAULT>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  csvDownloadFileName: string
  csvDownloadData: Record<string, string | number>[]
}

export default function PaymentTableToolbar({
  setFilterStatus,
  setPage,
  setFilterSearch,
  csvDownloadData,
  csvDownloadFileName
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} />
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
          <PaymentTableFilters
            closePopover={popover.close}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
          />
        </PopoverContent>
      </Popover>
      {csvDownloadData.length > 0 && (
        <DownloadCsv
          type="button"
          label={capitalizeFirstLetter(translate('download'))}
          fileName={csvDownloadFileName}
          data={csvDownloadData}
        />
      )}
    </>
  )
}
