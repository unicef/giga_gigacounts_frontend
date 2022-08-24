import styled from 'styled-components/macro'

export const UploadButtonWrapper = styled.div`
  display: flex;

  input[type='file'] {
    display: none;
  }
`

export const Button = styled.button`
  color: var(--color-white);
  background-color: var(--color-blue);
  cursor: pointer;

  &:active {
    background-color: var(--color-dark-blue);
  }

  &:disabled {
    background-color: var(--color-darker-grey);
    cursor: not-allowed;
  }
`
