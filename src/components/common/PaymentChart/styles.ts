import styled from 'styled-components/macro'

export const PaymentChartContainer = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2px;
  border-radius: 2px;
  overflow: hidden;
`

export const PaymentChartLow = styled.div<{ value: number }>`
  width: ${(props) => props.value + '%'};
  height: 100%;
  background-color: var(--color-red);
  padding: 0 6px;
  text-align: right;
  color: var(--color-white);
  min-width: 30px;
`

export const PaymentChartAverage = styled.div<{ value: number }>`
  width: ${(props) => props.value + '%'};
  height: 100%;
  background-color: var(--color-orange);
  padding: 0 6px;
  text-align: right;
  color: var(--color-white);
  min-width: 30px;
`

export const PaymentChartGood = styled.div<{ value: number }>`
  width: ${(props) => props.value + '%'};
  height: 100%;
  background-color: var(--color-green);
  padding: 0 6px;
  text-align: right;
  color: var(--color-white);
  min-width: 30px;
`
