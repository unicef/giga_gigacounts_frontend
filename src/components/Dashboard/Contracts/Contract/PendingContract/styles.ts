import styled from 'styled-components/macro'

export const ContractPendingContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding: 16px 32px 24px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  h5 {
    color: var(--color-dark-blue);
  }

  hr {
    margin: 0;
    border-color: var(--color-black-10);
  }

  .title {
    grid-area: header;
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-light-grey);
  }

  .contract-number {
    width: 100%;
    color: var(--color-darkest-grey);
  }

  .lta-number {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-mid-grey);
  }

  .notice {
    color: var(--color-blue);
  }

  .title-item {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    text-decoration: none;
  }

  .content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0 54px;
  }

  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .info-line {
    width: 100%;
    display: grid;
    grid-template-columns: min-content 133px max-content max-content;
    gap: 0 6px;
  }

  .info-line > p > b {
    color: var(--color-dark-blue);
  }

  .info-dates {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .info-qos {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .info-qos-metrics {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .info-attachments {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .info-attachments-file {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .schools {
    height: 100%;
    isolation: isolate;
    overflow: hidden;
    padding-right: 14px;

    & :hover {
      overflow-y: scroll;
      padding-right: 0;
    }

    & > :nth-child(even) {
      background-color: var(--color-lightest-grey);
    }
  }
`
export const ContractPendingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
