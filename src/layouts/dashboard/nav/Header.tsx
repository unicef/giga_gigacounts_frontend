import {
  Header as CarbonHeader,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Theme
} from '@carbon/react'
import { useLocation, useNavigate } from 'react-router'
import { HeaderLink } from 'src/components/HeaderLink'
import { Typography } from 'src/components/typography'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { ROUTES } from 'src/routes/paths'
import { redirectToKnowledgeBase } from 'src/utils/kb'
import LanguagePopover from './LanguagePopover'
import NavBar from './NavBar'
import NotificationPopover from './NotificationPopover'

export default function Header() {
  const navigate = useNavigate()
  const { expanded, setExpanded } = useNavbar()
  const { pathname } = useLocation()

  return (
    <CarbonHeader aria-label="header" style={{ zIndex: 1, alignItems: 'center' }}>
      <SkipToContent />
      <HeaderMenuButton
        isCollapsible
        aria-label={expanded ? 'Close menu' : 'Open menu'}
        isActive={expanded}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      />
      <HeaderName
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(ROUTES.dashboard.app.route)}
        prefix=""
      >
        <Typography
          style={{ alignSelf: 'center' }}
          as="h4"
          onClick={() => navigate(ROUTES.dashboard.app.route)}
        >
          giga<b>counts</b>
        </Typography>
      </HeaderName>
      <HeaderGlobalBar style={{ alignItems: 'center' }}>
        <LanguagePopover />
        <NotificationPopover />
        <HeaderLink label="visit_help_page" onClick={() => redirectToKnowledgeBase(pathname)} />
      </HeaderGlobalBar>
      <Theme theme="white">
        <NavBar />
      </Theme>
    </CarbonHeader>
  )
}
