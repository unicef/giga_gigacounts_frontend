import styled from 'styled-components/macro'

export const ContractDetailsContainer = styled.div`
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  h5 {
    color: var(--color-light-blue);
  }

  display: flex;
  gap: 54px;
  background: var(--color-white);
  margin: auto;
  height: 100%;
  width: 60%;
`
