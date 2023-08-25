import {
  Button,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  SkeletonText
} from '@carbon/react'
import { useLocation, useNavigate } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { ICONS, KNOWLEDGE_BASE_MAP, LAYOUT_SIDEBAR_WIDTH } from 'src/constants'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useSettings } from 'src/hooks/useSettings'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import NavAccount from './NavAccount'
import NavIcon from './NavIcon'
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
  const { pushError } = useSnackbar()
  const navigate = useNavigate()

  const redirectToKnowledgeBase = () => {
    let link = ''
    return Object.keys(KNOWLEDGE_BASE_MAP).some((key) => {
      if (pathname.includes(key)) {
        link = KNOWLEDGE_BASE_MAP[key]
        return true
      }
      return false
    })
      ? window.open(link, '_blank')
      : pushError('push.knowledge_base_error')
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.auth.login.route)
  }

  const { spacing, palette } = useTheme()
  return (
    <SideNav
      onToggle={(_: object, value: boolean) => (setExpanded ? setExpanded(value) : null)}
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
          paddingTop: spacing.xl,
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
              <SideNavLink
                large
                renderIcon={() => <NavIcon CarbonIcon={ICONS.KnowledgeBase} isActive={false} />}
                onClick={redirectToKnowledgeBase}
              >
                <Typography as="span" variant="textTertiary">
                  {capitalizeFirstLetter(translate('knowledge_base'))}
                </Typography>
              </SideNavLink>
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
          <Button size="sm" kind="ghost" style={{ color: palette.grey[600] }} onClick={handleLogout}>
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
            onClick={() => navigate(ROUTES.dashboard.contact.feedback.route)}
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
        </Stack>
      </Stack>
    </SideNav>
  )
}
