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
    .file-link {
        width: 100%;
        color: var(--color-black);
        padding: 0 10px;
        white-space: nowrap;
    }
  }
`