import styled from 'styled-components/macro'

export const PaymentsTabContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > div:first-child {
    width: 100%;
  }
`
export const PaymentsRow = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 12px;
  gap: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-white)')};

  :nth-child(even) {
    background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-lightest-grey)')};
  }
`
