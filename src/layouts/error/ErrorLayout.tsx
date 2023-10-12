import { Header, HeaderGlobalBar, HeaderName, SkipToContent, Theme } from '@carbon/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { HeaderLink } from 'src/components/HeaderLink'
import { Typography } from 'src/components/typography'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { redirectToKnowledgeBase } from 'src/utils/kb'
import LanguagePopover from '../dashboard/nav/LanguagePopover'

export default function ErrorLayout() {
  const { palette } = useTheme('g90')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <Theme theme="g90">
      <Header aria-label="header" style={{ zIndex: 1 }}>
        <SkipToContent />

        <HeaderName
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.replace(ROUTES.dashboard.app.route)}
          prefix=""
        >
          <Typography as="h4" onClick={() => navigate(ROUTES.dashboard.app.route)}>
            giga<b>counts</b>
          </Typography>
        </HeaderName>
        <HeaderGlobalBar>
          <LanguagePopover />
          <HeaderLink label="visit_help_page" onClick={() => redirectToKnowledgeBase(pathname)} />
        </HeaderGlobalBar>
      </Header>
      <main
        style={{
          height: '100dvh',
          backgroundColor: palette.background.neutral,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Outlet />
      </main>
    </Theme>
  )
}
