import { Button, Popover, PopoverContent, TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { MinMax, PaymentStatus, Setter } from 'src/@types'
import { DownloadCsv } from 'src/components/download'
import { FilterAll, ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import PaymentTableFilters from './PaymentTableFilters'

type Props = {
  setFilterStatus: Setter<PaymentStatus | FilterAll>
  setFilterSearch?: Setter<string>
  setPage: Dispatch<SetStateAction<number>>
  csvDownloadFileName: string
  csvDownloadData: Record<string, string | number>[]
  search?: boolean
  filterName?: string
  filterStatus: string
  countryName?: string
  countryOptions?: string[]
  setFilterCountry?: Setter<string>
  setFilterDates: MinMax<Setter<string>>
  filterDates: MinMax<string>
}

export default function PaymentTableToolbar({
  setFilterStatus,
  setPage,
  setFilterSearch,
  filterName,
  csvDownloadData,
  csvDownloadFileName,
  filterStatus,
  countryName,
  countryOptions,
  setFilterCountry,
  filterDates,
  setFilterDates,
  search = false
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterSearch = (value: string) => {
    if (setFilterSearch) setFilterSearch(value)
    setPage(1)
  }

  return (
    <>
      {search && (
        <TableToolbarSearch
          // @ts-ignore
          value={filterName}
          persistent
          placeholder={capitalizeFirstLetter(translate('search'))}
          onChange={(e: any) => handleFilterSearch(e.target.value)}
        />
      )}
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
            countryName={countryName}
            countryOptions={countryOptions}
            setFilterCountry={setFilterCountry}
            filterStatus={filterStatus}
            closePopover={popover.close}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
            filterDates={filterDates}
            setFilterDates={setFilterDates}
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
