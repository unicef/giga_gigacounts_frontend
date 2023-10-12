import { DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { ISchoolContact, MetricCamel, MetricSnake } from 'src/@types'
import { ActionButton } from 'src/components/action'
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
      school_id: string
      school_name?: string
      school_external_id?: string
      date: string
      id: string
      connectivityValue: number | null
    } & { [K in MetricCamel]: number | null })[]
  >
  rowProps: TableRowProps
  contactInformation: ISchoolContact
  schoolId: string
}

export default function MeasureTableRow({ row, rowProps, contactInformation, schoolId }: Props) {
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
      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        {threeDots(school_name, 50)}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        <Tag type={CONNECTIVITY_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.connectivity.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{school_external_id}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{formatDate(date)}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '11.25%' }}>
        {uptime ? `${uptime} ${getMetricLabel(MetricSnake.Uptime)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '11.25%' }}>
        {latency ? `${latency} ${getMetricLabel(MetricSnake.Latency)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '11.25%' }}>
        {downloadSpeed
          ? `${downloadSpeed} ${getMetricLabel(MetricSnake.DownloadSpeed)}`
          : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '11.25%' }}>
        {uploadSpeed ? `${uploadSpeed} ${getMetricLabel(MetricSnake.UploadSpeed)}` : STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        <ActionButton onClick={details.open} description="view" icon="View" />
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <ConnectivityDetailsDrawer
          schoolId={schoolId}
          schoolExternalId={school_external_id}
          schoolName={school_name}
          contactInformation={contactInformation}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
