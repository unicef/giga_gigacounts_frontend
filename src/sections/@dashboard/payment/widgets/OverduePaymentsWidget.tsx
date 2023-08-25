import moment from 'moment'
import { IContractPayment, PaymentStatus } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'

export default function OverduePaymentsWidget({ payments }: { payments?: IContractPayment[] }) {
  const { translate } = useLocales()

  const headers = [
    { label: `${translate('payment')} #`, key: 'id' },
    { label: translate('contract_name'), key: 'contractName' },
    { label: translate('date_to'), key: 'dateTo' }
  ] as const

  const now = moment()

  const filteredPayments = payments?.filter(
    (payment) => moment(payment.dateTo).diff(now) < 0 && payment.status === PaymentStatus.Unpaid
  )

  return (
    <WidgetWrapper title={translate('widgets.overdue_payment.title')} width="100%" height="50dvh">
      <MiniList
        noDataText={translate('widgets.overdue_payment.no_data')}
        data={filteredPayments?.sort((a, b) => Number(a.id) - Number(b.id))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
