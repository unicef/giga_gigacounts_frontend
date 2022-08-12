import styled from 'styled-components/macro'

export const PaymentsTabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const PaymentsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 12px;
  gap: 16px;
`

export const PaymentsRowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 24px;
  border-left: 2px solid var(--color-black-10);
`
export const PaymentsRowDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--color-dark-blue);

  small {
    color: var(--color-dark-grey);
  }
`

export const PaymentVerified = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  span {
    margin-right: 5px;
  }
`

export const PaymentsRowMetrics = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 44px;
`
