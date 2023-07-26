// i18n
import './locales/i18n'

import '@carbon/charts-react/styles.css'
import '@carbon/styles/css/styles.css'
import './app.scss'

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'

import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
// redux
import { persistor, store } from './redux/store'
// routes
import Router from './routes'
// theme
import ThemeProvider from './theme'
// components
import ScrollToTop from './components/scroll-to-top'
import { SettingsProvider } from './components/settings'
import SnackbarProvider from './components/snackbar'

import { AuthProvider } from './auth/JwtContext'
import { BusinessProvider } from './context/BusinessContext'

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <SettingsProvider>
              <BusinessProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <ThemeProvider>
                    {/* <ThemeLocalization> */}
                    <SnackbarProvider>
                      <Router />
                    </SnackbarProvider>
                    {/* </ThemeLocalization> */}
                  </ThemeProvider>
                </BrowserRouter>
              </BusinessProvider>
            </SettingsProvider>
            {/* </LocalizationProvider> */}
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  )
}
