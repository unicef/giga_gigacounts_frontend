import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
  SkipToContent,
  Theme
} from '@carbon/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import LanguagePopover from '../dashboard/nav/LanguagePopover'

export default function ErrorLayout() {
  const { spacing, palette } = useTheme('g90')
  const navigate = useNavigate()
  const { translate } = useLocales()
  return (
    <Theme theme="g90">
      <Header aria-label="header" style={{ zIndex: 1, paddingRight: spacing.xl }}>
        <SkipToContent />

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
