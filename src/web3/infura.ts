import { providers } from 'ethers'
import { SELECTED_NETWORK } from './consts'

export const infuraProvider = new providers.JsonRpcProvider(SELECTED_NETWORK.rpcUrl, 'any')
