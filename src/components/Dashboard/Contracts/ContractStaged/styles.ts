import styled from 'styled-components/macro'

export const ContractStagedContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 12px 24px 24px 12px;
  background: var(--color-white);
  margin: auto;
`
export const ContractStagedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 17px;
  border-bottom: 1px solid var(--color-light-grey);

  .title {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .contract-number {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-darkest-grey);
  }

  .lta-number {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-mid-grey);
  }

  .lta-number > {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-mid-grey);
  }

  .title-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-darkest-grey);
    white-space: nowrap;
    text-decoration: none;
  }

  .info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  button {
    height: auto;
    display: grid;
    grid-template-columns: auto min-content;
    grid-template-rows: auto;
    grid-template-areas:
      'title chart'
      'info chart';
    gap: 4px 16px;
    padding: 8px 16px;
    border: 1px solid var(--color-black-10);
    border-radius: 2px;
    background-color: var(--color-white);
    cursor: pointer;
  }

  .button-title {
    grid-area: title;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-mid-grey);
  }

  .button-info {
    grid-area: info;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .button-chart {
    grid-area: chart;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-metric {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-darker-grey);
  }

  .dates {
    display: grid;
    grid-template-columns: min-content 72px auto;
    gap: 6px;
    padding-left: 8px;
  }

  .dates > p {
    color: var(--color-darkest-grey);
  }

  .dates > p > b {
    color: var(--color-blue);
  }
`
