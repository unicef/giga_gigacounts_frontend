import React from 'react';
import styled from 'styled-components';

const StyledBlock = styled.div`
    h5 {
        color: var(--color-white)
    }
    background-color: var(--color-dark-blue);
    display: flex;
    align-items: center;
    padding: 0px 2px;
    gap: 12px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`

const StyledImg = styled.img`
    width: "1em"; 
    height: "1em";
    flex: none;
    order: 0;
    flex-grow: 0;
`

const StyledLabel = styled.h5`
    flex: none;
    order: 1;
    flex-grow: 0;
`

interface CountryBlockProps {
  countryPath?: string;
  countryName?: string;
  collapsed: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const CountryBlock = ({
  countryPath,
  countryName,
  collapsed = false
}: CountryBlockProps) => {
  return (
    <StyledBlock style={!collapsed ? {width: '174px',
    height: '24px'} : {justifyContent: 'center', width: '58px',
        height: '24px'}}>
      <StyledImg alt="flag" src={countryPath}></StyledImg>
      {!collapsed && <StyledLabel><p><b>{countryName}</b></p></StyledLabel>}
    </StyledBlock>
  );
};
