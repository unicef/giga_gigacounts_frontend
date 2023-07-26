import { CheckmarkOutline, TrashCan } from '@carbon/icons-react'
// @ts-ignore
import { Button, Modal, TableCell, Tag } from '@carbon/react'
import TableRow, { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'
import { NotificationStatus } from 'src/@types'
import { NOTIFICATION_STATUS_COLORS } from 'src/constants/status'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { parseNotificationStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  row: any
  status: string
  selected: boolean
  rowProps: TableRowProps
  selectionProps: TableSelectRowProps
  handleReadRow: VoidFunction
  handleDeleteRow: VoidFunction
  handleSelectRow: (row: any) => void
}

export default function NotificationsTableRow({
  row,
  selected,
  handleReadRow,
  handleDeleteRow,
  handleSelectRow,
  rowProps,
  selectionProps
}: Props) {
  const { translate } = useLocales()

  const [title, status, message] = row.cells.map((c: { value: any }) => c.value)
  const confirm = useModal()

  const parsedStatus = parseNotificationStatus(status)

  return (
    <TableRow {...rowProps}>
      <TableSelectRow
        {...selectionProps}
        checked={selected}
        onSelect={(e) => {
          selectionProps.onSelect(e)
          handleSelectRow(row.id)
        }}
      />

      <TableCell>{title}</TableCell>
      <TableCell>
        <Tag type={NOTIFICATION_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.notification.${parsedStatus}`))}
        </Tag>
      </TableCell>

      <TableCell>{capitalizeFirstLetter(message)}</TableCell>

      <TableCell>
        {parsedStatus !== NotificationStatus.READ && (
          <Button
            kind="ghost"
            hasIconOnly
            renderIcon={CheckmarkOutline}
            iconDescription={capitalizeFirstLetter(translate('read'))}
            onClick={handleReadRow}
          />
        )}

        <Button
          kind="ghost"
          hasIconOnly
          renderIcon={TrashCan}
          iconDescription={capitalizeFirstLetter(translate('delete'))}
          onClick={confirm.open}
        />
      </TableCell>
      <TableCell>
        <Modal
          open={confirm.value}
          danger
          onRequestClose={confirm.close}
          modalLabel={capitalizeFirstLetter(translate('delete'))}
          modalHeading={translate('delete_confirm_item')}
          primaryButtonText={translate('delete')}
          secondaryButtonText={translate('cancel')}
          onRequestSubmit={() => {
            handleDeleteRow()
            confirm.close()
          }}
        />
      </TableCell>
    </TableRow>
  )
}
