import { SideNavDivider } from '@carbon/react'
import { useAuthorization } from 'src/hooks/useAuthorization'
import NavItem from './NavItem'
import { shortcuts } from './config-navigation'

export default function NavShortcuts() {
  const { hasSomeRole } = useAuthorization()

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
