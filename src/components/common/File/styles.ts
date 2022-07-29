import styled from 'styled-components/macro'

export const FileContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: min-content 34px auto min-content;
    align-items: center;
    gap: 2px;
    padding: 4px 0;
    background-color: var(--color-white);

    &:hover {
        background-color: var(--color-lightest-blue);
    }

    .file-type {
        color: var(--color-dark-blue);
        text-transform: uppercase;
    }
  }
`

export const DownloadButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  display: inline;
  color: var(--color-black);
  padding: 0 10px;
  white-space: nowrap;
  font-weight: normal;
  text-decoration: underline;
  text-transform: none;
  text-align: left;
`

export const DeleteButton = styled.button`
  background-color: transparent;
  padding: 0 8px;
  cursor: pointer;

  &:disabled {
    cursor: hourglass;
    color: var(--color-light-gray);
  }
`
