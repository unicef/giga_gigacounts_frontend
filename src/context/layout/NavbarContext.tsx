import { createContext, useContext, useMemo, useState } from 'react'
import { NavBarContextValue, NavBarProviderProps } from './types'

const initialState: NavBarContextValue = {
  expanded: true,
  setExpanded: null
}

export const NavbarContext = createContext<NavBarContextValue>(initialState)

export const useNavbar = () => {
  const context = useContext(NavbarContext)

  if (!context) throw new Error('useNavbar must be use inside SettingsProvider')

  return context
}

export function NavBarProvider({ children }: NavBarProviderProps) {
  const [expanded, setExpanded] = useState(initialState.expanded)
  const memoizedValue = useMemo(() => ({ expanded, setExpanded }), [expanded])

  return <NavbarContext.Provider value={memoizedValue}>{children}</NavbarContext.Provider>
}
