import styled from 'styled-components/macro'

export const PaymentContainer = styled.div`
  display: flex;
  width: 100%;
`

export const PaymentsRowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 24px;
  border-left: 2px solid var(--color-black-10);
`
export const PaymentsRowDetails = styled.div<{ active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--color-blue);
  ${({ active }) =>
    active && {
      color: 'var(--color-dark-blue)',
    }}

  small {
    color: var(--color-dark-grey);
    ${({ active }) =>
      active && {
        color: 'var(--color-light-blue)',
      }}
  }
`

export const MetricMidgetContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 50px 50px 70px 70px;
  grid-template-areas: 'm1  m2  m3  m4';
  align-items: center;
  gap: 6px;
  width: 230px;
`

export const WidgetMetric = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-darker-grey);
  ${({ active }) =>
    active && {
      color: 'var(--color-light-blue)',
    }};

  small > b {
    color: var(--color-dark-grey);
    ${({ active }) =>
      active && {
        color: 'var(--color-darkest-blue)',
      }}
  }
`

export const PaymentVerified = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  span {
    margin-right: 5px;
  }
  p {
    color: var(--color-darker-grey);
  }
`

export const PaymentsRowMetrics = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 44px;
`
