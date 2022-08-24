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

  .addNewPayment {
    max-width: fit-content;
  }

  svg {
    margin: auto;
    width: 40px;
  }
`

export const PaymentDateContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 75px;
  grid-template-rows: auto;
  grid-template-areas:
    'date month'
    'date year';
  gap: 2px 8px;

  h4 {
    grid-area: date;
    color: var(--color-light-grey);
  }

  small {
    grid-area: month;
    color: var(--color-light-grey);
    margin-top: 4px;
  }

  span {
    grid-area: year;
    color: var(--color-light-grey);
  }
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

export const PaymentsRowMetrics = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 44px;
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
