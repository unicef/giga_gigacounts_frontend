import type { ChainWithDecimalId } from '@web3-onboard/common'
import type { WalletState, ConnectOptions } from '@web3-onboard/core'

export type CHAIN_ID = 1 | 4

export enum ExplorerLinkType {
  tx = 'tx',
  address = 'address',
  token = 'token',
}

export interface IWeb3Context {
  initiated: boolean
  wallet: WalletState | null
  account: string | undefined
  chain: ChainWithDecimalId | undefined
  connecting: boolean
  connect: (options?: ConnectOptions) => Promise<WalletState[]>
  disconnect: () => void
  verifyWallet: () => void
}
