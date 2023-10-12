import { Dispatch, SetStateAction } from 'react'

export type AuthUserType = Record<string, any>

export type AuthorizationContext = {
  isAuthenticated: boolean
  isInitialized: boolean
  isAdmin: boolean
  user: AuthUserType | null
  logout: () => void
  setUser: Dispatch<SetStateAction<AuthUserType | null>>
}
