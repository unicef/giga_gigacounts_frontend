import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGeneralContext } from 'src/state/GeneralContext'
import { UserBlock } from './styles'

export interface NavItemProps {
  collapsed?: boolean
  name?: string
  onClick?: () => void
  role?: string
}

export const ProfileIcon: React.FC<NavItemProps> = ({
  collapsed = false,
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
    <UserBlock className="noselect" style={collapsed ? { paddingLeft: '10px' } : {}} {...props}>
      <div
        className="icon icon-24 icon-person icon-white"
        style={{
          gridArea: 'userpick',
          alignSelf: 'start',
          height: '40px',
          padding: '7px',
          marginTop: '2px',
          backgroundColor: 'var(--color-light-blue)',
          border: '2px solid var(--color-white-15)',
          borderRadius: '100px',
        }}
      />

      {!collapsed && (
        <>
          <p style={{ gridArea: 'name', color: 'var(--color-white)', margin: '0' }}>
            <b>{name?.substring(0, 8)}</b>
          </p>
          <small style={{ gridArea: 'role', color: 'var(--color-lightest-blue)', margin: '0' }}>{role}</small>
          <div
            className="icon icon-18 icon-logout icon-lighter-blue"
            style={{ cursor: 'pointer', marginTop: '1px' }}
            onClick={logout}
          />
        </>
      )}
    </UserBlock>
  )
}
