import {
  Header as CarbonHeader,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Theme
} from '@carbon/react'
import { useNavigate } from 'react-router'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import LanguagePopover from './LanguagePopover'
import NavBar from './NavBar'
import NotificationPopover from './NotificationPopover'

export default function Header() {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { expanded, setExpanded } = useNavbar()

  return (
    <CarbonHeader aria-label="header" style={{ zIndex: 1, paddingRight: spacing.xl }}>
      <SkipToContent />
      <HeaderMenuButton
        isCollapsible
        aria-label={expanded ? 'Close menu' : 'Open menu'}
        isActive={expanded}
        onClick={() => (setExpanded ? setExpanded((prev) => !prev) : null)}
        aria-expanded={expanded}
      />
      <HeaderName
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(ROUTES.dashboard.app.route)}
        prefix=""
      >
        <Typography as="h4" onClick={() => navigate(ROUTES.dashboard.app.route)}>
          giga<b>counts</b>
        </Typography>
      </HeaderName>
      <HeaderGlobalBar>
        <LanguagePopover />

        <HeaderGlobalAction
          id="help-request-link"
          onClick={() => navigate(ROUTES.dashboard.contact.helpRequest.route)}
          aria-label={translate('help')}
        >
          <ICONS.Help />
        </HeaderGlobalAction>
        <NotificationPopover />
      </HeaderGlobalBar>
      <Theme theme="white">
        <NavBar />
      </Theme>
    </CarbonHeader>
  )
}
