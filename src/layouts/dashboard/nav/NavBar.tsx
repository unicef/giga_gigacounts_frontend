import { Button, SideNav, SideNavDivider, SideNavItems, SkeletonText } from '@carbon/react'
import { useLocation, useNavigate } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { ICONS, LAYOUT_SIDEBAR_WIDTH } from 'src/constants'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useSettings } from 'src/hooks/useSettings'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import NavAccount from './NavAccount'
import NavItem from './NavItem'
import NavShortcuts from './NavShortcuts'
import navConfig, { shortcuts } from './config-navigation'

export default function NavBar() {
  const principalNav = navConfig[0]
  const { expanded, setExpanded } = useNavbar()
  const { user, logout } = useAuthContext()
  const { pathname } = useLocation()
  const { translate } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const { hasAllSettings } = useSettings()
  const navigate = useNavigate()

  const { spacing, palette } = useTheme()
  return (
    <SideNav
      onToggle={(_, value) => setExpanded(value)}
      isPersistent={false}
      expanded={expanded}
      aria-label="Side navigation"
    >
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
          <SideNavDivider />
          {user ? (
            <SideNavItems>
              <NavShortcuts />
              {principalNav.items.map((item, i) => {
                const userHasPermission =
                  item.roles && item.roles.length > 0 ? hasSomeRole([...item.roles]) : true
                const userHasAllSettings =
                  item.settings && item.settings.length > 0
                    ? hasAllSettings([...item.settings])
                    : true

                return (
                  userHasPermission &&
                  userHasAllSettings && (
                    <NavItem
                      tabIndex={i + shortcuts.length + 1}
                      key={item.title + item.path}
                      data={item}
                    />
                  )
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
          style={{ marginBottom: spacing.xs, padding: spacing.xs }}
          gap={spacing.xxs}
          alignItems="flex-start"
          justifyContent="center"
          alignSelf="flex-start"
        >
          <Button size="sm" kind="ghost" style={{ color: palette.grey[600] }} onClick={logout}>
            <ICONS.Logout
              style={{
                marginRight: spacing.xs,
                stroke: palette.grey[600],
                fill: palette.grey[600]
              }}
            />
            {capitalizeFirstLetter(translate('log_out'))}
          </Button>
          <Button
            id="feedback-link"
            size="sm"
            kind="ghost"
            style={{ color: palette.grey[600] }}
            onClick={() =>
              navigate(ROUTES.dashboard.contact.feedback.route, {
                state: { previousPath: pathname }
              })
            }
          >
            <ICONS.Mail
              style={{
                marginRight: spacing.xs,
                stroke: palette.grey[600],
                fill: palette.grey[600]
              }}
            />
            {capitalizeFirstLetter(translate('send_feedback'))}
          </Button>
          <Button
            id="ask-for-help-link"
            size="sm"
            kind="ghost"
            style={{ color: palette.grey[600] }}
            onClick={() =>
              navigate(ROUTES.dashboard.contact.helpRequest.route, {
                state: { previousPath: pathname }
              })
            }
          >
            <ICONS.Help
              style={{
                marginRight: spacing.xs,
                stroke: palette.grey[600],
                fill: palette.grey[600]
              }}
            />
            {capitalizeFirstLetter(translate('ask_for_help'))}
          </Button>
        </Stack>
      </Stack>
    </SideNav>
  )
}
