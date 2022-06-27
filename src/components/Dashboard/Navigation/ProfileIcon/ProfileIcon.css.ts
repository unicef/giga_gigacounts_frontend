import styled from 'styled-components/macro'

export const UserBlock = styled.div`
  width: 100%;
  display: grid;
  gap: 0 12px;
  grid-template-columns: min-content minmax(135px, auto) min-content;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'userpick name logout'
    'userpick role logout';
  background-color: var(--color-dark-blue);
  transition: all 0.2s ease-out;
`
