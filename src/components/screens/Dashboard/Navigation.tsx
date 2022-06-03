import React, { useEffect, useState } from 'react';
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
  height: 100vh;
`;

const StyledLogo = styled.img`
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const StyledDivider = styled.div`
  height: 2px;

  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;

  width: 58px;
  height: 100%;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  //   flex-grow: 1;
`;

interface CountryBlockProps {
  admin: boolean;
  countryPath?: string;
  countryName?: string;
  name?: string;
  role?: string;
  contractCounts: { status: string; count: string }[];
}

/**
 * Primary UI component for user interaction
 */
export const Navigation = ({
  admin = false,
  countryPath,
  countryName,
  name,
  role,
  contractCounts,
}: CountryBlockProps) => {
  const [hovered, setHovered] = useState(false);
  const [allContractsCount, setAllContractCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    let allCount = 0;
    contractCounts.forEach((contractCount) => {
      allCount += parseInt(contractCount.count);
      switch (contractCount.status) {
        case 'Draft':
          setDraftCount(parseInt(contractCount.count));
          break;
        case 'Sent':
          setSentCount(parseInt(contractCount.count));
          break;
        case 'Confirmed':
          setConfirmedCount(parseInt(contractCount.count));
          break;
        case 'Ongoing':
          setOngoingCount(parseInt(contractCount.count));
          break;
        case 'Expired':
          setExpiredCount(parseInt(contractCount.count));
          break;
        case 'Completed':
          setCompletedCount(parseInt(contractCount.count));
          break;
        default:
          break;
      }
    });
    setAllContractCount(allCount);
  }, [contractCounts]);

  return (
    <StyledNav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        hovered
          ? {
              alignItems: 'flex-start',
              padding: '12px 24px 16px 30px',
              gap: '34px',
              width: '228px',
              justifyContent: 'space-between',
              //   transition: 'all .3s ease-in-out',
            }
          : {
              alignItems: 'center',
              padding: '8px 6px 16px 8px',
              gap: '32px',
              width: '72px',
              justifyContent: 'space-between',
            }
      }
    >
      <div>
        {hovered ? (
          <StyledLogo src='./logos/giga-logo-inline.svg'></StyledLogo>
        ) : (
          <StyledLogo src='./logos/giga-logo.svg'></StyledLogo>
        )}
        <MenuContainer style={hovered ? { width: '174px' } : { width: '58px' }}>
          {!admin && (
            <CountryBlock
              collapsed={!hovered}
              countryName={countryName}
              countryPath={countryPath}
            />
          )}
          <StyledDivider
            style={hovered ? { width: '174px' } : { width: '58px' }}
          />
          <div style={{ order: 3 }}>
            <NavItem
              collapsed={!hovered}
              label='All Contracts'
              number={allContractsCount.toString()}
              iconPath='./icons/list.svg'
            ></NavItem>
          </div>
          <div style={{ order: 4 }}>
            <NavItem
              collapsed={!hovered}
              label='Drafts'
              number={draftCount.toString()}
              iconPath='./icons/draft.svg'
            ></NavItem>
          </div>
          <div style={{ order: 5 }}>
            <NavItem
              collapsed={!hovered}
              label='Sent'
              number={sentCount.toString()}
              iconPath='./icons/pin.svg'
            ></NavItem>
          </div>
          <div style={{ order: 6 }}>
            <NavItem
              collapsed={!hovered}
              label='Confirmed'
              number={confirmedCount.toString()}
              iconPath='./icons/location.svg'
            ></NavItem>
          </div>
          <div style={{ order: 7 }}>
            <NavItem
              collapsed={!hovered}
              label='Ongoing'
              number={ongoingCount.toString()}
              iconPath='./icons/location-filled.svg'
            ></NavItem>
          </div>
          <div style={{ order: 7 }}>
            <NavItem
              collapsed={!hovered}
              label='Expired'
              number={expiredCount.toString()}
              iconPath='./icons/location-filled.svg'
            ></NavItem>
          </div>
          <div style={{ order: 7 }}>
            <NavItem
              collapsed={!hovered}
              label='Completed'
              number={completedCount.toString()}
              iconPath='./icons/location-filled.svg'
            ></NavItem>
          </div>
        </MenuContainer>
      </div>
      <ProfileIcon collapsed={!hovered} name={name} role={role}></ProfileIcon>
    </StyledNav>
  );
};
