import { memo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SELECTED_CHAIN_ID } from 'src/web3/consts'
import { CHAIN_ID, ExplorerLinkType } from 'src/web3/types'
import { getExplorerUrl } from 'src/web3/utils'

interface ExplorerLinkProps {
  hash: string
  type?: ExplorerLinkType
  chainId?: CHAIN_ID
  label?: ReactNode
  className?: string
}

const ExplorerLink = memo(
  ({
    hash,
    type = ExplorerLinkType.address,
    chainId = SELECTED_CHAIN_ID,
    label = hash,
    ...props
  }: ExplorerLinkProps) => (
    <Link target="_blank" rel="noreferrer" {...props} to={getExplorerUrl(hash, type, chainId)}>
      {label}
    </Link>
  ),
)

ExplorerLink.displayName = 'ExplorerLink'

export default ExplorerLink
