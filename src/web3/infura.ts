import { providers } from 'ethers'
import { SELECTED_CHAIN_ID } from './consts'
import { getInfuraRpcUrl } from './utils'

export const infuraProvider = new providers.JsonRpcProvider(
  getInfuraRpcUrl(SELECTED_CHAIN_ID, process.env.REACT_APP_INFURA_ID as string),
  'any',
)
