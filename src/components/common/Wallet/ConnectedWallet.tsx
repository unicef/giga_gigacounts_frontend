import { useWeb3Context } from 'src/web3/Web4Context'
import { SELECTED_CHAIN_ID } from 'src/web3/consts'
import { useUser } from 'src/state/hooks'
import Wallet from './Wallet'
import ConnectedWalletDescription from './ConnectedWalletDescription'
import { Instructions } from './styles'
import Loader from '../Loader'

const ConnectedWallet = (): JSX.Element => {
  const { data } = useUser()
  const { account, chain, connect, initiated } = useWeb3Context()

  const { walletAddress } = data ?? {}

  const hasAttachedWallet = !!walletAddress
  const isConnected = !!account

  const handleConnect = () => connect()

  if (!initiated) {
    return <Loader />
  }

  if (!hasAttachedWallet) {
    if (!isConnected) {
      return (
        <div>
          <ConnectedWalletDescription />
          <button className="btn-blue" onClick={handleConnect}>
            Connect
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <ConnectedWalletDescription />
          <Wallet connected address={account} chainId={chain?.id!} wrongChain={chain?.id !== SELECTED_CHAIN_ID} />
          <Instructions>
            <small>
              To complete wallet attachment, please sign a verification message. Currently connected wallet address will
              be linked to your Gigacounts account
            </small>
          </Instructions>
          <button className="btn-green">Sign Message</button>
        </div>
      )
    }
  }

  return (
    <>
      <ConnectedWalletDescription />
      <Wallet
        address={walletAddress}
        chainId={SELECTED_CHAIN_ID}
        wrongChain={chain?.id !== SELECTED_CHAIN_ID}
        wrongAddress={!!account && walletAddress !== account}
        connected={!!account}
      />
      {!account && (
        <button className="btn-blue" onClick={handleConnect}>
          Connect
        </button>
      )}
      {account && walletAddress !== account && (
        <>
          <small>
            To complete wallet attachment, please sign a verification message. Currently connected wallet address will
            be linked to your gigacounts account.
          </small>
          <button className="btn-green" onClick={() => connect()}>
            Sign Message
          </button>
        </>
      )}
    </>
  )
}

export default ConnectedWallet
