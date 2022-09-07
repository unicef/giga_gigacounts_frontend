import { CHAIN_ID } from './types'
import type { ChainWithDecimalId } from '@web3-onboard/common'

export const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export const SUPPORTED_CHAINS: Record<number, ChainWithDecimalId> = {
  1: {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://etherscan.io/',
  },
  4: {
    id: 4,
    token: 'ETH',
    label: 'Rinkeby Testnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth_rinkeby',
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://rinkeby.etherscan.io/',
  },
}

export const SELECTED_CHAIN_ID = parseInt(process.env.REACT_APP_NETWORK as string) as CHAIN_ID

export const SELECTED_NETWORK = SUPPORTED_CHAINS[SELECTED_CHAIN_ID]

export const CHAINS = [SELECTED_NETWORK]
