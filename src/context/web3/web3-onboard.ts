import coinbaseModule from '@web3-onboard/coinbase'
import gas from '@web3-onboard/gas'
import gnosisModule from '@web3-onboard/gnosis'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import { init } from '@web3-onboard/react'
import trustModule from '@web3-onboard/trust'
import walletConnectModule, { WalletConnectOptions } from '@web3-onboard/walletconnect'
import icon from 'src/assets/logos/gigacounts-color.svg'
import { WALLET_CONNECT_PROJECT_ID, ENV_SUPPORTED_NETWORK } from 'src/constants'
import brLocales from 'src/locales/langs/br'
import enLocales from 'src/locales/langs/en'
import esLocales from 'src/locales/langs/es'
import frLocales from 'src/locales/langs/fr'

// https://www.programcreek.com/typescript/?api=@web3-react/walletconnect-connector.WalletConnectConnector
const wcV1InitOptions: WalletConnectOptions = {
  version: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'argent', 'trust']
  },
  connectFirstChainId: true
}

const wcV2InitOptions: WalletConnectOptions = {
  version: 2,
  // Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
  projectId: WALLET_CONNECT_PROJECT_ID || '' // ,
}

// initialize the module with options
// If version isn't set it will default to V1 until V1 sunset
const walletConnect = walletConnectModule(wcV2InitOptions || wcV1InitOptions)

const injected = injectedModule({
  filter: {
    // allow only on non android mobile
    [ProviderLabel.Detected]: ['Android', 'desktop', 'macOS', 'iOS'],
    displayUnavailable: true
  }
})

const trust = trustModule()
const coinbase = coinbaseModule()
const gnosis = gnosisModule({ whitelistedDomains: [] })

const customTheme = {
  '--w3o-background-color': '#d6e4fd',
  '--w3o-foreground-color': '#f5f5f5',
  '--w3o-text-color': '#000000',
  '--w3o-border-color': '#9e9e9e',
  '--w3o-action-color': '#007cff',
  '--w3o-border-radius': '10px'
}

export const initWeb3Onboard = init({
  theme: customTheme,
  wallets: [injected, walletConnect, gnosis, coinbase, trust],
  connect: {
    showSidebar: true,
    disableClose: false,
    autoConnectLastWallet: true,
    autoConnectAllPreviousWallet: true
  },
  accountCenter: {
    desktop: {
      enabled: false,
      minimal: true,
      position: 'bottomRight'
    },
    mobile: {
      enabled: false,
      minimal: true,
      position: 'topRight'
    }
  },
  notify: { enabled: true },
  chains: [ENV_SUPPORTED_NETWORK],
  i18n: {
    en: enLocales.wallet_external_component,
    es: esLocales.wallet_external_component,
    fr: frLocales.wallet_external_component,
    br: brLocales.wallet_external_component
  },
  appMetadata: {
    name: 'Gigacounts',
    description: 'Manage Giga contracts, budget and payments',
    icon,
    recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }]
  }
})

export const connectedWallets = async () => {
  await initWeb3Onboard.connectWallet()
}

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  endpoint: 'blockPrices'
})
