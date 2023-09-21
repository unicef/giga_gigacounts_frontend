import { Button, DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IContractSchools, ISchoolContact, ISchoolMeasures, MetricCamel } from 'src/@types'
import { CONNECTIVITY_STATUS_COLORS, ICONS, STRING_DEFAULT } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { getConnectivityStatus } from 'src/utils/connectivity'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import { ConnectivityDetailsDrawer } from '../form'

type Props = {
  row: DataTableRow<
    (IContractSchools & {
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
}

export default function ConnectivityTableRow({
  row,
  measures,
  rowProps,
  budget,
  currencyCode,
  contactInformation,
  expectedValues
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
      <TableCell style={{ width: '20%' }}>{threeDots(name, 50)}</TableCell>
      <TableCell style={{ width: '15%' }}>
        <Tag type={CONNECTIVITY_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.connectivity.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell style={{ width: '10%' }}>{external_id}</TableCell>

      <TableCell style={{ width: '10%' }}>
        {currencyCode} {budget ?? STRING_DEFAULT}
      </TableCell>

      <TableCell style={{ width: '10%' }}>{uptime}</TableCell>

      <TableCell style={{ width: '10%' }}>{latency}</TableCell>

      <TableCell style={{ width: '10%' }}>{downloadSpeed}</TableCell>
      <TableCell style={{ width: '10%' }}>{uploadSpeed}</TableCell>

      <TableCell style={{ width: '5%' }}>
        <Button
          kind="ghost"
          onClick={details.open}
          iconDescription={capitalizeFirstLetter(translate('view'))}
          hasIconOnly
          renderIcon={ICONS.View}
        />
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <ConnectivityDetailsDrawer
          schoolId={external_id}
          schoolName={name}
          expectedValues={expectedValues}
          contactInformation={contactInformation}
          measures={measures}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
