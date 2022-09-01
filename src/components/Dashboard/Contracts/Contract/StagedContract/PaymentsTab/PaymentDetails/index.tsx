import { IContractPayment } from 'src/types/general'
import FormattedDate from 'src/components/common/Date'
import { formatAmount } from 'src/utils/formatAmount'
import { CurrencyAmountWrapper, CurrencyContainer } from '../PaymentForm/styles'
import { PaymentReadonlyDetails, ReadonlyRow } from './styles'

interface IPaymentDetailsProps {
  payment: IContractPayment
}

const PaymentDetails: React.FC<IPaymentDetailsProps> = ({ payment }: IPaymentDetailsProps): JSX.Element => (
  <PaymentReadonlyDetails>
    <h6>{payment?.description}</h6>
    <CurrencyContainer>
      <CurrencyAmountWrapper>
        <ReadonlyRow>
          <span className="icon icon-24 icon-date icon-light-blue" />
          <span className="icon-darker-grey">Terms:</span>
          <p className="icon-dark-blue">
            <FormattedDate date={payment.dateFrom} fontWeight={600} />
            {' - '}
            <FormattedDate date={payment.dateTo} fontWeight={600} />
          </p>
        </ReadonlyRow>
      </CurrencyAmountWrapper>
    </CurrencyContainer>
    <CurrencyContainer>
      <CurrencyAmountWrapper>
        <ReadonlyRow>
          <span className="icon icon-24 icon-coins icon-light-blue" />
          <span className="icon-darker-grey">{payment.currency.code}</span>
          <p className="icon-dark-blue">
            <b>{formatAmount(payment.amount)}</b>
          </p>
        </ReadonlyRow>
      </CurrencyAmountWrapper>
    </CurrencyContainer>
  </PaymentReadonlyDetails>
)

export default PaymentDetails
