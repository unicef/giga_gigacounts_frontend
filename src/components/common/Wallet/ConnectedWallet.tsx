import Wallet from './Wallet'
import { useWeb3Context } from 'src/web3/Web4Context'
import { SELECTED_CHAIN_ID } from 'src/web3/consts'
import { useUser } from 'src/state/hooks'

const ConnectedWallet = (): JSX.Element => {
  const {
    data: { walletAddress },
  } = useUser()
  const { account, chain, connect } = useWeb3Context()

  const handleConnect = () => connect()

  if (!walletAddress) {
    if (!account || !chain?.id) {
      return (
        <div>
          <p>
            <small>
              This wallet will be used to sign the transactions, creating a crypto contract, managing budget on the
              platform. Install <a href="https://metamask.io/download/">Metamask</a> plugin in your browser. Make sure
              that you are logged in or create a new Metamask account.
            </small>
          </p>
          <button className="btn-blue" onClick={handleConnect}>
            Connect
          </button>
        </div>
      )
    } else {
      return (
        <>
          <Wallet connected address={account} chainId={chain?.id} wrongChain={chain?.id !== SELECTED_CHAIN_ID} />
          <small>Please sign a verification message to link your wallet address to your gigacounts account</small>
          <button className="btn-green" onClick={() => connect()}>
            Sign Message
          </button>
        </>
      )
    }
  }

  return (
    <>
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
          <small>Please sign a verification message to link your wallet address to your gigacounts account</small>
          <button className="btn-green" onClick={() => connect()}>
            Sign Message
          </button>
        </>
      )}
    </>
  )
}

export default ConnectedWallet
