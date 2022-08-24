import styled from 'styled-components/macro'

export const SchoolQoSContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 355px;
  border-left: 1px solid var(--color-light-grey);
`

export const SchoolHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px 0px 24px;

  & > h5 {
    color: var(--color-dark-blue);
  }
  & > small {
    color: var(--color-darkest-grey);
  }
`
export const SchoolContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0px 12px 0px 24px;
`
export const SchoolTableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--color-light-grey);
  align-items: center;
`
export const SchoolTableContent = styled.div`
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
export const SchoolTableSection = styled.div`
  display: grid;
  grid-template-columns: auto repeat(3, max-content);
  gap: 0 4px;
  align-items: center;
  padding: 16px 8px 10px;
  & > h6 {
    color: var(--color-blue);
  }
`

export const SchoolTableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 7px 8px;
`
export const SchoolTableRowMetric = styled.div`
  display: flex;
  gap: 4px;
`
