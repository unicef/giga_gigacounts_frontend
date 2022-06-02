import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledButton = styled.div`
    p {
      color: var(--color-white)
    }
    background-color: var(--color-dark-blue);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    height: 40px;

    flex: none;
    order: 2;
    flex-grow: 0;
`

const StyledIcon = styled.img`
    width: 40px;
    height: 40px;

    /* Primary/Light Blue */

    background: var(--color-light-blue);
    border-radius: 100px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    
`

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 
`

const Name = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    width: 124px;
    height: 22px;


    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`

const Role = styled.p`
    width: 124px;
    height: 18px;

    /* Small */

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 148%;
    margin: 0;

    letter-spacing: 0.018em;

    color: var(--color-light-blue);

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
`

const NameText = styled.p`
    width: 102px;
    height: 22px;

    /* P Bold */

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 156%;
    margin: 0;

    letter-spacing: 0.003em;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;
`

interface NavItemProps {
  collapsed?: boolean;
  name?: string;
  onClick?: () => void;
  role? : string;
}

/**
 * Primary UI component for user interaction
 */
export const ProfileIcon = ({
  collapsed = false,
  name,
  role,
  ...props
}: NavItemProps) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('session');
    history.push("/");
  }

  return (
    <StyledButton
      style={!collapsed ? 
        {width: '174px',
        height: '40px',
        alignSelf: 'stretch'}: 
        {width: '40px',
        height: '40px'
    }}
      {...props}
    >
      <StyledIcon alt="icon" src="./utils/profilePlaceholder.svg"></StyledIcon>
      {!collapsed && 
      <NameContainer>
          <Name>
              <NameText><b>{name?.substring(0, 8)}</b></NameText>
              <img style={{cursor: 'pointer'}} onClick={logout} alt='logout' src='./utils/logout.svg'></img>
          </Name>
          <Role>
            {role}
          </Role>
      </NameContainer>}
    </StyledButton>
  );
};
