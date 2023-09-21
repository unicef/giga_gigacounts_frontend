import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { GenericServerError, UserRoles } from 'src/@types'
import { getUserProfile } from 'src/api/user'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { loginRequest } from './auth-config'
import { AuthUserType, AuthorizationContext } from './types'
import { isValidToken, setSession } from './utils'

export const AuthContext = createContext<AuthorizationContext | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUserType | null>(null)
  const isAuthenticated = Boolean(user)

  const [isInitialized, setIsInitialized] = useState(false)

  const userRole = user?.role || { code: null }
  const adminRoles = [UserRoles.GIGA_ADMIN, UserRoles.GIGA_VIEW_ONLY]

  const isAdmin: boolean = adminRoles.some((role) => userRole.code === role)

  const { instance, accounts } = useMsal()

  useEffect(() => {
    setIsInitialized(true)
    const activeAccount = instance.getActiveAccount()
    if (!activeAccount) return
    if (activeAccount?.idToken && isValidToken(activeAccount.idToken)) {
      setSession(activeAccount.idToken)
      getUserProfile()
        .then(setUser)
        .catch((err) => GenericServerError.redirect(navigate))
      return
    }

    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: activeAccount
      })
      .then((res) => {
        setSession(res.idToken)
        getUserProfile()
          .then(setUser)
          .catch((err) => GenericServerError.redirect(navigate))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, instance])

  const memoizedValue = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      user,
      isAdmin,
      logout: () => {
        setSession(null)
        instance.logout()
      }
    }),
    [isAuthenticated, isInitialized, user, isAdmin, instance]
  )

  return (
    <>
      <AuthenticatedTemplate>
        <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoadingScreen />
      </UnauthenticatedTemplate>
    </>
  )
}
