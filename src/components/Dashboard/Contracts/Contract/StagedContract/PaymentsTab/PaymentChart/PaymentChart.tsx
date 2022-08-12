import { PaymentChartContainer, PaymentChartLow, PaymentChartAverage, PaymentChartGood } from './styles'

interface PaymentChartProps {
  low?: number
  average?: number
  good?: number
}

const PaymentChart: React.FC<PaymentChartProps> = ({
  low = 10,
  average = 20,
  good = 70,
}: PaymentChartProps): JSX.Element => {
  return (
    <PaymentChartContainer>
      <PaymentChartLow value={low}>
        <small>
          <b>{low}%</b>
        </small>
      </PaymentChartLow>
      <PaymentChartAverage value={average}>
        <small>
          <b>{average}%</b>
        </small>
      </PaymentChartAverage>
      <PaymentChartGood value={good}>
        <small>
          <b>{good}%</b>
        </small>
      </PaymentChartGood>
    </PaymentChartContainer>
  )
}

export default PaymentChart
