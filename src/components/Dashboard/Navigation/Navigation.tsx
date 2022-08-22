import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContractStatus } from 'src/types/general'
import logos from 'src/assets/logos'
import { ADMIN_ROLE } from 'src/consts/roles'
import { useUser, useContractCounts } from 'src/state/hooks'
import Country from '../Country/Country'
import { NavItem } from './NavItem/NavItem'
import { ProfileIcon } from './ProfileIcon/ProfileIcon'
import { StyledNav, StyledLogo, MenuContainer, StyledDivider } from './styles'
import { useContractsContext } from '../Contracts/state/useContractsContext'
import { NavItemType } from '../Contracts/state/types'

const Navigation: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const user = useUser()
  const {
    state: { activeNavItem },
    actions: { setActiveNavItem },
  } = useContractsContext()
  const contractCounts = useContractCounts()
  const mouseOver = useRef<boolean>(false)

  const { role, country, name } = user.data
  const isAdmin = role === ADMIN_ROLE

  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    mouseOver.current = true
    setTimeout(() => {
      if (mouseOver.current) {
        setHovered(true)
      }
    }, 1000)
  }

  const handleMouseLeave = () => {
    mouseOver.current = false
    setHovered(false)
  }

  const handleNaveItemClick = (item?: NavItemType) => setActiveNavItem(item)

  return (
    <StyledNav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} expanded={hovered}>
      <StyledLogo
        src={hovered ? logos.gigaLogoInLine : logos.gigaLogo}
        onClick={() => {
          navigate('/dashboard')
        }}
      />
      <MenuContainer>
        {!!role && !isAdmin && (
          <Country collapsed={!hovered} countryName={country?.name} countryFlag={`${country?.flagUrl}`} />
        )}

        <StyledDivider />
        <NavItem
          collapsed={!hovered}
          selected={activeNavItem === undefined}
          label="All Contracts"
          number={contractCounts.data.total}
          icon="icon-list"
          onClick={handleNaveItemClick}
        />

        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Draft}
          value={NavItemType.draft}
          selected={activeNavItem === NavItemType.draft}
          number={contractCounts.data.draft}
          icon="icon-draft"
          onClick={handleNaveItemClick}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Sent}
          value={NavItemType.sent}
          selected={activeNavItem === NavItemType.sent}
          number={contractCounts.data.sent}
          icon="icon-sent"
          onClick={handleNaveItemClick}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Confirmed}
          value={NavItemType.confirmed}
          selected={activeNavItem === NavItemType.confirmed}
          number={contractCounts.data.confirmed}
          icon="icon-confirmed"
          onClick={handleNaveItemClick}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Ongoing}
          value={NavItemType.ongoing}
          selected={activeNavItem === NavItemType.ongoing}
          number={contractCounts.data.ongoing}
          icon="icon-ongoing"
          onClick={handleNaveItemClick}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Expired}
          value={NavItemType.expired}
          selected={activeNavItem === NavItemType.expired}
          number={contractCounts.data.expired}
          icon="icon-expired"
          onClick={handleNaveItemClick}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Completed}
          value={NavItemType.completed}
          selected={activeNavItem === NavItemType.completed}
          number={contractCounts.data.completed}
          icon="icon-completed"
          onClick={handleNaveItemClick}
        />
      </MenuContainer>
      <ProfileIcon collapsed={!hovered} name={name} role={role} />
    </StyledNav>
  )
}

export default Navigation
