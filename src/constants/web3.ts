import type { ChainWithDecimalId } from '@web3-onboard/common'
import { CHAIN_ID, IWeb3Context } from 'src/@types'
import { ALCHEMY_ID, GIGACOUNTS_TOKEN_ADR } from 'src/config-global'

export const SUPPORTED_NETWORKS: Record<number, ChainWithDecimalId> = {
  137: {
    id: 137,
    token: 'MATIC',
    label: 'Polygon Mainnet',
    publicRpcUrl: 'https://polygon-rpc.com',
    rpcUrl: `https://polygon.g.alchemy.com/v2/${ALCHEMY_ID || ''}`,
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
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`,
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
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

export const ENV_SUPPORTED_NETWORK_ID = parseInt(
  process.env.REACT_APP_NETWORK ?? '80001',
  10
) as CHAIN_ID
export const ENV_SUPPORTED_NETWORK = SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID]

export const INITIAL_WEB3_STATE = {
  initiated: false,
  verifying: false,
  verified: false,
  signing: false,
  signed: false,
  error: undefined
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
