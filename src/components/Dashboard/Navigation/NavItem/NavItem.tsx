import { Label } from './NavItem.css'

export interface NavItemProps {
  collapsed?: boolean
  label: string
  onClick?: () => void
  icon?: string
  number?: string
  selected?: boolean
}

export const NavItem: React.FC<NavItemProps> = ({
  collapsed = false,
  label,
  number,
  selected,
  icon,
  ...props
}: NavItemProps): JSX.Element => {
  return (
    <Label style={collapsed ? { paddingLeft: '16px' } : {}} {...props}>
      <div className={icon + ' icon icon-24 ' + (selected ? 'icon-white' : 'icon-light-blue')} />
      {!collapsed && (
        <>
          <p
            style={{
              fontWeight: selected ? 'bold' : 'normal',
              color: selected ? 'var(--color-white)' : 'var(--color-lightest-blue)',
              width: '100%',
            }}
          >
            {label}
          </p>

          <p
            style={{
              fontWeight: selected ? 'bold' : 'normal',
              color: selected ? 'var(--color-white)' : 'var(--color-lightest-blue)',
            }}
          >
            {number}
          </p>
        </>
      )}
    </Label>
  )
}
