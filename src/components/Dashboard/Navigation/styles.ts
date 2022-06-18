import styled from 'styled-components';

export const StyledNav = styled.div`
  background-color: var(--color-dark-blue);
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100vh;
`;

export const StyledLogo = styled.img`
  align-self: start;
  height: 58px;
`;
export const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--color-white-15);
  border-radius: 2px;
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
`;
