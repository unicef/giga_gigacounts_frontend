import type { ChainWithDecimalId } from '@web3-onboard/common'
import type { WalletState, ConnectOptions } from '@web3-onboard/core'

export type CHAIN_ID = 1 | 4

export enum ExplorerLinkType {
  tx = 'tx',
  address = 'address',
  token = 'token',
}

type SetChainOptions = {
  chainId: string
  chainNamespace?: string
  wallet?: WalletState['label']
}

export interface IWeb3Context extends Web3State {
  wallet: WalletState | null
  account: string | undefined
  chain: ChainWithDecimalId | undefined
  connecting: boolean
  connect: (options?: ConnectOptions) => Promise<WalletState[]>
  disconnect: () => void
  verifyWallet: () => void
  setChain: (options: SetChainOptions) => Promise<boolean>
  resetError: () => void
}

export interface Web3State {
  initiated: boolean
  verifying: boolean
  error?: Error
}

export enum Web3ActionType {
  SET_INITIATED = 'SET_INITIATED',
  SET_VERIFYING = 'SET_VERIFYING',
  SET_ERROR = 'SET_ERROR',
}

export interface Web3Action {
  type: Web3ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}
