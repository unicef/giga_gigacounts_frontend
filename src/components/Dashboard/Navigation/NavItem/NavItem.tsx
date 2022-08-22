import { NavItemType } from 'src/components/Dashboard/Contracts/state/types'
import { NavItemContainer, StatusAndNumber } from './styles'

export interface NavItemProps {
  collapsed: boolean
  label: string
  icon?: string
  number?: number
  selected?: boolean
  onClick?: (label?: NavItemType) => void
  value?: NavItemType
}

export const NavItem: React.FC<NavItemProps> = ({
  collapsed,
  label,
  number,
  selected = false,
  icon,
  onClick,
  value,
}: NavItemProps): JSX.Element => {
  return (
    <NavItemContainer collapsed={collapsed} onClick={() => onClick?.(value)}>
      <span className={`icon icon-24 ${icon} ${selected ? 'icon-white' : 'icon-light-blue'}`} />
      {!collapsed && (
        <>
          <StatusAndNumber selected={selected}>{label}</StatusAndNumber>
          <StatusAndNumber selected={selected} isNumber>
            {number}
          </StatusAndNumber>
        </>
      )}
    </NavItemContainer>
  )
}
