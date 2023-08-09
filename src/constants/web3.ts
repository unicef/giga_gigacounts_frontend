import type { ChainWithDecimalId } from '@web3-onboard/common'
import { IWeb3Context } from 'src/@types'
import {
  NODE_PROVIDER_URL,
  NODE_PROVIDER_KEY,
  GIGACOUNTS_TOKEN_ADR,
  NETWORK_ID
} from './config-global'

export const ENV_SUPPORTED_NETWORK_ID = parseInt(NETWORK_ID, 10)

export const SUPPORTED_NETWORKS: Record<number, ChainWithDecimalId> = {
  137: {
    id: 137,
    token: 'MATIC',
    label: 'Polygon Mainnet',
    publicRpcUrl: 'https://polygon-rpc.com',
    rpcUrl: `${NODE_PROVIDER_URL}${NODE_PROVIDER_URL.endsWith('/') ? '' : '/'}${NODE_PROVIDER_KEY}`,
    blockExplorerUrl: 'https://polygonscan.com',
    ...(GIGACOUNTS_TOKEN_ADR
      ? {
          secondaryTokens: [
            {
              address: GIGACOUNTS_TOKEN_ADR
            }
          ]
        }
      : {})
  },
  80001: {
    id: 80001,
    token: 'MATIC',
    label: 'Polygon testnet',
    publicRpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    rpcUrl: `${NODE_PROVIDER_URL}${NODE_PROVIDER_URL.endsWith('/') ? '' : '/'}${NODE_PROVIDER_KEY}`,
    ...(GIGACOUNTS_TOKEN_ADR
      ? {
          secondaryTokens: [
            {
              address: GIGACOUNTS_TOKEN_ADR
            }
          ]
        }
      : {})
  }
}

export const ENV_SUPPORTED_NETWORK = SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID]

export const INITIAL_WEB3_STATE = {
  initiated: false,
  verifying: false,
  verified: false,
  signing: false,
  signed: false,
  error: undefined
}

export const TRANSACTION_TYPE = {
  FUND_CONTRACT: 'FUND_CONTRACT',
  INCREASE_ALLOWANCE: 'INCREASE_ALLOWANCE',
  FUND_WALLET: 'FUND_WALLET'
}

export const INITIAL_WEB3_CONTEXT_VALUE: IWeb3Context = {
  ...INITIAL_WEB3_STATE,
  wallet: null,
  account: undefined,
  balances: undefined,
  chain: undefined,
  supportedChain: undefined,
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
  signContract: () => {
    throw new Error('Not implemented')
  },
  fundContract: () => {
    throw new Error('Not implemented')
  },
  getContractBalance: () => {
    throw new Error('Not implemented')
  },
  getWalletBalance: () => {
    throw new Error('Not implemented')
  },
  fundWallet: () => {
    throw new Error('Not implemented')
  },
  updateBalance: () => {
    throw new Error('Not implemented')
  },
  setChain: () => {
    throw new Error('Not implemented')
  },
  changeLanguage: () => {
    throw new Error('Not implemented')
  },
  resetError: () => {
    throw new Error('Not implemented')
  }
}
