import { Button } from 'src/components/common/Button/Button'
import styled from 'styled-components/macro'

export const PaymentsRow = styled.div<{ active?: boolean; selectable?: boolean; dirty?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 12px;
  gap: 16px;
  height: 82px;
  cursor: ${({ selectable = true }) => (selectable ? 'pointer' : 'auto')};
  background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-white)')};

  :nth-child(even) {
    background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-lightest-grey)')};
  }

  ${({ dirty = false }) => dirty && 'box-shadow: inset 0px 0px 4px 1px var(--color-orange-on-blue);'}
`

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

export const CreatePaymentButton = styled(Button)`
  max-width: fit-content;
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

export const PaymentStatus = styled.div`
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
