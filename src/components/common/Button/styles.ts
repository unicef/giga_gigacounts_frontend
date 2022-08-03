import styled from 'styled-components/macro'

export const ButtonComponent = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.012em;
  text-transform: uppercase;
  padding: 9px 16px;
  margin: 4px 0;
  border: none;
  color: var(--color-white);
  background-color: var(--color-blue);
  width: 100%;
  transition: all 0.2s ease-in;

  &:active {
    background-color: var(--color-dark-blue);
    color: var(--color-white);
    transition: all 0.1s ease-out;
  }
`
