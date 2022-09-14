import styled from 'styled-components/macro'

export const UserProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 16px 32px 24px 32px;
`
export const UserProfileHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-light-grey);

  h5 {
    width: 100%;
    color: var(--color-blue);
  }
`
export const UserProfileLogout = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  color: var(--color-dark-grey);
  cursor: pointer;
`

export const UserProfileContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 44px;
`

export const UserProfileInfo = styled.div`
  flex: 1 0 0;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content min-content min-content;
  grid-template-areas:
    'avatar name'
    'avatar role'
    'avatar flag';
  gap: 0px 32px;
`

export const UserAvatar = styled.div`
  grid-area: avatar;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
  background-color: var(--color-lightest-blue);
  border-radius: 2px;
`

export const UserName = styled.h5`
  grid-area: name;
  color: var(--color-black);
`

export const UserRoleContainer = styled.p`
  grid-area: role;
  color: var(--color-mid-grey);
  padding-bottom: 8px;
`

export const UserCountry = styled.div`
  grid-area: flag;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 36px;
    height: 24px;
  }
`

export const UserProfileCrypto = styled.div`
  flex: 0 0 750px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  h5 {
    color: var(--color-dark-blue);
  }

  button {
    width: 180px;
  }
`

export const UserProfileBalance = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const UserProfileMetamask = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SmallLink = styled.a`
  font-weight: 400;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
`
