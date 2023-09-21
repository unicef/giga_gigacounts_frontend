import { DataTableRow, Modal, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import {
  ContractStatus,
  IContractPayment,
  ICurrency,
  IFrequency,
  IPaymentConnection,
  Icon,
  PaymentStatus,
  Translation
} from 'src/@types'
import { changePaymentStatus, getPaymentConnection } from 'src/api/payments'
import { ActionButton } from 'src/components/action-button'
import { PAYMENT_STATUS_COLORS, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { parsePaymentStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import PaymentDetailsDrawer from '../form/PaymentDetailsDrawer'
import PaymentViewDrawer from '../form/PaymentViewDrawer'
import { PaymentConnectivityBar } from '../graph'

type Props = {
  row: DataTableRow<
    (IContractPayment & {
      contractName?: string
      contractCountryName?: string
    })[]
  >
  rowProps: TableRowProps
  refetchPayments: () => void
  contractId: string
  contractFrequency: IFrequency['name']
  contractStatus: ContractStatus
  currency?: ICurrency | null
  contractAutomatic: boolean
  payment: IContractPayment
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

  const [, dateTo, amount, status, , contractName] = getOrderedFromCells(
    ['_', 'dateTo', 'amount', 'status', '_', 'contractName'],
    row.cells
  )
  const parsedStatus = parsePaymentStatus(status)
  const canChangeStatus = canAdd(Views.payment) && !contractAutomatic
  const reject = useModal()
  const pay = useModal()
  const edit = useModal()
  const view = useModal()

  const isDraft = parsedStatus === PaymentStatus.Draft
  const isPaid = parsedStatus === PaymentStatus.Paid
  const canReject = isDraft && canChangeStatus
  const canApprove = !isPaid && canChangeStatus

  const [paymentConnection, setPaymentConnection] = useState<IPaymentConnection>()

  useEffect(() => {
    if (payment?.paidDate && contractId)
      getPaymentConnection(Number(contractId), payment.paidDate).then(setPaymentConnection)
  }, [payment?.paidDate, contractId])

  const absolutePerecentages = paymentConnection
    ? ([
        { color: 'success', percentage: paymentConnection.schoolsConnected.goodConnection },
        { color: 'warning', percentage: paymentConnection.schoolsConnected.badConnection },
        { color: 'error', percentage: paymentConnection.schoolsConnected.noConnection },
        { color: 'unknown', percentage: paymentConnection.schoolsConnected.unknownConnection }
      ] as const)
    : null

  const handleReject = () => {
    if (!canReject) return
    reject.close()
    changePaymentStatus(row.id, PaymentStatus.Unpaid)
      .then(() => {
        refetchPayments()
        pushSuccess('push.reject_payment')
      })
      .catch(() => pushError('push.reject_payment_error'))
  }

  const handleMarkAsPaid = () => {
    if (!canApprove) return
    pay.close()
    changePaymentStatus(row.id, PaymentStatus.Paid)
      .then(() => {
        refetchPayments()
        pushSuccess('push.pay_payment')
      })
      .catch(() => pushError('push.pay_payment_error'))
  }

  const options: { icon: Icon; label: Translation; onClick: () => void }[] = [
    {
      icon: 'View',
      label: 'view',
      onClick: view.open
    }
  ]
  if (canReject) {
    options.push({ icon: 'Edit', label: 'edit', onClick: edit.open })
    options.push({ icon: 'Close', label: 'decline', onClick: reject.open })
  }

  if (canApprove) {
    options.push({ icon: 'Fund', label: 'mark_as_paid', onClick: pay.open })
  }
  return (
    <TableRow {...rowProps}>
      <TableCell style={{ width: '10%' }}>{row.id}</TableCell>
      <TableCell style={{ width: '5%' }}>
        <Tag type={PAYMENT_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.payment.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell style={{ width: '20%' }}>
        {payment.dateFrom} {translate('to')} {dateTo}
      </TableCell>
      <TableCell
        style={{ width: contractName ? '10%' : '20%' }}
      >{`${currency?.code} ${amount}`}</TableCell>

      <TableCell style={{ width: '20%' }}>
        <PaymentConnectivityBar
          data={absolutePerecentages}
          dateFrom={payment?.dateFrom}
          dateTo={payment?.dateTo}
          numberOfSchools={contractNumberOfSchools}
          variant="status"
          tooltipAlign={(_, i) => (i === 0 ? 'right' : 'left')}
        />
      </TableCell>

      {contractName && <TableCell style={{ width: '10%' }}>{contractName}</TableCell>}

      <TableCell style={{ width: '25%' }}>
        {options.map((opt) => (
          <ActionButton
            key={row.id + opt.label}
            onClick={opt.onClick}
            description={opt.label}
            icon={opt.icon}
          />
        ))}
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <PaymentDetailsDrawer
          amount={amount}
          openView={view.open}
          paymentFrequency={contractFrequency}
          availablePayments={[payment.paidDate]}
          refetchPayments={refetchPayments}
          contract={{
            id: contractId,
            status: contractStatus,
            automatic: contractAutomatic,
            currency
          }}
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
          open={reject.value}
          modalHeading={capitalizeFirstLetter(translate('payment_reject_modal.content'))}
          modalLabel={capitalizeFirstLetter(translate('payment_reject_modal.title'))}
          primaryButtonText={capitalizeFirstLetter(translate('decline'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={reject.close}
          onRequestSubmit={handleReject}
        />
        <Modal
          open={pay.value}
          modalHeading={capitalizeFirstLetter(translate('payment_pay_modal.content'))}
          modalLabel={capitalizeFirstLetter(translate('payment_pay_modal.title'))}
          primaryButtonText={capitalizeFirstLetter(translate('mark_as_paid'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={pay.close}
          onRequestSubmit={handleMarkAsPaid}
        />
      </TableCell>
    </TableRow>
  )
}
