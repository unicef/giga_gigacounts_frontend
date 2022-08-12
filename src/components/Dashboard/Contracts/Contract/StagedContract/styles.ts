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

  .attachments-button {
    border: none;
    cursor: pointer;
    height: 32px;
    padding: 4px 8px 4px 4px;
    background-color: var(--color-white);
  }

  .attachments-button-selected {
    background-color: var(--color-lighter-blue);
    color: var(--color-white);
  }

  .widget {
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
`

export const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`
export const ContractNumber = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-darkest-grey);
`

export const LtaNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-mid-grey);
`
export const Attachments = styled.p`
  text-transform: capitalize;
  color: var(--color-darkest-grey);
  white-space: nowrap;
  text-decoration: underline;
`

export const AttachmentsDropdown = styled.div`
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

  a {
    display: grid;
    grid-template-columns: min-content max-content auto;
    align-items: center;
    gap: 16px;
  }
`
export const TitleItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  text-decoration: none;
`
export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const Dates = styled.div`
  display: grid;
  grid-template-columns: min-content 72px auto;
  gap: 6px;
  padding-left: 8px;

  & > p {
    color: var(--color-darkest-grey);
  }

  & > p > b {
    color: var(--color-blue);
  }
`
