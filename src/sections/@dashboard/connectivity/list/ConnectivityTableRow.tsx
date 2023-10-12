import { DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IContractSchools, ISchoolContact, ISchoolMeasures, MetricCamel } from 'src/@types'
import { ActionButton } from 'src/components/action'
import { CONNECTIVITY_STATUS_COLORS, STRING_DEFAULT } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { getConnectivityStatus } from 'src/utils/connectivity'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import { ConnectivityDetailsDrawer } from '../form'

type Props = {
  row: DataTableRow<
    (IContractSchools & {
      school_id: string
      external_id: string
      location_1: string
      location_2: string
      location_3: string
      connectivityValue: number | null
    } & { [K in MetricCamel]: string })[]
  >
  rowProps: TableRowProps
  contractId?: string
  budget?: string
  currencyCode?: string
  contactInformation: ISchoolContact
  expectedValues: { [K in MetricCamel]: number }
  measures: ISchoolMeasures[]
  schoolId: string
}

export default function ConnectivityTableRow({
  row,
  rowProps,
  budget,
  currencyCode,
  contactInformation,
  expectedValues,
  schoolId
}: Props) {
  const { translate } = useLocales()
  const details = useModal()

  const [name, connectivityValue, external_id, uptime, latency, downloadSpeed, uploadSpeed] =
    getOrderedFromCells(
      [
        'name',
        'connectivityValue',
        'external_id',
        MetricCamel.Uptime,
        MetricCamel.Latency,
        MetricCamel.DownloadSpeed,
        MetricCamel.UploadSpeed
      ],
      row.cells
    )
  const parsedStatus = getConnectivityStatus(connectivityValue)

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: '20%' }}>{threeDots(name, 50)}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        <Tag type={CONNECTIVITY_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.connectivity.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{external_id}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        {currencyCode} {budget ?? STRING_DEFAULT}
      </TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{uptime}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{latency}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{downloadSpeed}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{uploadSpeed}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '5%' }}>
        <ActionButton onClick={details.open} description="view" icon="View" />
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <ConnectivityDetailsDrawer
          schoolExternalId={external_id}
          schoolId={schoolId}
          schoolName={name}
          expectedValues={expectedValues}
          contactInformation={contactInformation}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
