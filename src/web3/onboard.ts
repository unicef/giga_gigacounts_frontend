import injectedModule from '@web3-onboard/injected-wallets'
import icon from 'src/assets/logos/gigacounts-color.svg'
import { CHAINS } from './consts'
import { init } from '@web3-onboard/react'

const injected = injectedModule()

init({
  wallets: [injected],
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
  notify: { enabled: false },
  chains: CHAINS,
  appMetadata: {
    name: 'Gigacounts',
    icon,
    recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
  },
})
