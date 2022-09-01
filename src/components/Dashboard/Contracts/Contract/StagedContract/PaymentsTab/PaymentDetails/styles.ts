import styled from 'styled-components/macro'

export const PaymentReadonlyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-light-grey);

  font-size: 14px;
`

export const ReadonlyRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 32px 62px max-content;

  & > span:first-child {
    color: ;
  }
`
