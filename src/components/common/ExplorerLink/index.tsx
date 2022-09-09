import { memo, ReactNode } from 'react'
import { SELECTED_CHAIN_ID } from 'src/web3/consts'
import { CHAIN_ID, ExplorerLinkType } from 'src/web3/types'
import { getExplorerUrl } from 'src/web3/utils'
import { StyledLink } from './styles'

interface ExplorerLinkProps {
  hash: string
  type?: ExplorerLinkType
  chainId?: CHAIN_ID
  label?: ReactNode
  className?: string
  showIcon?: boolean
}

const ExplorerLink = memo(
  ({
    hash,
    type = ExplorerLinkType.address,
    chainId = SELECTED_CHAIN_ID,
    label = hash,
    showIcon = false,
    ...props
  }: ExplorerLinkProps) => (
    <StyledLink target="_blank" rel="noreferrer" {...props} href={getExplorerUrl(hash, type, chainId)}>
      {showIcon && <span className="icon icon-18 icon-copy icon-mid-grey" />}
      {label}
    </StyledLink>
  ),
)

ExplorerLink.displayName = 'ExplorerLink'

export default ExplorerLink
