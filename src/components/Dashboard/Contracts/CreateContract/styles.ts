import styled from 'styled-components/macro'

export const CreateContractContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  gap: 50px;
  background: var(--color-white);
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0px;
  width: 100%;
  border-bottom: 2px solid var(--color-lightest-blue);
`

export const FormHeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  height: 36px;

  & > div:first-child {
    padding: 2px 16px 10px 0px;
    gap: 10px;
    height: 36px;
    flex-grow: 1;
  }

  & > div:nth-child(2) {
    display: flex;
    gap: 8px;
  }

  h5 {
    height: 24px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150.5%;
    letter-spacing: 0.018em;
    text-transform: uppercase;
    color: var(--color-blue);
    order: 0;
    flex-grow: 1;
  }

  button {
    cursor: pointer;
  }
`

export const FormHeaderTabs = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  margin-bottom: -2px;

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid var(--color-lighter-blue);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selected {
    background-color: var(--color-blue);
    border: 2px solid var(--color-blue);
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 24px 6px 22px;
    gap: 8px;
    height: 38px;
    background: var(--color-lightest-blue);
    border-width: 2px 2px 0px 2px;
    border-style: solid;
    border-color: var(--color-lightest-blue);
    border-radius: 6px 6px 0px 0px;
    flex-grow: 0;
    z-index: 1;

    p {
      width: max-content;
      height: 24px;
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150.5%;
      letter-spacing: 0.018em;
      text-transform: uppercase;
      color: var(--color-light-blue);
    }

    &.active {
      background: var(--color-white);

      p {
        width: max-content;
        height: 24px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150.5%;
        letter-spacing: 0.018em;
        text-transform: uppercase;
        color: var(--color-dark-blue);
      }
    }
  }
`

export const FormHeaderMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 0px 6px;
  gap: 8px;
  width: 100%;

  & > p {
    height: 18px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 148%;
    letter-spacing: 0.018em;
    color: var(--color-blue);
  }
  .error {
    color: var(--color-red);
  }
`

export const GeneralContainer = styled.div`
  width: 100%;
  height: 100%;
`
