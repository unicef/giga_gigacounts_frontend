import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    p {
      color: var(--color-white)
    }
    background-color: var(--color-dark-blue);
    display: flex;
    align-items: center;
    padding: 0px;


    /* Inside auto layout */
    cursor: pointer;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`

const StyledIcon = styled.img`
    width: "1em"; 
    height: "1em";
    flex: none;
    order: 0;
    flex-grow: 0;
`

const StyledLabel = styled.div`
    flex: none;
    order: 1;
    flex-grow: 1;
`

const StyledContractCount = styled.div`
    flex: none;
    order: 2;
    flex-grow: 0;
`

interface NavItemProps {
  collapsed?: boolean;
  label: string;
  onClick?: () => void;
  iconPath? : string;
  number? : string;
  selected? : boolean;
}

/**
 * Primary UI component for user interaction
 */
export const NavItem = ({
  collapsed = false,
  label,
  number,
  selected,
  iconPath,
  ...props
}: NavItemProps) => {
  return (
    <StyledButton
      style={!collapsed ? 
        {width: '158px',
        height: '24px',
        flexDirection: 'row',
        gap: '8px'}: 
        {width: '58px',
        height: '24px',
        flexDirection: 'column',
        gap: '4px'
    }
    }
      {...props}
    >
      <StyledIcon alt="icon" src={iconPath}></StyledIcon>
      {!collapsed && <StyledLabel><p style={{fontWeight: selected ? 'bold' : 'normal'}}>{label}</p></StyledLabel>}
      {!collapsed && <StyledContractCount><p>{number}</p></StyledContractCount>}
    </StyledButton>
  );
};
