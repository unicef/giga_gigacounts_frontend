import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import images from 'src/assets/images'
import { useGeneralContext } from 'src/state/GeneralContext'
import { useUser } from 'src/state/hooks'
import { useWeb3Context } from 'src/web3/Web4Context'
import ConnectedWallet from '../common/Wallet/ConnectedWallet'
import EthBalance from '../common/EthBalance'
import Wallet from '../common/Wallet/Wallet'
import {
  UserProfileContainer,
  UserProfileHeader,
  UserProfileContent,
  UserProfileLogout,
  UserProfileInfo,
  UserProfileCrypto,
  UserProfileBalance,
  UserProfileMetamask,
  UserName,
  UserRoleContainer,
  UserCountry,
  UserAvatar,
} from './styles'
import { UserRole } from 'src/types/general'
import { SmallLink } from '../common/SmallLink'

const UserProfile = () => {
  const { chain, disconnect, account } = useWeb3Context()

  const navigate = useNavigate()

  const { data } = useUser()

  const { name, lastName, role, country, safe, isp, walletAddress } = data ?? {}

  const {
    actions: { reset },
  } = useGeneralContext()

  const logout = useCallback(() => {
    disconnect()
    localStorage.removeItem('session')
    reset()
    navigate('/')
  }, [disconnect, reset, navigate])

  const roleDescription = useMemo(() => {
    return `${
      role === UserRole.ADMIN
        ? 'administrators'
        : role === UserRole.ISP
        ? `${isp?.name}`
        : `${country?.name} ${role?.toLocaleLowerCase()}`
    }`
  }, [role, country, isp])

  const description = useMemo(
    () => (
      <small>
        This is a{' '}
        <SmallLink
          target="_blank"
          rel="noreferrer"
          href="https://help.gnosis-safe.io/en/collections/2289028-getting-started"
        >
          gnosis safe
        </SmallLink>{' '}
        that is shared with all {roleDescription} users. To deposit funds to your safe{' '}
        <SmallLink
          target="_blank"
          rel="noreferrer"
          href="https://www.coinbase.com/learn/tips-and-tutorials/how-to-send-crypto"
        >
          follow the instructions
        </SmallLink>
      </small>
    ),
    [roleDescription],
  )

  const hasAttachedWallet = !!walletAddress
  const isConnected = !!account

  const showWithdrawButton = useMemo(
    () => isConnected && hasAttachedWallet && walletAddress === account && role === UserRole.ISP,
    [hasAttachedWallet, isConnected, account, role, walletAddress],
  )

  return (
    <UserProfileContainer>
      <UserProfileHeader>
        <h5>User Profile</h5>
        <UserProfileLogout onClick={logout}>
          <span className="icon icon-24 icon-logout icon-dark-grey"></span>
          <p>
            <b>Logout</b>
          </p>
        </UserProfileLogout>
      </UserProfileHeader>
      <UserProfileContent>
        <UserProfileInfo>
          <UserAvatar>
            <span className="icon icon-44 icon-person icon-blue" />
          </UserAvatar>
          <UserName>
            {name} {lastName}
          </UserName>
          <UserRoleContainer>
            <b>{role}</b>
          </UserRoleContainer>
          {country && (
            <UserCountry>
              <img src={country.flagUrl} alt={country.name} />
              <p>{country.name}</p>
            </UserCountry>
          )}
        </UserProfileInfo>
        <UserProfileCrypto>
          <UserProfileBalance>
            <h5>Gigacounts crypto balance</h5>
            {description}
            <Wallet label="Account Safe" chainId={chain?.id ?? 1} address={safe?.address ?? ''} icon={images.safe} />
            {safe?.address && <EthBalance account={safe.address} />}

            {showWithdrawButton && <button className="btn-blue">Withdraw Funds</button>}
          </UserProfileBalance>

          <UserProfileMetamask>
            <h5>Attached wallet</h5>
            <ConnectedWallet />
          </UserProfileMetamask>
        </UserProfileCrypto>
      </UserProfileContent>
    </UserProfileContainer>
  )
}

export default UserProfile
