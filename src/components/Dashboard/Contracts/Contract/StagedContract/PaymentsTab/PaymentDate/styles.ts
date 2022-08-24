import styled from 'styled-components/macro'

export const PaymentDateContainer = styled.div<{ active?: boolean }>`
  display: grid;
  grid-template-columns: min-content 75px;
  grid-template-rows: auto;
  grid-template-areas:
    'date month'
    'date year';
  gap: 2px 8px;

  h4 {
    grid-area: date;
    color: var(--color-darker-grey);
    ${({ active }) =>
      active && {
        color: 'var(--color-dark-blue)',
      }}
  }

  small {
    grid-area: month;
    color: var(--color-darkest-grey);
    margin-top: 4px;
    ${({ active }) =>
      active && {
        color: 'var(--color-dark-blue)',
      }}
  }

  span {
    grid-area: year;
    color: var(--color-mid-grey);
    ${({ active }) =>
      active && {
        color: 'var(--color-light-blue)',
      }}
  }
`
