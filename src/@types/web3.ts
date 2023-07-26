import type { ChainWithDecimalId } from '@web3-onboard/common'
import type { WalletState, ConnectOptions } from '@web3-onboard/core'

export type CHAIN_ID = 137 | 80001

export enum ExplorerLinkType {
  tx = 'tx',
  address = 'address',
  token = 'token'
}

type SetChainOptions = {
  chainId: string
  chainNamespace?: string
  wallet?: WalletState['label']
}

export interface TokenBalance {
  name: string
  value: string
  type: 'main' | 'secondary'
}

export type WalletProps = {
  address?: string
  label: string
  icon: string
  isVerified: boolean
  wrongAddress: boolean
  chainLabel?: string
  chainExplorer?: string
  chainSupported: boolean
  balances: TokenBalance[] | undefined
}

export interface IWeb3Context extends Web3State {
  wallet: WalletState | null
  account: string | undefined
  balances: TokenBalance[] | undefined
  chain: ChainWithDecimalId | undefined
  supportedChain: ChainWithDecimalId | undefined
  connecting: boolean
  connect: (options?: ConnectOptions) => Promise<WalletState[]>
  disconnect: () => void
  verifyWallet: () => Promise<boolean>
  signContract: (contractId: string) => Promise<boolean>
  updateBalance: () => void
  setChain: (options: SetChainOptions) => Promise<boolean>
  changeLanguage: () => void
  resetError: () => void
}

export interface Web3State {
  initiated: boolean
  verifying: boolean
  verified: boolean
  signing: boolean
  signed: boolean
  error?: Error
}

export enum Web3ActionType {
  SET_INITIATED = 'SET_INITIATED',
  SET_VERIFYING = 'SET_VERIFYING',
  SET_VERIFIED = 'SET_VERIFIED',
  SET_SIGNING = 'SET_SIGNING',
  SET_SIGNED = 'SET_SIGNED',
  SET_ERROR = 'SET_ERROR',
  RESET_ERROR = 'RESET_ERROR'
}

export interface Web3Action {
  type: Web3ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}
