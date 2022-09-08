import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Profile = styled(NavLink)`
  text-decoration: none;
`

export const UserBlock = styled.div`
  width: 100%;
  display: grid;
  gap: 0 12px;
  grid-template-columns: min-content minmax(135px, auto) min-content;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'userIcon name logout'
    'userIcon role logout';
  background-color: var(--color-dark-blue);
  transition: all 0.2s ease-out;
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
`

export const UserRole = styled.small`
  grid-area: role;
  color: var(--color-lightest-blue);
  margin: 0;
  text-align: start;
`

export const UserLogout = styled.div`
  grid-area: logout;
  cursor: pointer;
`
