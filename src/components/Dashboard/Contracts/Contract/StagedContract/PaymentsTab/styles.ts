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
export const PaymentsRow = styled.div<{ active?: boolean; selectable?: boolean }>`
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
`
