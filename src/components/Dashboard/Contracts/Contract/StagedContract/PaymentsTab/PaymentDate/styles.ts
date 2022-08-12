import styled from 'styled-components/macro'

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
    color: var(--color-darker-grey);
  }

  small {
    grid-area: month;
    color: var(--color-darkest-grey);
    margin-top: 4px;
  }

  span {
    grid-area: year;
    color: var(--color-mid-grey);
  }
`
