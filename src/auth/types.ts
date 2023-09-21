export type AuthUserType = Record<string, any>

export type AuthorizationContext = {
  isAuthenticated: boolean
  isInitialized: boolean
  isAdmin: boolean
  user: AuthUserType | null
  logout: () => void
}
