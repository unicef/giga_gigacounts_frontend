import styled from 'styled-components/macro'

export const ContractListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 58px 14px 58px;
  gap: 8px;
  isolation: isolate;
  height: 100vh;
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
    padding-right: 0;
  }
`
