import styled from 'styled-components/macro'

export const NavItemContainer = styled.div<{ collapsed: boolean }>`
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
  transition: all 0.2s ease-out;
  ${(props) => props.collapsed && { paddingLeft: '16px' }}
`

export const StatusAndNumber = styled.p<{ selected: boolean; isNumber?: boolean }>`
  width: 100%;
  ${(props) => props.isNumber && { textAlign: 'end' }}
  ${(props) =>
    props.selected
      ? {
          fontWeight: 'bold',
          color: 'var(--color-white)',
        }
      : {
          fontWeight: 'normal',
          color: 'var(--color-lightest-blue)',
        }};
`
