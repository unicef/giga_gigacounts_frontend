import { SideNavDivider } from '@carbon/react'
import { useEffect } from 'react'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import NavItem from './NavItem'
import { shortcuts } from './config-navigation'

export default function NavShortcuts() {
  const { hasSomeRole } = useAuthorization()
  const { notifications, refetchNotifications } = useBusinessContext()

  useEffect(() => {
    const interval = setInterval(() => {
      refetchNotifications()
    }, parseInt(process.env.REACT_APP_NOTIFICATIONS_REFRESH_INTERVAL_MS || '10000', 10))
    return () => {
      window.clearInterval(interval)
    }
  }, [notifications, refetchNotifications])

  return (
    <>
      {shortcuts.map((item, i) => {
        const userHasPermission =
          item.roles && item.roles.length > 0 ? hasSomeRole([...item.roles]) : true
        return (
          userHasPermission && (
            <div key={item.title}>
              <NavItem isActive={false} tabIndex={i + 1} data={item} />
              <SideNavDivider />
            </div>
          )
        )
      })}
    </>
  )
}
