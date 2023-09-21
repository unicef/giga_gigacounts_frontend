import { DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { MetricCamel, MetricSnake } from 'src/@types'
import { STRING_DEFAULT } from 'src/constants'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<
    ({
      date: string
      id: string
    } & { [K in MetricCamel]: number | null })[]
  >
  rowProps: TableRowProps
}

export default function SchoolMeasureTableRow({ row, rowProps }: Props) {
  const [date, uptime, latency, downloadSpeed, uploadSpeed] = getOrderedFromCells(
    [
      'date',
      MetricCamel.Uptime,
      MetricCamel.Latency,
      MetricCamel.DownloadSpeed,
      MetricCamel.UploadSpeed
    ],
    row.cells
  )

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ width: '20%' }}>{formatDate(date)}</TableCell>
      <TableCell style={{ width: '20%' }}>
        {uptime !== null ? `${uptime} ${getMetricLabel(MetricSnake.Uptime)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '20%' }}>
        {latency !== null ? `${latency} ${getMetricLabel(MetricSnake.Latency)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '20%' }}>
        {downloadSpeed !== null
          ? `${downloadSpeed} ${getMetricLabel(MetricSnake.DownloadSpeed)}`
          : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '20%' }}>
        {uploadSpeed !== null
          ? `${uploadSpeed} ${getMetricLabel(MetricSnake.UploadSpeed)}`
          : STRING_DEFAULT}
      </TableCell>
    </TableRow>
  )
}
