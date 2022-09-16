import { memo } from 'react'
import { StyledBadge } from './styles'

interface ChainBadgeProps {
  label: string
  connected?: boolean
  wrongChain?: boolean
}

const ChainBadge: React.FC<ChainBadgeProps> = memo(
  ({ label, connected = false, wrongChain = false }: ChainBadgeProps): JSX.Element => {
    return (
      <StyledBadge connected={connected} error={wrongChain}>
        {connected && <span className="icon icon-20 icon-dot" />}
        <span className="super-small" style={{ textTransform: 'capitalize' }}>
          {label}
        </span>
      </StyledBadge>
    )
  },
)

ChainBadge.displayName = 'ChainBadge'

export default ChainBadge
