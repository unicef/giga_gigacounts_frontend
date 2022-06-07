import styled from 'styled-components';

export const StyledNav = styled.div`
  background-color: var(--color-dark-blue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 24px 16px 30px;
  gap: 34px;
  position: relative;
  width: 228px;
  height: 100vh;
`;

export const StyledLogo = styled.img`
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const StyledDivider = styled.div`
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;
  width: 58px;
  height: 100%;
  flex: none;
  order: 1;
  align-self: stretch;
`;
