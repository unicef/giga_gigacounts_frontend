import styled from 'styled-components';

export const StyledButton = styled.div`
  p {
    color: var(--color-white);
  }
  background-color: var(--color-dark-blue);
  display: flex;
  align-items: center;
  padding: 0px;
  cursor: pointer;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const StyledIcon = styled.img`
  width: '1em';
  height: '1em';
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const StyledLabel = styled.div`
  flex: none;
  order: 1;
  flex-grow: 1;
`;

export const StyledContractCount = styled.div`
  flex: none;
  order: 2;
  flex-grow: 0;
`;
