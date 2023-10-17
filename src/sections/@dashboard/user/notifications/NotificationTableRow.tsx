import { DataTableRow, Modal, TableCell, Tag } from '@carbon/react'
import TableRow, { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'
import { INotification, NotificationStatus } from 'src/@types'
import { ActionLink } from 'src/components/action'
import { Stack } from 'src/components/stack'
import { NOTIFICATION_STATUS_COLORS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDateTime } from 'src/utils/date'
import { parseNotificationStatus } from 'src/utils/status'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<INotification[]>
  rowProps: TableRowProps
  selectionProps: TableSelectRowProps
  handleReadRow: (id: string) => void
  handleDeleteRow: (id: string) => void
}

export default function NotificationsTableRow({
  row,
  handleReadRow,
  handleDeleteRow,
  rowProps,
  selectionProps
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()

  const [title, status, message, sentAt] = getOrderedFromCells<INotification>(
    ['title', 'status', 'message', 'sent_at'],
    row.cells
  )

  const confirm = useModal()

  const parsedStatus = parseNotificationStatus(status)

  return (
    <TableRow {...rowProps}>
      <TableSelectRow {...selectionProps} />

      <TableCell style={{ width: '20%' }}>{title}</TableCell>
      <TableCell style={{ width: '15%' }}>
        <Tag type={NOTIFICATION_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.notification.${parsedStatus}`))}
        </Tag>
      </TableCell>

      <TableCell style={{ width: '30%' }}>
        {threeDots(capitalizeFirstLetter(message as string), 150)}
      </TableCell>
      <TableCell style={{ width: '15%' }}>
        {formatDateTime(sentAt, '/', { seconds: false })}
      </TableCell>

      <TableCell style={{ width: '15%' }}>
        <Stack alignItems="center" orientation="horizontal" gap={spacing.xs}>
          <ActionLink
            variant="error"
            icon="Delete"
            description="delete"
            onClick={() => confirm.open()}
          />
          {parsedStatus !== NotificationStatus.READ && (
            <ActionLink
              variant="success"
              icon="Success"
              description="read"
              onClick={() => handleReadRow(row.id)}
            />
          )}
        </Stack>
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <Modal
          open={confirm.value}
          danger
          onRequestClose={confirm.close}
          modalLabel={capitalizeFirstLetter(translate('delete'))}
          modalHeading={capitalizeFirstLetter(translate('delete_confirm_item'))}
          primaryButtonText={capitalizeFirstLetter(translate('delete'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestSubmit={() => {
            handleDeleteRow(row.id)
            confirm.close()
          }}
        />
      </TableCell>
    </TableRow>
  )
}
