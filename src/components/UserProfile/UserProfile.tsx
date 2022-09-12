import { useCallback } from 'react'
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
  UserRole,
  UserCountry,
  UserAvatar,
} from './styles'

const UserProfile = () => {
  const { chain, disconnect } = useWeb3Context()

  const navigate = useNavigate()

  const { data } = useUser()

  const { name, lastName, role, country, safe } = data ?? {}

  const {
    actions: { reset },
  } = useGeneralContext()

  const logout = useCallback(() => {
    disconnect()
    localStorage.removeItem('session')
    reset()
    navigate('/')
  }, [disconnect, reset, navigate])

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
          <UserRole>
            <b>{role}</b>
          </UserRole>
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
            <small>To recieve a donation please copy your safe adddress and send it to the donor</small>
            <Wallet label="Account Safe" chainId={chain?.id ?? 1} address={safe?.address ?? ''} icon={images.safe} />
            {safe?.address && <EthBalance account={safe.address} />}

            <button className="btn-blue">Withdraw Funds</button>
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
