import styled from 'styled-components/macro'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
`

export const LabelContainer = styled.div`
  align-self: flex-start;
  witdh: 20%;
`

export const Label = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.003em;
  color: var(--color-darkest-grey);
`

export const ToggleGroupContainer = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: 80% 20%;
  justify-items: end;
  align-items: center;
`

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 10px;
  align-items: baseline;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: baseline;
  align-self: flex-end;

  & > input {
    width: 60%;
    height: 32px;
  }

  & > span {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 156%;
    letter-spacing: 0.003em;
    color: var(--color-darker-grey);
    width: 10%;
  }
`
