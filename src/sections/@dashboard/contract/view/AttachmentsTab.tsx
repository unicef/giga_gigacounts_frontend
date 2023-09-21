import { IAttachment } from 'src/@types'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { KEY_DEFAULTS } from 'src/constants'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import useTable from 'src/hooks/useTable'
import { useLocales } from 'src/locales'
import {
  AttachmentsTableRow,
  AttachmentsTableToolbar
} from 'src/sections/@dashboard/attachments/list'

export default function AttachmentsTab({ attachments }: { attachments: IAttachment[] | null }) {
  const { translate } = useLocales()
  const [searchParams, generateSetter] = useCustomSearchParams({ filterAttachmentName: '' })
  const { filterAttachmentName: filterSearch } = searchParams
  const setFilterSearch = generateSetter('filterAttachmentName')

  const { page, setPage, rowsPerPage, setRowsPerPage } = useTable()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: KEY_DEFAULTS[0], header: '' }
  ]

  const dataFiltered = attachments
    ? applyFilter({
        inputData: attachments,
        filterSearch
      })
    : null

  const isEmpty = Boolean(attachments && !attachments.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  return (
    <CustomDataTable
      isSortable
      RowComponent={AttachmentsTableRow}
      getRowComponentProps={(row) => ({
        url: row.url
      })}
      ToolbarContent={
        <AttachmentsTableToolbar
          filterSearch={filterSearch}
          setFilterSearch={setFilterSearch}
          setPage={setPage}
        />
      }
      data={dataFiltered}
      page={page}
      setPage={setPage}
      isNotFound={isNotFound}
      isEmpty={isEmpty}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      tableHead={TABLE_HEAD}
      tableName="attachments"
      emptyText="table_no_data.attachments"
      title="Attachments table"
    />
  )
}

function applyFilter({
  inputData,
  filterSearch
}: {
  inputData: IAttachment[]
  filterSearch: string
}) {
  if (filterSearch !== '')
    inputData = inputData.filter((attachment) =>
      attachment.name.toLowerCase().includes(filterSearch.toLowerCase())
    )

  return inputData
}
