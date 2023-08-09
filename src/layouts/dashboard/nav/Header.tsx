import {
  Header as CarbonHeader,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Theme
} from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import LanguagePopover from './LanguagePopover'
import NavBar from './NavBar'
import NotificationPopover from './NotificationPopover'

export default function Header({
  isSideNavExpanded,
  setIsSideNavExpanded
}: {
  isSideNavExpanded: boolean
  setIsSideNavExpanded: Dispatch<SetStateAction<boolean>>
}) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { spacing } = useTheme()

  return (
    <CarbonHeader aria-label="header" style={{ zIndex: 1, paddingRight: spacing.xl }}>
      <SkipToContent />
      <HeaderMenuButton
        isCollapsible
        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
        isActive={isSideNavExpanded}
        onClick={() => setIsSideNavExpanded((prev) => !prev)}
        aria-expanded={isSideNavExpanded}
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
        <Typography
          onClick={() => navigate(ROUTES.dashboard.contact.helpRequest.route)}
          style={{ alignSelf: 'center', padding: spacing.xs }}
        >
          {translate('functionalities.help_request')}
        </Typography>
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
        <NavBar expanded={isSideNavExpanded} setExpanded={setIsSideNavExpanded} />
      </Theme>
    </CarbonHeader>
  )
}
