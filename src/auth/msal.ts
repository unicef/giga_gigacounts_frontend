import { EventType, PublicClientApplication } from '@azure/msal-browser'
import { loginRequest, msalConfig } from './auth-config'

const msalInstance = new PublicClientApplication(msalConfig)

const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

msalInstance.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const { account } = event.payload
    msalInstance.setActiveAccount(account)
  }
  if (event.eventType === EventType.LOGIN_FAILURE) {
    msalInstance.loginRedirect({
      ...loginRequest,
      prompt: 'select_account'
    })

    // forgot password... ?
  }
})

msalInstance
  .handleRedirectPromise()
  .then((authResult) => {
    const account = msalInstance.getActiveAccount()
    if (!account)
      msalInstance.loginRedirect({
        ...loginRequest,
        prompt: 'select_account'
      })
  })
  .catch((err) => {})

export default msalInstance
