import { Configuration, LogLevel, RedirectRequest } from '@azure/msal-browser'
import { B2C } from 'src/constants/config-global'

export const b2cPolicies = {
  names: {
    signUpSignIn: B2C.signUpSignInName,
    forgotPassword: B2C.forgotPasswordName,
    editProfile: B2C.editProfileName
  },
  authorities: {
    signUpSignIn: {
      authority: `${B2C.url}/${B2C.signUpSignInName}`
    },
    forgotPassword: {
      authority: `${B2C.url}/${B2C.forgotPasswordName}`
    },
    editProfile: {
      authority: `${B2C.url}/${B2C.editProfileName}`
    }
  },
  authorityDomain: B2C.domain
}

export const msalConfig: Configuration = {
  auth: {
    clientId: B2C.clientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/dashboard/app',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: any) => {
        if (containsPii) return

        switch (level) {
          case LogLevel.Error:
            console.error(message)
            break
          case LogLevel.Info:
            console.info(message)
            break
          case LogLevel.Verbose:
            console.debug(message)
            break
          case LogLevel.Warning:
            console.warn(message)
            break
          default:
        }
      }
    }
  }
}

export const loginRequest: RedirectRequest = {
  redirectUri: '/dashboard/app',
  scopes: ['openid']
}
