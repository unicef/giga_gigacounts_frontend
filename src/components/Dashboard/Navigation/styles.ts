import styled from 'styled-components/macro'

export const StyledNav = styled.div<{ expanded: boolean }>`
  background-color: var(--color-dark-blue);
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  ${(props) =>
    props.expanded
      ? { width: '270px', padding: '8px 24px 16px 30px', transition: 'width .3s ease-out, padding .3s ease-out' }
      : { width: '72px', padding: '8px 6px 16px 8px', transition: 'width .5s ease-out, padding .3s ease-out' }}
`

export const StyledLogo = styled.img`
  align-self: start;
  height: 58px;
  cursor: pointer;
`
export const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--color-white-15);
  border-radius: 2px;
`

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
`
