import {
  WalletContainer,
  WalletHeader,
  WalletNetwork,
  WalletAddress,
  ShowAddress,
  CopyAddress,
  ViewAddress,
} from './styles'
import images from 'src/assets/images'
import { generateExplorerUrl } from 'src/types/utils'
import { useState } from 'react'

interface WalletProps {
  network?: string
  address?: string
}

const Wallet: React.FC<WalletProps> = ({
  network = 'Disconnected',
  address = 'Disconnected',
}: WalletProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState(false)

  const onCopyAddress = () => {
    navigator.clipboard.writeText(address)
    setShowTooltip(true)
  }

  return (
    <WalletContainer>
      <img src={images.metamaskLogo} alt="login-pattern" />
      <WalletHeader>
        <p>
          <b>Metamask Wallet</b>
        </p>
        <WalletNetwork>
          <span className="icon icon-20 icon-dot icon-blue" />
          <span className="super-small">{network}</span>
        </WalletNetwork>
      </WalletHeader>
      <WalletAddress>
        <ShowAddress>
          <span className="icon icon-24 icon-wallet icon-mid-grey" />
          <p className="super-small ellipsis">{address}</p>
        </ShowAddress>
        <CopyAddress onClick={onCopyAddress} className="tooltip">
          <span className="icon icon-18 icon-copy icon-mid-grey" />
          <span className="super-small">Copy Wallet Address</span>
          {showTooltip && <span className="tooltiptext">Wallet Address Copied!</span>}
        </CopyAddress>
        <ViewAddress href={generateExplorerUrl(address)} target="_blank" rel="noreferrer" className="super-small">
          <span className="icon icon-18 icon-copy icon-mid-grey" />
          View on Etherscan
        </ViewAddress>
      </WalletAddress>
    </WalletContainer>
  )
}

export default Wallet
