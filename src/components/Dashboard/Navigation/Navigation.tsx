import { useState } from 'react'
import Country from '../Country/Country'
import { StyledNav, StyledLogo, MenuContainer, StyledDivider } from './styles'
import { NavItem } from './NavItem/NavItem'
import { ProfileIcon } from './ProfileIcon/ProfileIcon'
import { useNavigate } from 'react-router-dom'

import logos from 'src/assets/logos'
import { useUser, useContractCounts } from 'src/state/hooks'
import { ADMIN_ROLE } from 'src/consts/roles'

const Navigation: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const user = useUser()
  const contractCounts = useContractCounts()

  const { role, country, name } = user.data
  const isAdmin = role === ADMIN_ROLE

  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <StyledNav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        hovered
          ? { width: '270px', padding: '8px 24px 16px 30px', transition: 'width .2s ease-out, padding .2s ease-out' }
          : { width: '72px', padding: '8px 6px 16px 8px', transition: 'width .5s ease-out, padding .2s ease-out' }
      }
    >
      <StyledLogo
        src={hovered ? logos.gigaLogoInLine : logos.gigaLogo}
        onClick={() => {
          navigate('/dashboard')
        }}
      />

      <MenuContainer>
        {!isAdmin && (
          <Country
            collapsed={!hovered}
            countryName={country?.name}
            countryPath={`./flags/${country?.code || ''}.svg`}
          />
        )}

        <StyledDivider />

        <NavItem
          collapsed={!hovered}
          selected={true}
          label="All Contracts"
          number={contractCounts.data.total}
          icon="icon-list"
        />

        <NavItem collapsed={!hovered} label="Drafts" number={contractCounts.data.draft} icon="icon-draft" />
        <NavItem collapsed={!hovered} label="Sent" number={contractCounts.data.sent} icon="icon-sent" />
        <NavItem collapsed={!hovered} label="Confirmed" number={contractCounts.data.confirmed} icon="icon-confirmed" />
        <NavItem collapsed={!hovered} label="Ongoing" number={contractCounts.data.ongoing} icon="icon-ongoing" />
        <NavItem collapsed={!hovered} label="Expired" number={contractCounts.data.expired} icon="icon-expired" />
        <NavItem collapsed={!hovered} label="Completed" number={contractCounts.data.completed} icon="icon-completed" />
      </MenuContainer>
      <ProfileIcon collapsed={!hovered} name={name} role={role} />
    </StyledNav>
  )
}

export default Navigation
