import { Pagination } from '@carbon/react'
import { useLocales } from 'src/locales'

type Props = {
  id: string
  count: number
  page?: number
  rowsPerPage?: number
  onChangePagination: (e: any) => void
  rowsPerPageOptions?: number[]
}

export default function TablePaginationCustom({
  id,
  count,
  rowsPerPageOptions = [5, 10, 25],
  onChangePagination,
  page,
  rowsPerPage
}: Props) {
  const { translate } = useLocales()
  return (
    <Pagination
      id={id}
      onChange={onChangePagination}
      backwardText={translate('previous_page')}
      forwardText={translate('next_page')}
      itemsPerPageText={translate('items_per_page')}
      itemRangeText={(min: number, max: number, total: number) =>
        `${min}-${max} ${translate('of')} ${total} ${translate('items')}`
      }
      page={page}
      pageNumberText={translate('page_number')}
      pageRangeText={(_: number, total: number) =>
        ` ${translate('of')} ${total} ${translate('pages')}`
      }
      pageSize={rowsPerPage}
      pageSizes={rowsPerPageOptions}
      totalItems={count}
    />
  )
}
