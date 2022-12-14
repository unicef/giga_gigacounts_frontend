import { CHAIN_ID, IWeb3Context } from './types'
import type { ChainWithDecimalId } from '@web3-onboard/common'

export const INFURA_ID = process.env.REACT_APP_INFURA_ID ?? 'c6b741d4895e44b9918bb1c4ea0b8c0a'

export const SUPPORTED_CHAINS: Record<number, ChainWithDecimalId> = {
  1: {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://etherscan.io/',
  },
  3: {
    id: 3,
    token: 'ETH',
    label: 'Ropsten Testnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth_ropsten',
    rpcUrl: `https://ropsten.infura.io/v3//${INFURA_ID}`,
    blockExplorerUrl: 'https://ropsten.etherscan.io/',
  },
  4: {
    id: 4,
    token: 'ETH',
    label: 'Rinkeby Testnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth_rinkeby',
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://rinkeby.etherscan.io/',
  },
  5: {
    id: 5,
    token: 'ETH',
    label: 'Goerli Testnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth_goerli',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://goerli.etherscan.io/',
  },
  42: {
    id: 42,
    token: 'ETH',
    label: 'Kovan Testnet',
    publicRpcUrl: 'https://rpc.ankr.com/eth_kovan',
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrl: 'https://kovan.etherscan.io/',
  },
}

export const SELECTED_CHAIN_ID = parseInt(process.env.REACT_APP_NETWORK ?? '4') as CHAIN_ID

export const SELECTED_NETWORK = SUPPORTED_CHAINS[SELECTED_CHAIN_ID]

export const CHAINS = [SELECTED_NETWORK]

export const INITIAL_WEB3_STATE = {
  initiated: false,
  verifying: false,
  error: undefined,
}

export const INITIAL_WEB3_CONTEXT_VALUE: IWeb3Context = {
  ...INITIAL_WEB3_STATE,
  wallet: null,
  account: undefined,
  chain: undefined,
  connecting: false,
  connect: () => {
    throw new Error('Not implemented')
  },
  disconnect: () => {
    throw new Error('Not implemented')
  },
  verifyWallet: () => {
    throw new Error('Not implemented')
  },
  setChain: () => {
    throw new Error('Not implemented')
  },
  resetError: () => {
    throw new Error('Not implemented')
  },
}
