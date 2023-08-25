import { DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { STRING_DEFAULT } from 'src/constants'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
}

export default function MeasureTableRow({ row, rowProps }: Props) {
  const [school_name, school_external_id, date, uptime, latency, downloadSpeed, uploadSpeed] =
    getOrderedFromCells(
      [
        'school_name',
        'school_external_id',
        'date',
        'uptime',
        'latency',
        'downloadSpeed',
        'uploadSpeed'
      ],
      row.cells
    )

  return (
    <TableRow {...rowProps}>
      {school_name && <TableCell>{school_name}</TableCell>}
      {school_external_id && <TableCell>{school_external_id}</TableCell>}
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>{uptime ? `${uptime} ${getMetricLabel('uptime')}` : STRING_DEFAULT}</TableCell>
      <TableCell>{latency ? `${latency} ${getMetricLabel('latency')}` : STRING_DEFAULT}</TableCell>
      <TableCell>
        {downloadSpeed ? `${downloadSpeed} ${getMetricLabel('download_speed')}` : STRING_DEFAULT}
      </TableCell>
      <TableCell>
        {uploadSpeed ? `${uploadSpeed} ${getMetricLabel('upload_speed')}` : STRING_DEFAULT}
      </TableCell>
    </TableRow>
  )
}
