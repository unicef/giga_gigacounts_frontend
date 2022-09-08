import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGeneralContext } from 'src/state/GeneralContext'
import { Profile, UserBlock, UserIcon, UserLogout, UserName, UserRole } from './styles'

export interface NavItemProps {
  collapsed?: boolean
  name?: string
  onClick?: () => void
  role?: string
}

export const ProfileIcon: React.FC<NavItemProps> = ({
  collapsed = true,
  name,
  role,
  ...props
}: NavItemProps): JSX.Element => {
  const navigate = useNavigate()
  const {
    actions: { reset },
  } = useGeneralContext()

  const logout = useCallback(() => {
    localStorage.removeItem('session')
    reset()
    navigate('/')
  }, [reset, navigate])

  return (
    <Profile to="/profile">
      <UserBlock className="noselect" style={collapsed ? { paddingLeft: '10px' } : {}} {...props}>
        <UserIcon className="icon icon-24 icon-person icon-white" />
        {!collapsed && (
          <>
            <UserName>
              <b>{name}</b>
            </UserName>
            <UserRole>{role}</UserRole>
            <UserLogout className="icon icon-18 icon-logout icon-lighter-blue" onClick={logout} />
          </>
        )}
      </UserBlock>
    </Profile>
  )
}
