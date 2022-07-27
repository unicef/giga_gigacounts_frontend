import { NavItemContainer, StatusAndNumber } from './styles'

export interface NavItemProps {
  collapsed: boolean
  label: string
  icon?: string
  number?: number
  selected?: boolean
  onClick?: (label: string) => void
}

export const NavItem: React.FC<NavItemProps> = ({
  collapsed,
  label,
  number,
  selected = false,
  icon,
  onClick,
}: NavItemProps): JSX.Element => {
  return (
    <NavItemContainer collapsed={collapsed} onClick={() => onClick?.(label.toLowerCase())}>
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
