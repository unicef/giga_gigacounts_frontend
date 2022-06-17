import { useEffect, useState } from 'react';
import Country from '../Country/Country';
import { StyledNav, StyledLogo, MenuContainer, StyledDivider } from './Navigation.css';
import { NavItem } from './NavItem/NavItem';
import { ProfileIcon } from './ProfileIcon/ProfileIcon';

interface CountryProps {
  admin: boolean;
  countryPath?: string;
  countryName?: string;
  name?: string;
  role?: string;
  contractCounts: { status: string; count: string }[];
}

const Navigation: React.FC<CountryProps> = ({
  admin = false,
  countryPath,
  countryName,
  name,
  role,
  contractCounts
}: CountryProps): JSX.Element => {
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
              width: '270px',
              padding: '8px 24px 16px 30px',
              transition: 'all .2s ease-out',
            }
          : {
              width: '72px',
              padding: '8px 6px 16px 8px',
              transition: 'all .5s ease-out',
            }
      }
    >

      {hovered ? (
                <StyledLogo src="./logos/giga-logo-inline.svg"></StyledLogo>
              ) : (
                <StyledLogo src="./logos/giga-logo.svg"></StyledLogo>
              )}
        <MenuContainer>
          {!admin && <Country collapsed={!hovered} countryName={countryName} countryPath={countryPath} />}
          <StyledDivider/>

            <NavItem
              collapsed={!hovered}
              label="All Contracts"
              number={allContractsCount.toString()}
              iconPath="./icons/list.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Drafts"
              number={draftCount.toString()}
              iconPath="./icons/draft.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Sent"
              number={sentCount.toString()}
              iconPath="./icons/sent.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Confirmed"
              number={confirmedCount.toString()}
              iconPath="./icons/confirmed.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Ongoing"
              number={ongoingCount.toString()}
              iconPath="./icons/ongoing.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Expired"
              number={expiredCount.toString()}
              iconPath="./icons/expired.svg"
            ></NavItem>
            <NavItem
              collapsed={!hovered}
              label="Completed"
              number={completedCount.toString()}
              iconPath="./icons/completed.svg"
            ></NavItem>

        </MenuContainer>
      <ProfileIcon collapsed={!hovered} name={name} role={role}></ProfileIcon>
    </StyledNav>
  );
};

export default Navigation;
