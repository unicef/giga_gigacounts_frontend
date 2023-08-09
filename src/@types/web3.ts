import type { ChainWithDecimalId } from '@web3-onboard/common'
import type { WalletState, ConnectOptions } from '@web3-onboard/core'

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

export type WalletBalance = {
  token: string
  balance: number
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
  fundContract: (contractId: string, budget: string) => Promise<boolean>
  getContractBalance: (contractId: string) => Promise<string>
  getWalletBalance: (
    walletAddress: string,
    tokenCode: string | undefined
  ) => Promise<WalletBalance[]>
  fundWallet: (walletAddress: string, budget: string) => Promise<boolean>
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
  payload?: any
}

export type CreateBlockchainTransactionLog = {
  userId: string
  contractId: string | undefined
  walletAddress: string
  networkId: string
  networkName: string
  transactionType: string
  transactionHash: string
  status: string
}

export interface IBlockchainTransaction {
  id: string
  userId: number
  userDisplayName: string
  userEmail: string
  contractId?: number
  contractName: string
  walletAddress: string
  networkId: number
  networkName: string
  transactionType: string
  transactionHash: string
  status: string
  createdAt: string
}

export enum TransactionTypeCode {
  FUND_CONTRACT = 'FUND_CONTRACT',
  INCREASE_ALLOWANCE = 'INCREASE_ALLOWANCE',
  FUND_WALLET = 'FUND_WALLET'
}
