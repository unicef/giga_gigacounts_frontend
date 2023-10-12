import { DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IAttachment } from 'src/@types'
import { ActionButton } from 'src/components/action'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<IAttachment[]>
  rowProps: TableRowProps
  url: string
}

export default function AttachmentsTableRow({ row, rowProps, url }: Props) {
  const [name] = getOrderedFromCells(['name'], row.cells)

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: '90%' }}>{name}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        <ActionButton onClick={() => window.open(url)} description="download" icon="Download" />
      </TableCell>
    </TableRow>
  )
}
