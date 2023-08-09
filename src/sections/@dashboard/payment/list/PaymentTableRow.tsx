import { Button, DataTableRow, Modal, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import {
  ContractStatus,
  IContractPayment,
  ICurrency,
  IFrequency,
  ISchoolsConnections,
  Icon,
  PaymentStatus,
  Translation
} from 'src/@types'
import { changePaymentStatus } from 'src/api/payments'
import { InfoToggletip } from 'src/components/info-toggletip'
import PercentageBar from 'src/components/percentage-bar/PercentageBar'
import { Stack } from 'src/components/stack'
import { ICONS, PAYMENT_STATUS_COLORS, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getContractSchoolDistribution } from 'src/utils/contracts'
import { parsePaymentStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import PaymentDetailsDrawer from '../form/PaymentDetailsDrawer'
import PaymentViewDrawer from '../form/PaymentViewDrawer'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
  refetchPayments: () => void
  contractId: string
  contractFrequency: IFrequency['name']
  contractStatus: ContractStatus
  currency?: ICurrency
  contractAutomatic: boolean
  metrics: ISchoolsConnections
  paidDate: { month: number; year: number }
  payment: IContractPayment
  dateFrom: string
  contractNumberOfSchools: number
}

export default function PaymentTableRow({
  row,
  rowProps,
  refetchPayments,
  contractId,
  contractFrequency,
  currency,
  contractAutomatic,
  payment,
  contractStatus,
  contractNumberOfSchools
}: Props) {
  const { canAdd } = useAuthorization()
  const { translate } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()
  const { spacing } = useTheme()
  const [, dateTo, amount, status, , contractName, contractCountryName] = getOrderedFromCells(
    ['id', 'dateTo', 'amount', 'status', 'connections', 'contractName', 'contractCountryName'],
    row.cells
  )
  const parsedStatus = parsePaymentStatus(status)
  const canChangeStatus =
    canAdd(Views.payment) && parsedStatus === PaymentStatus.OnHold && !contractAutomatic

  const approve = useModal()
  const reject = useModal()
  const edit = useModal()
  const view = useModal()

  const handleApprove = () => {
    if (parsedStatus !== PaymentStatus.OnHold || !canChangeStatus) return
    approve.close()
    changePaymentStatus(row.id, PaymentStatus.Verified)
      .then(() => {
        refetchPayments()
        pushSuccess('push.approve_payment')
      })
      .catch(() => pushError('push.approve_payment_error'))
  }
  const handleReject = () => {
    if (parsedStatus !== PaymentStatus.OnHold || !canChangeStatus) return
    reject.close()
    changePaymentStatus(row.id, PaymentStatus.Unpaid)
      .then(() => {
        refetchPayments()
        pushSuccess('push.reject_payment')
      })
      .catch(() => pushError('push.reject_payment_error'))
  }

  const options: { icon: Icon; label: Translation; onClick: () => void }[] = [
    {
      icon: ICONS.View,
      label: 'view',
      onClick: view.open
    }
  ]
  if (canChangeStatus) {
    options.push({ icon: ICONS.Edit, label: 'edit', onClick: edit.open })
    options.push({ icon: ICONS.SuccessOutline, label: 'approve', onClick: approve.open })
    options.push({ icon: ICONS.Close, label: 'decline', onClick: reject.open })
  }
  return (
    <TableRow {...rowProps}>
      <TableCell>{row.id}</TableCell>
      <TableCell>
        {payment.dateFrom} {translate('to')} {dateTo}
      </TableCell>
      <TableCell>{`${currency?.code} ${amount}`}</TableCell>
      <TableCell>
        <Tag type={PAYMENT_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.payment.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell>
        <Stack
          orientation="horizontal"
          gap={spacing.md}
          alignItems="center"
          justifyContent="flex-start"
        >
          <InfoToggletip
            title={`${contractNumberOfSchools * payment.metrics.allEqualOrAboveAvg} ${translate(
              'schools_connected_out_of'
            )} ${contractNumberOfSchools} ${translate('during')} ${payment.dateFrom} ${translate(
              'to'
            )} ${dateTo}`}
          />
          <PercentageBar width={240} data={getContractSchoolDistribution(payment.metrics)} />
        </Stack>
      </TableCell>

      {contractName && <TableCell>{contractName}</TableCell>}
      {contractCountryName && <TableCell>{contractCountryName}</TableCell>}

      <TableCell>
        {options.map((opt) => (
          <Button
            style={{ margin: 0, padding: 0 }}
            key={row.id + opt.label}
            kind="ghost"
            onClick={opt.onClick}
            iconDescription={capitalizeFirstLetter(translate(opt.label))}
            renderIcon={opt.icon}
            hasIconOnly
          />
        ))}
      </TableCell>
      <TableCell>
        <PaymentDetailsDrawer
          openView={view.open}
          paymentFrequency={contractFrequency}
          availablePayments={[payment.paidDate]}
          refetchPayments={refetchPayments}
          contract={{ id: contractId, status: contractStatus, automatic: contractAutomatic, currency }}
          onClose={edit.close}
          open={edit.value}
          payment={payment}
        />
        <PaymentViewDrawer
          handleEdit={() => {
            view.close()
            edit.open()
          }}
          paymentFrequency={contractFrequency}
          contract={{ id: contractId, status: contractStatus, automatic: contractAutomatic }}
          onClose={view.close}
          open={view.value}
          payment={payment}
        />
        <Modal
          open={approve.value}
          modalHeading={translate('payment_approve_modal.content')}
          modalLabel={translate('payment_approve_modal.title')}
          primaryButtonText={translate('approve')}
          secondaryButtonText={translate('cancel')}
          onRequestClose={approve.close}
          onRequestSubmit={handleApprove}
        />
        <Modal
          open={reject.value}
          modalHeading={translate('payment_reject_modal.content')}
          modalLabel={translate('payment_reject_modal.title')}
          primaryButtonText={translate('decline')}
          secondaryButtonText={translate('cancel')}
          onRequestClose={reject.close}
          onRequestSubmit={handleReject}
        />
      </TableCell>
    </TableRow>
  )
}
