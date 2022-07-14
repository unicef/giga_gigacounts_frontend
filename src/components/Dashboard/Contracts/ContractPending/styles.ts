import styled from 'styled-components/macro'

export const ContractPendingContainer = styled.div`
  margin: auto;
  height: 100vh;
  width: 100%;
  padding: 16px 32px 24px;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-temmplate-rows: auto;
  grid-template-areas:
    'header header'
    'info schools';
  gap: 40px;
  h5 {
    color: var(--color-dark-blue);
    margin-bottom: 16px;
  }
`
export const ContractPendingHeader = styled.div`
  grid-area: header;
  width: 100%;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--color-light-grey);

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const ContractPendingInfo = styled.div`
  grid-area: info;
`

export const ContractPendingSchools = styled.div`
  grid-area: schools;
`
export const ContractPendingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ContractPendingLine = styled.div`
  display: grid;
  grid-template-columns: 24px 130px auto auto;
  gap: 0 6px;

  p > b {
    color: var(--color-dark-blue);
  }
`
