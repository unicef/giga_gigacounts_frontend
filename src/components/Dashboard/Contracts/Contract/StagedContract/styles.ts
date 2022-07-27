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
    position: relative;
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

  .attachments-dropdown {
    position: absolute;
    right: 100px;
    top: 40px;
    min-width: 290px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
    background-color: var(--color-white);
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.1);
    }

  .attachments-dropdown > a {
    display: grid;
    grid-template-columns: min-content max-content auto;
    align-items: center;
    gap: 16px;
  }

  .attachments-button {
    border: none;
    cursor: pointer;
    height: 32px;
    padding: 4px 8px 4px 4px;
  }

  .attachments-button-selected {
    background-color: var(--color-lighter-blue);
    color: var(--color-white);
  }

  .attachments {
      text-transform: capitalize;
      color: var(--color-darkest-grey);
      white-space: nowrap;
      text-decoration: underline;
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

    & > small {
      width: 100%
      height: 100%;
      margin: auto;
      position: absolute;
      color: var(--color-blue);
    }
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
