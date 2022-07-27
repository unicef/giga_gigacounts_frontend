import styled from 'styled-components/macro'

export const SchoolContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10% 30% 20px;
  grid-template-rows: 1fr;
  gap: 0px 16px;
  width: 100%;
  height: 38px;
  padding: 9px 16px;
  white-space: nowrap;
  background-color: var(--color-white);
  color: var(--color-dark-grey);
`

export const SchoolName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
