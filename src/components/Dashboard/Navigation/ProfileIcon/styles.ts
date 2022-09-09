import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Profile = styled(NavLink)`
  text-decoration: none;

  flex-grow: 1;

  display: grid;
  gap: 0 12px;
  grid-template-columns: min-content minmax(100px, auto);
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'userIcon name'
    'userIcon role';
  align-items: center;
  background-color: var(--color-dark-blue);
  transition: all 0.2s ease-out;
  align-items: center;
`

export const UserBlock = styled.div<{ collapsed?: boolean }>`
  width: 100%;
  display: flex;
  gap: 0 12px;
  align-items: center;

  ${({ collapsed = false }) =>
    collapsed && {
      paddingLeft: '7px',
    }}
`
export const UserIcon = styled.div`
  grid-area: userIcon;
  align-self: start;
  height: 40px;
  width: fit-content;
  padding: 7px;
  margin-top: 2px;
  background-color: var(--color-light-blue);
  border: 2px solid var(--color-white-15);
  border-radius: 100px;
  cursor: pointer;
`

export const UserName = styled.p`
  grid-area: name;
  color: var(--color-white);
  margin: 0px;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const UserRole = styled.small`
  grid-area: role;
  color: var(--color-lightest-blue);
  margin: 0;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const UserLogout = styled.div`
  grid-area: logout;
  cursor: pointer;
`
