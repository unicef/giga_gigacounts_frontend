import { PaymentDetailsContainer, PaymentHeader } from './styles'

const PaymentDetails: React.FC = (): JSX.Element => {
  return (
    <PaymentDetailsContainer>
      <PaymentHeader>
        <h5>Payment Details</h5>
        <small>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ultrices nunc, tortor ullamcorper. Amet
          placerat consequat eget faucibus in nec.
        </small>
      </PaymentHeader>
    </PaymentDetailsContainer>
  )
}

export default PaymentDetails
