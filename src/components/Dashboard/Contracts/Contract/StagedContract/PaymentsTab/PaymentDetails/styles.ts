import styled from 'styled-components/macro'

export const PaymentDetailsContainer = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 12px 24px 24px;
  border-left: 1px solid var(--color-light-grey);
`

export const PaymentHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > h5 {
    color: var(--color-dark-blue);
  }
  & > small {
    color: var(--color-darkest-grey);
  }
`
