import { useState } from 'react'
import { IAttachment } from 'src/@types'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { KEY_DEFAULTS } from 'src/constants'
import useTable from 'src/hooks/useTable'
import { useLocales } from 'src/locales'
import {
  AttachmentsTableRow,
  AttachmentsTableToolbar
} from 'src/sections/@dashboard/attachments/list'

export default function AttachmentsTab({ attachments }: { attachments: IAttachment[] }) {
  const { translate } = useLocales()
  const [filterName, setFilterName] = useState('')

  const { page, setPage, rowsPerPage, setRowsPerPage } = useTable()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: KEY_DEFAULTS[0], header: '' }
  ]

  const dataFiltered = applyFilter({
    inputData: attachments,
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
      noDataText="table_no_data.attachments"
      title="Attachments table"
    />
  )
}

function applyFilter({ inputData, filterName }: { inputData: IAttachment[]; filterName: string }) {
  if (filterName !== '')
    inputData = inputData.filter((attachment) => filterName === attachment.name)

  return inputData
}
