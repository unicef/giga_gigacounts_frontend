import styled from 'styled-components/macro'

export const PaymentsTabContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`

export const PaymentRowWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-right: 14px;

  &:hover {
    overflow-y: scroll;
    padding-right: 0;
  }
`
