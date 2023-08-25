import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react'
import { ethers } from 'ethers'
import instance from 'src/api/init'
import { getUserProfile } from 'src/api/user'
import axios from 'src/utils/axios'
import localStorageAvailable from 'src/utils/localStorageAvailable'
import { UserRoles } from 'src/@types'
import { isValidToken, setSession, jwtDecode } from './utils'
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types'

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT'
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean
    user: AuthUserType
  }
  [Types.LOGIN]: {
    user: AuthUserType
  }
  [Types.REGISTER]: {
    user: AuthUserType
  }
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user
    }
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user
    }
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user
    }
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    }
  }
  return state
}

export const AuthContext = createContext<JWTContextType | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const userRole = state.user?.role || []
  const adminRoles = [UserRoles.GIGA_ADMIN, UserRoles.GIGA_VIEW_ONLY]
  const isAdmin: boolean = userRole && adminRoles.some((role) => userRole.code === role)
  const storageAvailable = localStorageAvailable()

  const setuserWithRolesInSession = useCallback(
    async (accessToken: string | null): Promise<any> => {
      let user = null
      try {
        if (accessToken && isValidToken(accessToken)) {
          const decodedJwt = jwtDecode(accessToken)
          if (decodedJwt && decodedJwt.data && decodedJwt.data.role) {
            const jwtUserRole = decodedJwt.data.role || []
            if (jwtUserRole) {
              setSession(accessToken)
              user = await getUserProfile()
              user.role = jwtUserRole
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
      return user
    },
    []
  )

  const initialize = useCallback(async () => {
    try {
      const user = await setuserWithRolesInSession(
        storageAvailable ? localStorage.getItem('accessToken') : ''
      )
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: user,
          user
        }
      })
    } catch (error) {
      console.error(error)
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null
        }
      })
    }
  }, [storageAvailable, setuserWithRolesInSession])

  useEffect(() => {
    initialize()
  }, [initialize])

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const encryptedPassword = ethers.utils.id(password)

      try {
        const response = await instance.post('/login', {
          email,
          password: encryptedPassword
        })

        if (response.status === 200) {
          const accessToken = response.data.token
          const user = await setuserWithRolesInSession(accessToken)
          if (user) {
            dispatch({
              type: Types.LOGIN,
              payload: {
                user
              }
            })
          }
        }
        throw new Error('authentication error')
      } catch (ex) {
        throw new Error('authentication error')
      }
    },
    [setuserWithRolesInSession]
  )

  // REGISTER
  
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axios.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName
      })
      const { accessToken, user } = response.data

      localStorage.setItem('accessToken', accessToken)

      dispatch({
        type: Types.REGISTER,
        payload: {
          user
        }
      })
    },
    []
  )

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null)
    if (storageAvailable) {
      localStorage.clear()
    }

    dispatch({
      type: Types.LOGOUT
    })
  }, [storageAvailable])

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      isAdmin,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, isAdmin]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
