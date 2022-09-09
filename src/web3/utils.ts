import { SELECTED_CHAIN_ID, SUPPORTED_CHAINS } from './consts'
import { CHAIN_ID, ExplorerLinkType } from './types'

export const getExplorerUrl = (
  hash: string,
  type: ExplorerLinkType = ExplorerLinkType.address,
  chainId: CHAIN_ID = SELECTED_CHAIN_ID,
) => {
  const { blockExplorerUrl } = SUPPORTED_CHAINS[chainId]

  return `${blockExplorerUrl}${type}/${hash}`
}
