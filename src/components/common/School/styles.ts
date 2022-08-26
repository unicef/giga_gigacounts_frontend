import styled from 'styled-components/macro'

export const SchoolContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10% 30% min-content;
  grid-template-rows: 1fr;
  gap: 0px 16px;
  width: 100%;
  height: 38px;
  padding: 9px 16px;
  white-space: nowrap;
  background-color: inherit;
  cursor: pointer;

  span {
    overflow-y: scroll;
    overflow-x: hidden;
  }
`

export const SchoolName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
