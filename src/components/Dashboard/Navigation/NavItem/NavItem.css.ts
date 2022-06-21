import styled from 'styled-components';

export const Label = styled.div`
  p {
    white-space: nowrap;
  }
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: var(--color-dark-blue);
  transition: all .2s ease-out;
`;