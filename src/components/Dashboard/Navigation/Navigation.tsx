import { useEffect, useState } from 'react'
import Country from '../Country/Country'
import { StyledNav, StyledLogo, MenuContainer, StyledDivider } from './styles'
import { NavItem } from './NavItem/NavItem'
import { ProfileIcon } from './ProfileIcon/ProfileIcon'
import { useNavigate } from 'react-router-dom'

import logos from 'src/assets/logos'

export interface CountryProps {
  admin: boolean
  countryPath?: string
  countryName?: string
  name?: string
  role?: string
  contractCounts: { status: string; count: string }[]
}

const Navigation: React.FC<CountryProps> = ({
  admin = false,
  countryPath,
  countryName,
  name,
  role,
  contractCounts,
}: CountryProps): JSX.Element => {
  const navigate = useNavigate()

  const [hovered, setHovered] = useState(true)
  const [allContractsCount, setAllContractCount] = useState(0)
  const [draftCount, setDraftCount] = useState(0)
  const [sentCount, setSentCount] = useState(0)
  const [confirmedCount, setConfirmedCount] = useState(0)
  const [ongoingCount, setOngoingCount] = useState(0)
  const [expiredCount, setExpiredCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  useEffect(() => {
    let allCount = 0
    contractCounts.forEach((contractCount) => {
      allCount += parseInt(contractCount.count)
      switch (contractCount.status) {
        case 'Draft':
          setDraftCount(parseInt(contractCount.count))
          break
        case 'Sent':
          setSentCount(parseInt(contractCount.count))
          break
        case 'Confirmed':
          setConfirmedCount(parseInt(contractCount.count))
          break
        case 'Ongoing':
          setOngoingCount(parseInt(contractCount.count))
          break
        case 'Expired':
          setExpiredCount(parseInt(contractCount.count))
          break
        case 'Completed':
          setCompletedCount(parseInt(contractCount.count))
          break
        default:
          break
      }
    })
    setAllContractCount(allCount)
  }, [contractCounts])

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
        {!admin && <Country collapsed={!hovered} countryName={countryName} countryPath={countryPath} />}

        <StyledDivider />

        <NavItem
          collapsed={!hovered}
          selected={true}
          label="All Contracts"
          number={allContractsCount.toString()}
          icon="icon-list"
        />
        <NavItem collapsed={!hovered} label="Drafts" number={draftCount.toString()} icon="icon-draft" />
        <NavItem collapsed={!hovered} label="Sent" number={sentCount.toString()} icon="icon-sent" />
        <NavItem collapsed={!hovered} label="Confirmed" number={confirmedCount.toString()} icon="icon-confirmed" />
        <NavItem collapsed={!hovered} label="Ongoing" number={ongoingCount.toString()} icon="icon-ongoing" />
        <NavItem collapsed={!hovered} label="Expired" number={expiredCount.toString()} icon="icon-expired" />
        <NavItem collapsed={!hovered} label="Completed" number={completedCount.toString()} icon="icon-completed" />
      </MenuContainer>
      <ProfileIcon collapsed={!hovered} name={name} role={role} />
    </StyledNav>
  )
}

export default Navigation
