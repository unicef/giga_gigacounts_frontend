import { memo } from 'react'
import { getWalletIcon } from 'src/utils/getWalletIcon'
import { AddressWrapper } from './styles'

interface AddressProps {
  address: string
  wrongAddress?: boolean
  isVerified?: boolean
}

const Address: React.FC<AddressProps> = memo(
  ({ address, wrongAddress = false, isVerified = false }: AddressProps): JSX.Element => {
    return (
      <AddressWrapper error={wrongAddress} verified={isVerified}>
        <span className={`icon icon-24  ${getWalletIcon(wrongAddress, isVerified)} `} />
        <span className="super-small ellipsis">{address}</span>
      </AddressWrapper>
    )
  },
)

Address.displayName = 'Wallet'

export default Address
