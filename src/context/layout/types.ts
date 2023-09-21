import React, { Dispatch, SetStateAction } from 'react'

export type NavBarContextValue = {
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

export type NavBarProviderProps = {
  children: React.ReactNode
}
