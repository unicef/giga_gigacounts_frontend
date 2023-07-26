import { Web3ContextProvider } from 'src/context/web3/Web3Context'
import AccountCryptoUserWallet from './AccountCryptoUserWallet'

export default function AccountCrypto() {
  return (
    <Web3ContextProvider>
      <AccountCryptoUserWallet />
    </Web3ContextProvider>
  )
}
