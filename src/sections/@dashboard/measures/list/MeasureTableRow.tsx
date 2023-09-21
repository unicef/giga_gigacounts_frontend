import { DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { ISchoolContact, ISchoolMeasures, MetricCamel, MetricSnake } from 'src/@types'
import { ActionButton } from 'src/components/action-button'
import { CONNECTIVITY_STATUS_COLORS, STRING_DEFAULT } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { getConnectivityStatus } from 'src/utils/connectivity'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import { ConnectivityDetailsDrawer } from '../../connectivity/form'

type Props = {
  row: DataTableRow<
    ({
      school_name?: string
      school_external_id?: string
      date: string
      id: string
      connectivityValue: number | null
    } & { [K in MetricCamel]: number | null })[]
  >
  rowProps: TableRowProps
  contactInformation: ISchoolContact
  measures: ISchoolMeasures[]
}

export default function MeasureTableRow({ row, rowProps, contactInformation, measures }: Props) {
  const [
    school_name,
    connectivityValue,
    school_external_id,
    date,
    uptime,
    latency,
    downloadSpeed,
    uploadSpeed
  ] = getOrderedFromCells(
    [
      'school_name',
      'connectivityValue',
      'school_external_id',
      'date',
      MetricCamel.Uptime,
      MetricCamel.Latency,
      MetricCamel.DownloadSpeed,
      MetricCamel.UploadSpeed
    ],
    row.cells
  )
  const { translate } = useLocales()
  const details = useModal()

  const parsedStatus = getConnectivityStatus(connectivityValue)

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ width: '15%' }}>{threeDots(school_name, 50)}</TableCell>
      <TableCell style={{ width: '10%' }}>
        <Tag type={CONNECTIVITY_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.connectivity.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell style={{ width: '10%' }}>{school_external_id}</TableCell>
      <TableCell style={{ width: '10%' }}>{formatDate(date)}</TableCell>
      <TableCell style={{ width: '11.25%' }}>
        {uptime ? `${uptime} ${getMetricLabel(MetricSnake.Uptime)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '11.25%' }}>
        {latency ? `${latency} ${getMetricLabel(MetricSnake.Latency)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '11.25%' }}>
        {downloadSpeed
          ? `${downloadSpeed} ${getMetricLabel(MetricSnake.DownloadSpeed)}`
          : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '11.25%' }}>
        {uploadSpeed ? `${uploadSpeed} ${getMetricLabel(MetricSnake.UploadSpeed)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: '10%' }}>
        <ActionButton onClick={details.open} description="view" icon="View" />
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <ConnectivityDetailsDrawer
          schoolId={school_external_id}
          schoolName={school_name}
          contactInformation={contactInformation}
          measures={measures}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
