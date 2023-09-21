import { Button, DataTableRow, Modal, TableCell, Tag } from '@carbon/react'
import TableRow, { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'
import { INotification, NotificationStatus } from 'src/@types'
import { ICONS, NOTIFICATION_STATUS_COLORS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
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

  const [title, status, message] = getOrderedFromCells<INotification>(
    ['title', 'status', 'message'],
    row.cells
  )

  const confirm = useModal()

  const parsedStatus = parseNotificationStatus(status)

  return (
    <TableRow {...rowProps}>
      <TableSelectRow {...selectionProps} />

      <TableCell style={{ width: '35%' }}>{title}</TableCell>
      <TableCell style={{ width: '15%' }}>
        <Tag type={NOTIFICATION_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.notification.${parsedStatus}`))}
        </Tag>
      </TableCell>

      <TableCell style={{ width: '35%' }}>
        {threeDots(capitalizeFirstLetter(message as string), 150)}
      </TableCell>

      <TableCell style={{ width: '15%' }}>
        {parsedStatus !== NotificationStatus.READ && (
          <Button
            kind="ghost"
            hasIconOnly
            renderIcon={ICONS.Success}
            iconDescription={capitalizeFirstLetter(translate('read'))}
            onClick={() => handleReadRow(row.id)}
          />
        )}

        <Button
          kind="ghost"
          hasIconOnly
          renderIcon={ICONS.Delete}
          iconDescription={capitalizeFirstLetter(translate('delete'))}
          onClick={() => confirm.open()}
        />
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
