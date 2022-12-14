import { useUser } from 'src/state/hooks'
import { UserRole } from 'src/types/general'
import { SmallLink } from '../SmallLink'
import { Description } from './styles'

const ConnectedWalletDescription = (): JSX.Element => {
  const { data } = useUser()

  const { role } = data ?? {}

  if (role === UserRole.ISP) {
    return (
      <Description>
        <small>
          This wallet will be used to withdraw your funds.
          <br />
          Install{' '}
          <SmallLink href="https://metamask.io/download/" target="_blank" rel="noreferrer">
            MetaMask
          </SmallLink>{' '}
          plugin in your browser and please refresh the page. Make sure that you are logged in or create a new MetaMask
          account.
        </small>
      </Description>
    )
  }

  return (
    <Description>
      <small>
        This wallet will be used to sign the transactions, creating a crypto contract, managing budget on the platform.
        Install{' '}
        <SmallLink href="https://metamask.io/download/" target="_blank" rel="noreferrer">
          MetaMask
        </SmallLink>{' '}
        plugin in your browser and please refresh the page. Make sure that you are logged in or create a new MetaMask
        account.
      </small>
    </Description>
  )
}

export default ConnectedWalletDescription
