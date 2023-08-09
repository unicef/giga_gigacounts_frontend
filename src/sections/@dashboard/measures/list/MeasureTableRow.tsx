import { DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
}

export default function MeasureTableRow({ row, rowProps }: Props) {
  const [school_name, school_external_id, date, metric_name, median_value] = getOrderedFromCells(
    ['school_name', 'school_external_id', 'date', 'metric_name', 'median_value'],
    row.cells
  )

  return (
    <TableRow {...rowProps}>
      {school_name && <TableCell>{school_name}</TableCell>}
      {school_external_id && <TableCell>{school_external_id}</TableCell>}
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>{metric_name}</TableCell>
      <TableCell>{`${median_value} ${getMetricLabel(metric_name)}`}</TableCell>
    </TableRow>
  )
}
