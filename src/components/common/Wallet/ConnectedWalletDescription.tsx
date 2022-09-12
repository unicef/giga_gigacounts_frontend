import { useUser } from 'src/state/hooks'
import { UserRole } from 'src/types/general'
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
          <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
            MetaMask
          </a>{' '}
          plugin in your browser. Make sure that you are logged in or create a new MetaMask account.
        </small>
      </Description>
    )
  }

  return (
    <Description>
      <small>
        This wallet will be used to sign the transactions, creating a crypto contract, managing budget on the platform.
        Install{' '}
        <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
          MetaMask
        </a>{' '}
        plugin in your browser. Make sure that you are logged in or create a new MetaMask account.
      </small>
    </Description>
  )
}

export default ConnectedWalletDescription
