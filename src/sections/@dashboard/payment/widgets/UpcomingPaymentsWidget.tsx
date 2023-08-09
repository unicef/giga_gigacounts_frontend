import moment from 'moment'
import { IContractPayment, PaymentStatus } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function UpcomingPaymentsWidget({ payments }: { payments?: IContractPayment[] }) {
  const { translate } = useLocales()
  const { palette } = useTheme()

  const headers = [
    { label: `${translate('payment')} #`, key: 'id' },
    { label: translate('contract_name'), key: 'contractName' },
    { label: translate('date_to'), key: 'dateTo' }
  ] as const

  const now = moment()

  const filteredPayments = payments?.filter(
    (payment) => moment(payment.dateTo).diff(now) > 0 && payment.status === PaymentStatus.Unpaid
  )

  return (
    <WidgetWrapper
      Icon={ICONS.Payment}
      iconColor={palette.warning.main}
      title="Upcoming payments"
      width="33%"
      height="50%"
    >
      <MiniList
        noDataText="No upcoming payments"
        data={filteredPayments?.sort((a, b) => Number(a.id) - Number(b.id))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
