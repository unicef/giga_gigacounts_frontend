import {
  Header as CarbonHeader,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Theme
} from '@carbon/react'
import { useLocation, useNavigate } from 'react-router'
import { Typography } from 'src/components/typography'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { KNOWLEDGE_BASE_MAP } from 'src/constants'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { capitalizeFirstLetter } from 'src/utils/strings'
import LanguagePopover from './LanguagePopover'
import NavBar from './NavBar'
import NotificationPopover from './NotificationPopover'

export default function Header() {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { expanded, setExpanded } = useNavbar()
  const { pushError } = useSnackbar()
  const { pathname } = useLocation()

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

  return (
    <CarbonHeader aria-label="header" style={{ zIndex: 1, paddingRight: spacing.xl }}>
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
        <Typography as="h4" onClick={() => navigate(ROUTES.dashboard.app.route)}>
          giga<b>counts</b>
        </Typography>
      </HeaderName>
      <HeaderGlobalBar>
        <LanguagePopover />

        <NotificationPopover />
        <div id="help-page-link">
          <Typography
            onClick={redirectToKnowledgeBase}
            style={{ alignSelf: 'center', padding: spacing.xs }}
          >
            {capitalizeFirstLetter(translate('visit_help_page'))}
          </Typography>
        </div>
      </HeaderGlobalBar>
      <Theme theme="white">
        <NavBar />
      </Theme>
    </CarbonHeader>
  )
}
