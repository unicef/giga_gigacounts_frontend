import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGeneralContext } from 'src/state/GeneralContext'
import { useUser } from 'src/state/hooks'
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
  const navigate = useNavigate()

  const {
    data: { name, lastName, role, country },
  } = useUser()

  const {
    actions: { reset },
  } = useGeneralContext()

  const logout = useCallback(() => {
    localStorage.removeItem('session')
    reset()
    navigate('/')
  }, [reset, navigate])

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
            <button className="btn-blue">Withdraw Funds</button>
          </UserProfileBalance>

          <UserProfileMetamask>
            <h5>Attached wallet</h5>
            <Wallet network="Etherium Mainnet" address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" />
            <small>Please sign a verification message to link your wallet address to your gigacounts account</small>
            <button className="btn-green">Sign Message</button>
          </UserProfileMetamask>
        </UserProfileCrypto>
      </UserProfileContent>
    </UserProfileContainer>
  )
}

export default UserProfile
