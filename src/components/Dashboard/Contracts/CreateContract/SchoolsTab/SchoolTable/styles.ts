import styled from 'styled-components/macro'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  gap: 10px;
`

export const SchoolsTableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(20px, 8%) 1fr minmax(62px, 16%);
  align-items: baseline;
  width: 100%;
  padding: 8px 16px 8px 0;
  gap: 8px;
  border-bottom: 1px solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  height: 38px;
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

export const SchoolsNumberBadge = styled.span`
  color: var(--color-light-blue);
  min-width: 16px;
  display: inline-block;
  text-align: center;
  cursor: default;
  user-select: none;
`

export const IdHeaderLabel = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.003em;
  text-align: right;
  color: var(--color-dark-grey);
  padding-right: 14px;
`

export const SchoolTableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 0 1 auto;
  overflow: hidden;
  padding-right: 14px;

  &:hover {
    overflow-y: scroll;
    padding-right: 0;
  }

  & > :nth-child(even) {
    background-color: var(--color-lightest-grey);
  }
`

export const TableRow = styled.label`
  display: inline-grid;
  width: 100%;
  grid-template-columns: minmax(20px, 8%) 1fr minmax(62px, 16%);
  justify-items: start;
  align-items: center;
  padding: 8px 16px 8px 0;
  cursor: pointer;
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
  margin-left: auto;
`
