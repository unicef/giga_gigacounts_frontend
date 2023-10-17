import { SideNavDivider } from '@carbon/react'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useSettings } from 'src/hooks/useSettings'
import NavItem from './NavItem'
import { shortcuts } from './config-navigation'

export default function NavShortcuts() {
  const { hasAllPermissions, hasSomeRole } = useAuthorization()
  const { hasAllSettings } = useSettings()

  return (
    <>
      {shortcuts.map((item) => {
        const userHasPermission =
          item.permissions && item.permissions.length > 0
            ? hasAllPermissions([...item.permissions])
            : true
        const userHasRole =
          item.roles && item.roles.length > 0 ? hasSomeRole([...item.roles]) : true
        const userHasAllSettings =
          item.settings && item.settings.length > 0 ? hasAllSettings([...item.settings]) : true
        return (
          userHasPermission &&
          userHasRole &&
          userHasAllSettings && (
            <>
              <NavItem key={item.title} isActive={false} data={item} />
              <SideNavDivider />
            </>
          )
        )
      })}
    </>
  )
}
