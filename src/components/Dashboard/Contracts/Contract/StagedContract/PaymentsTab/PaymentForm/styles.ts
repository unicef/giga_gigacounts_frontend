import styled from 'styled-components/macro'

export const PaymentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 355px;
  border-left: 1px solid var(--color-light-grey);
  height: 100%;
`

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  overflow-y: hidden;
  padding: 16px 14px 0px 24px;

  &:hover {
    overflow-y: scroll;
    padding-right: 0;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--color-light-grey);
  }
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

export const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  .error-text {
    color: var(--color-red);
    font-size: 12px;
  }
`

export const Currency = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const CurrencyAmountWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  .input-container {
    width: 100%;
    height: 32px;
  }
`

export const InvoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h5 {
    color: var(--color-dark-blue);
  }
`
export const UploadFiles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  input[type='file'] {
    display: none;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 0px 12px 0px 24px;
  height: 32px;
`

export const SaveButton = styled.button<{ amountNotValid: boolean }>`
  background-color: var(--color-green);
  color: var(--color-white);
  width: 150px;

  &:active {
    background-color: var(--color-darker-green);
    color: var(--color-white);
    transition: all 0.1s ease-out;
  }
  ${({ amountNotValid }) =>
    amountNotValid && {
      backgroundColor: 'var(--color-light-grey)',
      color: 'var(--color-white)',
      pointerEvents: 'none',
    }}
`

export const CancelButton = styled.button`
  width: 150px;
`
