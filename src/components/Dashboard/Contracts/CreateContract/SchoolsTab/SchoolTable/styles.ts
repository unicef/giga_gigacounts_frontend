import styled from 'styled-components/macro'

export const MainContainer = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: 100%;
  justify-items: center;
  align-items: baseline;
  place-items: center;
  gap: 10px;
`

export const SchoolsTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`

export const NameHeaderLabel = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  align-self: flex-start;
  color: var(--color-dark-grey);
`

export const IdHeaderLabel = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.003em;
  align-self: flex-end;
  color: var(--color-dark-grey);
`

export const TableRow = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: 5% 85% 10%;
  justify-items: start;
  align-items: center;
`

export const SelectButton = styled.input`
  width: 100%;
  align-self: flex-start;
`

export const SchoolNameContainer = styled.div`
  align-self: center;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.003em;
  color: var(--color-black);
`

export const SchoolIDContainer = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.003em;
  color: var(--color-darker-grey);
  align-self: center;
`