import { DefinitionTooltip } from '@carbon/react'
import moment from 'moment'
import { IContractPayment, PaymentStatus } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function OverduePaymentsWidget({ payments }: { payments?: IContractPayment[] }) {
  const { translate } = useLocales()

  const headers = [
    { header: `${translate('payment')} #`, key: 'id' },
    { header: translate('contract_name'), key: 'contractName' },
    { header: translate('date_to'), key: 'dateTo' },
    { header: translate('amount'), key: 'amount' }
  ] as const

  const now = moment()

  const filteredPayments = payments?.filter(
    (payment) => moment(payment.dateTo).isBefore(now) && payment.status === PaymentStatus.Unpaid
  )

  return (
    <WidgetWrapper
      title={
        <DefinitionTooltip
          openOnHover
          definition={
            <>
              {capitalizeFirstLetter(translate('tooltips.overdue_payments.line1'))}
              <br />
              {translate('tooltips.overdue_payments.line2')}
              <br />
              {translate('tooltips.overdue_payments.line3')}
            </>
          }
        >
          {translate('widgets.overdue_payment.title')}
        </DefinitionTooltip>
      }
      width="100%"
      height="50dvh"
    >
      <MiniList
        noDataText={translate('widgets.overdue_payment.no_data')}
        data={filteredPayments?.sort((a, b) => Number(a.id) - Number(b.id))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
