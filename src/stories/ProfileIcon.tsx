import React from 'react';
import styled from 'styled-components';

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


    /* Inside auto layout */

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

    width: 124px;
    height: 40px;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 1;
`

const Name = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
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
    /* identical to box height, or 18px */

    letter-spacing: 0.018em;

    /* Primary/Lightest Blue */

    color: #E5EFFF;

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
    /* identical to box height, or 22px */

    letter-spacing: 0.003em;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;
`

const Logout = styled.div`
    width: 22px;
    height: 22px;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
`

interface NavItemProps {
  collapsed?: boolean;
  name: string;
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
    console.log(collapsed)
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
              <NameText><b>{name}</b></NameText>
              <Logout>
                  <img alt='logout' src='./utils/logout.svg'></img>
              </Logout>
          </Name>
          <Role>
            {role}
          </Role>
      </NameContainer>}
    </StyledButton>
  );
};
