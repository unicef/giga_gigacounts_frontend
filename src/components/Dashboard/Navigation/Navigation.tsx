import { useRef, useState } from 'react'
import Country from '../Country/Country'
import { NavItem } from './NavItem/NavItem'
import { ProfileIcon } from './ProfileIcon/ProfileIcon'
import { useNavigate } from 'react-router-dom'

import logos from 'src/assets/logos'
import { useUser, useContractCounts } from 'src/state/hooks'
import { ADMIN_ROLE } from 'src/consts/roles'
import { StyledNav, StyledLogo, MenuContainer, StyledDivider } from './styles'
import { useContractsContext } from '../Contracts/state/useContractsContext'
import { ContractStatus } from '../Contracts/@types/ContractType'

const Navigation: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const user = useUser()
  const contractCounts = useContractCounts()
  const {
    state: { activeNavItem },
    setActiveNavItem,
  } = useContractsContext()
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
          selected={activeNavItem === 'all contracts'}
          label="All Contracts"
          number={contractCounts.data.total}
          icon="icon-list"
          onClick={setActiveNavItem}
        />

        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Draft}
          selected={activeNavItem === ContractStatus.Draft.toLowerCase()}
          number={contractCounts.data.draft}
          icon="icon-draft"
          onClick={setActiveNavItem}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Sent}
          selected={activeNavItem === ContractStatus.Sent.toLowerCase()}
          number={contractCounts.data.sent}
          icon="icon-sent"
          onClick={setActiveNavItem}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Confirmed}
          selected={activeNavItem === ContractStatus.Confirmed.toLowerCase()}
          number={contractCounts.data.confirmed}
          icon="icon-confirmed"
          onClick={setActiveNavItem}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Ongoing}
          selected={activeNavItem === ContractStatus.Ongoing.toLowerCase()}
          number={contractCounts.data.ongoing}
          icon="icon-ongoing"
          onClick={setActiveNavItem}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Expired}
          selected={activeNavItem === ContractStatus.Expired.toLowerCase()}
          number={contractCounts.data.expired}
          icon="icon-expired"
          onClick={setActiveNavItem}
        />
        <NavItem
          collapsed={!hovered}
          label={ContractStatus.Completed}
          selected={activeNavItem === ContractStatus.Completed.toLowerCase()}
          number={contractCounts.data.completed}
          icon="icon-completed"
          onClick={setActiveNavItem}
        />
      </MenuContainer>
      <ProfileIcon collapsed={!hovered} name={name} role={role} />
    </StyledNav>
  )
}

export default Navigation
