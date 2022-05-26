import React, { useState } from 'react';
import styled from 'styled-components';
import { CountryBlock } from './CountryBlock';
import { NavItem } from './NavItem';
import { ProfileIcon } from './ProfileIcon';

const StyledNav = styled.div`
    background-color: var(--color-dark-blue);
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 24px 16px 30px;
    gap: 34px;

    position: relative;
    width: 228px;
    height: 876px;
`

const StyledLogo = styled.img`
    flex: none;
    order: 0;
    flex-grow: 0;
`
const StyledDivider = styled.div`
    height: 2px;

    /* Transparent/White 15% */

    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 14px;

    width: 58px;
    height: 690px;


    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
`

const StyledLabel = styled.h5`
    flex: none;
    order: 1;
    flex-grow: 0;
`

interface CountryBlockProps {
  admin: boolean;
  countryPath?: string;
  countryName?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Navigation = ({
  admin = false,
  countryPath,
  countryName
}: CountryBlockProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <StyledNav 
        style={hovered ?
            {
                alignItems: 'flex-start',
                padding: '12px 24px 16px 30px',
                gap: '34px',
                width: '228px'
            }
            :{
                alignItems: 'center',
                padding: '8px 6px 16px 8px',
                gap: '32px',
                width: '72px'
            }
        }
        onMouseOver={()=>{setHovered(true)}} 
        onMouseOut={()=>{setHovered(false)}
    }>
        {hovered ? <StyledLogo src="./logos/giga-logo-inline.svg"></StyledLogo> : <StyledLogo src="./logos/giga-logo.svg"></StyledLogo>}
        <MenuContainer style={hovered ? {width: '174px'} : {width: '58px'}}>
            {!admin && <CountryBlock collapsed={!hovered} countryName={countryName} countryPath={countryPath} />}
            <StyledDivider style={hovered ? {width: '174px'} : {width: '58px'}} />
            <div style={{order: 3}}><NavItem collapsed={!hovered} label='All Contracts' number='14' iconPath='./icons/list.svg' ></NavItem></div>
            <div style={{order: 4}}><NavItem collapsed={!hovered} label='Drafts' number='2' iconPath='./icons/move.svg' ></NavItem></div>
            <div style={{order: 5}}><NavItem collapsed={!hovered} label='Sent' number='4' iconPath='./icons/pin.svg' ></NavItem></div>
            <div style={{order: 6}}><NavItem collapsed={!hovered} label='Confirmed' number='3' iconPath='./icons/location.svg' ></NavItem></div>
            <div style={{order: 7}}><NavItem collapsed={!hovered} label='Ongoing' number='7' iconPath='./icons/location-filled.svg' ></NavItem></div>
        </MenuContainer>
        <ProfileIcon collapsed={!hovered} name='Juan Pablo' role='Admin'></ProfileIcon>
    </StyledNav>
  );
};
