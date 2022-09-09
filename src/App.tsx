import React from 'react'
import { Router } from './router/Router'
import { GeneralContextProvider } from './state/GeneralContext'
import { Web3ContextProvider } from './web3/Web4Context'

const App: React.FC = (): JSX.Element => {
  // here should be added other wrappers
  return (
    <GeneralContextProvider>
      <Web3ContextProvider>
        <Router />
      </Web3ContextProvider>
    </GeneralContextProvider>
  )
}

export default App
