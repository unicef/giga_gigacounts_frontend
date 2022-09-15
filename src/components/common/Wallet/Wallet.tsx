import { memo } from 'react'
import images from 'src/assets/images'
import CopyButton from '../CopyButton'
import ExplorerLink from '../ExplorerLink'
import Address from './Address'
import ChainBadge from './ChainBadge'
import { WalletContainer, WalletHeader, WalletAddress, WalletWrapper } from './styles'

interface WalletProps {
  chainId: number
  address: string
  label?: string
  icon?: string
  connected?: boolean
  wrongChain?: boolean
  wrongAddress?: boolean
  isVerified?: boolean
}

const Wallet: React.FC<WalletProps> = memo(
  ({
    chainId,
    address,
    label = 'MetaMask Wallet',
    icon = images.metamaskLogo,
    connected = false,
    wrongChain = false,
    wrongAddress = false,
    isVerified = false,
  }: WalletProps): JSX.Element => {
    return (
      <WalletWrapper>
        <WalletContainer>
          {icon && <img src={icon} alt={label} />}
          <WalletHeader>
            {label && (
              <p>
                <b>{label}</b>
              </p>
            )}
            <ChainBadge chainId={chainId} wrongChain={wrongChain} connected={connected} />
          </WalletHeader>
          <WalletAddress>
            <Address address={address} wrongAddress={wrongAddress} isVerified={isVerified} />
            <CopyButton textToCopy={address} label="Copy Wallet Address" tooltip="Wallet Address Copied!" />
            <ExplorerLink hash={address} label="View on Etherscan" showIcon className="super-small" />
          </WalletAddress>
        </WalletContainer>
      </WalletWrapper>
    )
  },
)

Wallet.displayName = 'Wallet'

export default Wallet
