import { useWeb3Context } from 'src/web3/Web4Context'
import { SELECTED_CHAIN_ID } from 'src/web3/consts'
import { useUser } from 'src/state/hooks'
import Wallet from './Wallet'
import ConnectedWalletDescription from './ConnectedWalletDescription'
import { ShowAddress } from './styles'
import Loader from '../Loader'
import { ethers } from 'ethers'

const ConnectedWallet = (): JSX.Element => {
  const { data } = useUser()
  const { account, chain, connect, initiated, setChain, verifyWallet } = useWeb3Context()

  const { walletAddress } = data ?? {}

  const hasAttachedWallet = !!walletAddress
  const isConnected = !!account

  const wrongNetwork = chain?.id !== SELECTED_CHAIN_ID
  const wrongAddress = hasAttachedWallet && account !== walletAddress
  const isVerified = hasAttachedWallet && !wrongAddress

  const handleConnect = () => connect()

  const handleChangeChain = () => setChain({ chainId: ethers.utils.hexValue(SELECTED_CHAIN_ID) })

  if (!initiated) {
    return <Loader />
  }

  if (!isConnected) {
    return (
      <div>
        <ConnectedWalletDescription />
        <button className="btn-blue" onClick={handleConnect}>
          Connect
        </button>
      </div>
    )
  }

  return (
    <>
      <ConnectedWalletDescription />
      <Wallet
        address={account}
        chainId={chain?.id!}
        wrongChain={wrongNetwork}
        wrongAddress={wrongAddress}
        connected={!!account}
        isVerified={isVerified}
      />
      {!account && (
        <button className="btn-blue" onClick={handleConnect}>
          Connect
        </button>
      )}
      {!hasAttachedWallet && !wrongNetwork && (
        <>
          <small>
            To complete wallet attachment, please sign a verification message. Currently connected wallet address will
            be linked to your Gigacounts account.
          </small>
          <button className="btn-green" onClick={verifyWallet}>
            Sign Message
          </button>
        </>
      )}
      {wrongAddress && (
        <>
          <div>
            <small>Connected wallet doesn&apos;t match your verified wallet on Gigacounts</small>
            <small style={{ display: 'inline-flex', whiteSpace: 'nowrap', alignItems: 'center' }}>
              Verify connected wallet or choose
              <ShowAddress>
                <span className="icon icon-24 icon-wallet" />
                <p className="super-small ellipsis">{walletAddress} &nbsp;</p>
              </ShowAddress>
              in MetaMask.
            </small>
          </div>
        </>
      )}
      {wrongNetwork && (
        <>
          <small>
            You are connected to the network that Gigacounts doesn&apos;t accept. Please select Ethereum network in your
            MetaMask.
          </small>
          <button className="btn-blue" onClick={handleChangeChain}>
            Switch network
          </button>
        </>
      )}
    </>
  )
}

export default ConnectedWallet
