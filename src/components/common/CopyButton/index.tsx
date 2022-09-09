import { ReactNode, useState } from 'react'
import { CopyButtonWrapper, StyledButton } from './styles'

interface CopyButtonProps {
  textToCopy: string
  label: ReactNode
  className?: string
  showIcon?: boolean
  tooltip?: string
}

const CopyButton = ({ textToCopy, label, showIcon = true, tooltip, ...props }: CopyButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const onClick = () => {
    navigator.clipboard.writeText(textToCopy)

    if (tooltip) {
      setShowTooltip(true)
    }
  }

  const onMouseLeave = () => {
    setTimeout(() => setShowTooltip(false), 200)
  }

  return (
    <CopyButtonWrapper onMouseLeave={showTooltip ? onMouseLeave : undefined}>
      <StyledButton {...props} onClick={onClick}>
        {showIcon && <span className="icon icon-18 icon-copy icon-mid-grey" />}
        <span className="super-small">{label}</span>
      </StyledButton>
      {showTooltip && <span className="tooltiptext">{tooltip}</span>}
    </CopyButtonWrapper>
  )
}

export default CopyButton
