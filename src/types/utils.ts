export interface ChildrenProps {
  children?: React.ReactNode
}

export type NonEmptyArray<T> = {
  0: T
} & Array<T>

export enum ExplorerLinkType {
  tx = 'tx',
  address = 'address',
  token = 'token',
}

export const generateExplorerUrl = (
  hash: string,
  // type: ExplorerLinkType = ExplorerLinkType.address,
  // chainId: number = SELECTED_CHAIN_ID,
) => {
  //   const { explorerUrlPrefix } = SUPPORTED_CHAINS[chainId as keyof typeof SUPPORTED_CHAINS]
  //   return `${explorerUrlPrefix}/${type}/${hash}`
  return ''
}
