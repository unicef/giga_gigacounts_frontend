import React, { Dispatch, SetStateAction } from 'react'

export type NavBarContextValue = {
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>> | null
}

export type NavBarProviderProps = {
  children: React.ReactNode
}
