import { CarbonIconType, CheckmarkOutline, Close, Edit, View } from '@carbon/icons-react'
import {
  Button,
  // @ts-ignore
  Modal,
  TableCell,
  TableRow,
  // @ts-ignore
  Tag
} from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useState } from 'react'
import {
  ContractStatus,
  IContractPayment,
  IFrequency,
  ISchoolsConnections,
  PaymentStatus
} from 'src/@types'
import { changePaymentStatus } from 'src/api/payments'
import PercentageBar from 'src/components/percentage-bar/PercentageBar'
import { Views } from 'src/constants/authorization'
import { PAYMENT_STATUS_COLORS } from 'src/constants/status'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { Translation, useLocales } from 'src/locales'
import { getContractSchoolDistribution } from 'src/utils/contracts'
import { parsePaymentStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'
import PaymentDetailsDrawer from '../form/PaymentDetailsDrawer'

type Props = {
  row: any
  rowProps: TableRowProps
  refetchPayments: () => void
  contractId: string
  contractFrequency: IFrequency['name']
  contractStatus: ContractStatus
  currencyCode?: string
  contractAutomatic: boolean
  metrics: ISchoolsConnections
  paidDate: { month: number; year: number }
  payment?: IContractPayment
}

export default function PaymentTableRow({
  row,
  rowProps,
  refetchPayments,
  contractId,
  metrics,
  contractFrequency,
  currencyCode,
  contractAutomatic,
  payment,
  contractStatus,
  paidDate
}: Props) {
  const { canAdd } = useAuthorization()
  const { translate } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()
  const [, dateFrom, amount, status, , contractName, contractCountryName] = row.cells.map(
    (c: { value: any }) => c.value
  )

  const parsedStatus = parsePaymentStatus(status)
  const canChangeStatus =
    canAdd(Views.payment) && parsedStatus === PaymentStatus.OnHold && !contractAutomatic

  const [viewOnly, setViewOnly] = useState(false)
  const approve = useModal()
  const reject = useModal()
  const details = useModal()

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
  const handleView = () => {
    details.open()
    setViewOnly(true)
  }
  const handleEdit = () => {
    details.open()
    setViewOnly(false)
  }

  const options: { icon: CarbonIconType; label: Translation; onClick: () => void }[] = [
    {
      icon: View,
      label: 'view',
      onClick: handleView
    }
  ]
  if (canChangeStatus) {
    options.push({ icon: Edit, label: 'edit', onClick: handleEdit })
    options.push({ icon: CheckmarkOutline, label: 'approve', onClick: approve.open })
    options.push({ icon: Close, label: 'decline', onClick: reject.open })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{dateFrom}</TableCell>
      <TableCell>{`${currencyCode} ${amount}`}</TableCell>
      <TableCell>
        <Tag type={PAYMENT_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.payment.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell>
        <PercentageBar width={240} data={getContractSchoolDistribution(metrics)} />
      </TableCell>

      {contractName && <TableCell>{contractName}</TableCell>}
      {contractCountryName && <TableCell>{contractCountryName}</TableCell>}

      <TableCell>
        {options.map((opt) => (
          <Button
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
          paymentFrequency={contractFrequency}
          availablePayments={[paidDate]}
          viewOnly={viewOnly}
          refetchPayments={refetchPayments}
          contract={{ id: contractId, status: contractStatus, automatic: contractAutomatic }}
          onClose={details.close}
          open={details.value}
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
