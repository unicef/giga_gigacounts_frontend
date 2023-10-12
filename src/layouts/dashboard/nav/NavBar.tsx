import { SideNav, SideNavDivider, SideNavItems, SkeletonText } from '@carbon/react'
import { useLocation } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { LAYOUT_SIDEBAR_WIDTH } from 'src/constants'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useSettings } from 'src/hooks/useSettings'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import NavAccount from './NavAccount'
import NavItem from './NavItem'
import NavShortcuts from './NavShortcuts'
import navConfig from './config-navigation'

export default function NavBar() {
  const principalNav = navConfig[0]
  const { expanded } = useNavbar()
  const { user, logout } = useAuthContext()
  const { pathname } = useLocation()
  const { hasAllPermissions, hasSomeRole } = useAuthorization()
  const { hasAllSettings } = useSettings()

  const { spacing, palette } = useTheme()
  return (
    <SideNav isPersistent={false} expanded={expanded} aria-label="Side navigation">
      <Stack
        orientation="vertical"
        justifyContent="space-between"
        alignItems="center"
        style={{
          height: '100%',
          paddingTop: spacing.lg,
          width: LAYOUT_SIDEBAR_WIDTH,
          backgroundColor: palette.background.neutral
        }}
      >
        <Stack style={{ width: '100%' }}>
          <NavAccount />
          {user ? (
            <SideNavItems>
              <SideNavDivider />
              <NavShortcuts />
              {principalNav.items.map((item, i) => {
                const userHasPermission =
                  'permissions' in item && item.permissions && item.permissions.length > 0
                    ? hasAllPermissions([...item.permissions])
                    : true
                const userHasRole =
                  'roles' in item && item.roles && item.roles.length > 0
                    ? hasSomeRole([...item.roles])
                    : true
                const userHasAllSettings =
                  'settings' in item && item.settings && item.settings.length > 0
                    ? hasAllSettings([...item.settings])
                    : true

                return (
                  userHasPermission &&
                  userHasRole &&
                  userHasAllSettings && <NavItem key={item.title + item.path} data={item} />
                )
              })}
            </SideNavItems>
          ) : (
            <Stack
              style={{ padding: spacing.md }}
              orientation="vertical"
              alignContent="center"
              justifyContent="center"
              gap={spacing.md}
            >
              {new Array(6).fill(null).map((_, i) => (
                <div key={i} style={{ alignSelf: 'center', width: '90%' }}>
                  <SkeletonText lineCount={2} paragraph />
                </div>
              ))}
            </Stack>
          )}
        </Stack>
        <Stack
          style={{ width: '100%' }}
          alignItems="flex-start"
          justifyContent="center"
          alignSelf="flex-start"
        >
          <SideNavItems>
            <NavItem
              isActive={false}
              data={{ icon: 'Logout', onClick: logout, title: 'log_out' }}
            />
            <NavItem
              id="feedback-link"
              isActive={pathname === ROUTES.dashboard.contact.feedback.route}
              data={{
                icon: 'Mail',
                path: ROUTES.dashboard.contact.feedback.route,
                state: { previousPath: pathname },
                title: 'send_feedback'
              }}
            />
            <NavItem
              id="ask-for-help-link"
              isActive={pathname === ROUTES.dashboard.contact.helpRequest.route}
              data={{
                icon: 'Help',
                path: ROUTES.dashboard.contact.helpRequest.route,
                state: { previousPath: pathname },
                title: 'ask_for_help'
              }}
            />
          </SideNavItems>
        </Stack>
      </Stack>
    </SideNav>
  )
}
