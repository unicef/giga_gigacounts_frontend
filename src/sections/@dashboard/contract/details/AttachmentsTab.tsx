import { useState } from 'react'
import { IAttachment } from 'src/@types'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import useTable from 'src/hooks/useTable'
import { useLocales } from 'src/locales'
import { AttachmentsTableRow, AttachmentsTableToolbar } from 'src/sections/attachments/list'
import { getComparator } from 'src/utils/table'

export default function AttachmentsTab({ attachments }: { attachments: IAttachment[] }) {
  const { translate } = useLocales()
  const [filterName, setFilterName] = useState('')

  const { page, setPage, rowsPerPage, setRowsPerPage, order, orderBy } = useTable()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: '', header: '' }
  ]

  const dataFiltered = applyFilter({
    inputData: attachments,
    comparator: getComparator(order, orderBy),
    filterName
  })

  const isNotFound = !dataFiltered.length

  return (
    <CustomDataTable
      isSortable
      RowComponent={AttachmentsTableRow}
      getRowComponentProps={(row) => ({
        url: row.url
      })}
      ToolbarContent={<AttachmentsTableToolbar setFilterSearch={setFilterName} setPage={setPage} />}
      data={dataFiltered}
      page={page}
      setPage={setPage}
      isNotFound={isNotFound}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      tableHead={TABLE_HEAD}
      tableName="attachments"
      title="Attachments table"
    />
  )
}

function applyFilter({
  inputData,
  comparator,
  filterName
}: {
  inputData: IAttachment[]
  comparator: (a: any, b: any) => number
  filterName: string
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterName !== '') {
    inputData = inputData.filter((attachment) => filterName === attachment.name)
  }

  return inputData
}
