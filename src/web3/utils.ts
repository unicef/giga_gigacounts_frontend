import { SUPPORTED_CHAINS } from './consts'
import { CHAIN_ID } from './types'

export const getInfuraRpcUrl = (networkKey: CHAIN_ID, infuraId: string) =>
  infuraId ? `https://${SUPPORTED_CHAINS[networkKey].rpcPrefix}.infura.io/v3/${infuraId}` : ''
