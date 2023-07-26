import { TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'

type Props = {
  row: any
  rowProps: TableRowProps
}

export default function MeasureTableRow({ row, rowProps }: Props) {
  const [date, median_value, metric_name] = row.cells.map((c: { value: any }) => c.value)
  return (
    <TableRow {...rowProps}>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>{metric_name}</TableCell>
      <TableCell>{`${median_value} ${getMetricLabel(metric_name)}`}</TableCell>
    </TableRow>
  )
}
