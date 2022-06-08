import styled from 'styled-components';

export const StyledBlock = styled.div`
  h5 {
    color: var(--color-white);
  }
  background-color: var(--color-dark-blue);
  display: flex;
  align-items: center;
  padding: 0px 2px;
  gap: 12px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const StyledImg = styled.img`
  width: '1em';
  height: '1em';
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const StyledLabel = styled.h5`
  flex: none;
  order: 1;
  flex-grow: 0;
`;
