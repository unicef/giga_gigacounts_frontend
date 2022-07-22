import React from 'react'
import { Router } from './router/Router'
import { GeneralContextProvider } from './state/GeneralContext'

const App: React.FC = (): JSX.Element => {
  // here should be added other wrappers
  return (
    <GeneralContextProvider>
      <Router />
    </GeneralContextProvider>
  )
}

export default App
