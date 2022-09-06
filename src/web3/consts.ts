import { CHAIN_ID } from './types'

export const SUPPORTED_CHAINS = {
  1: {
    id: 1,
    token: 'ETH',
    name: 'mainnet',
    rpcPrefix: 'mainnet',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://rpc.ankr.com/eth',
  },
  4: {
    id: 4,
    token: 'ETH',
    name: 'rinkeby',
    rpcPrefix: 'rinkeby',
    label: 'Rinkeby Testnet',
    rpcUrl: 'https://rpc.ankr.com/eth_rinkeby',
  },
}

export const SELECTED_CHAIN_ID = parseInt(process.env.REACT_APP_NETWORK as string) as CHAIN_ID

export const SELECTED_NETWORK = SUPPORTED_CHAINS[SELECTED_CHAIN_ID]

export const CHAINS = [SELECTED_NETWORK]
