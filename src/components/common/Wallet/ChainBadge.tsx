import { memo } from 'react'
import { SUPPORTED_CHAINS } from 'src/web3/consts'
import { StyledBadge } from './styles'

interface ChainBadgeProps {
  chainId: number
  connected?: boolean
  wrongChain?: boolean
}

const ChainBadge: React.FC<ChainBadgeProps> = memo(
  ({ chainId, connected = false, wrongChain = false }: ChainBadgeProps): JSX.Element => {
    const label = SUPPORTED_CHAINS[chainId]?.label

    return (
      <StyledBadge connected={connected} error={wrongChain}>
        {connected && <span className="icon icon-20 icon-dot" />}
        <span className="super-small">{label}</span>
      </StyledBadge>
    )
  },
)

ChainBadge.displayName = 'ChainBadge'

export default ChainBadge
