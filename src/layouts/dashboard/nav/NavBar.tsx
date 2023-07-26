import { Logout, ShareKnowledge } from '@carbon/icons-react'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useSettings } from 'src/hooks/useSettings'
// @ts-ignore
import { Button, SideNav, SideNavItems, SideNavLink } from '@carbon/react'
import { useLocation } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { KNOWLEDGE_BASE_MAP } from 'src/constants/knowledge-base-map'
import { LAYOUT_SIDEBAR_WIDTH } from 'src/constants/layout'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import NavAccount from './NavAccount'
import NavIcon from './NavIcon'
import NavItem from './NavItem'
import NavShortcuts from './NavShortcuts'
import UserFlag from './UserFlag'
import navConfig, { shortcuts } from './config-navigation'

export default function NavBar({ expanded }: { expanded: boolean }) {
  const principalNav = navConfig[0]
  const { logout } = useAuthContext()
  const { pathname } = useLocation()
  const { translate } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const { hasAllSettings } = useSettings()
  const { pushError } = useSnackbar()

  const { spacing } = useTheme()
  return (
    <SideNav
      isPersistent={false}
      defaultExpanded={false}
      expanded={expanded}
      aria-label="Side navigation"
    >
      <Stack
        orientation="vertical"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: '100%', paddingTop: spacing.xl, width: LAYOUT_SIDEBAR_WIDTH }}
      >
        <Stack style={{ width: '100%' }}>
          <NavAccount />
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
            <SideNavLink
              tabIndex={principalNav.items.length + shortcuts.length + 1}
              large
              renderIcon={() => <NavIcon CarbonIcon={ShareKnowledge} isActive={false} />}
              onClick={() =>
                KNOWLEDGE_BASE_MAP[pathname]
                  ? window.location.replace(KNOWLEDGE_BASE_MAP[pathname])
                  : pushError('push.knowledge_base_error')
              }
            >
              <Typography as="span" variant="textSecondary">
                {capitalizeFirstLetter(translate('knowledge_base'))}
              </Typography>
            </SideNavLink>
          </SideNavItems>
        </Stack>
        <Stack gap={spacing.xs} alignItems="center" justifyContent="center">
          <Button size="sm" renderIcon={Logout} kind="ghost" onClick={logout}>
            {translate('log_out')}
          </Button>
          <UserFlag />
        </Stack>
      </Stack>
    </SideNav>
  )
}
