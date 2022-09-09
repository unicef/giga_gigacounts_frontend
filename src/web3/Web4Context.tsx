import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { createContext, useEffect, useMemo, useContext, useCallback } from 'react'
import { ChildrenProps } from '../types/utils'
import { INITIAL_WEB3_CONTEXT_VALUE, SUPPORTED_CHAINS } from './consts'
import { IWeb3Context } from './types'

import 'src/web3/onboard'

export const Web3Context = createContext<IWeb3Context>(INITIAL_WEB3_CONTEXT_VALUE)

export const Web3ContextProvider = ({ children }: ChildrenProps) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const connectedWallets = useWallets()

  const account = useMemo(() => {
    const address = wallet?.accounts?.[0]?.address
    if (address) {
      return ethers.utils.getAddress(address)
    }
  }, [wallet?.accounts])

  const chain = useMemo(() => {
    if (wallet?.chains?.[0].id) {
      return SUPPORTED_CHAINS[parseInt(wallet?.chains?.[0].id)]
    }

    return undefined
  }, [wallet?.chains])

  const disconnectAll = useCallback(() => {
    if (wallet) {
      disconnect({
        label: wallet?.label,
      })
    }
  }, [disconnect, wallet])

  const value = useMemo(
    () => ({
      wallet,
      account,
      chain,
      connecting,
      connect,
      disconnect: disconnectAll,
    }),
    [wallet, account, chain, connecting, connect, disconnectAll],
  )

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label)
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray))
  }, [connectedWallets])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets') ?? '[]')

    if (previouslyConnectedWallets?.length) {
      connect({
        autoSelect: {
          label: previouslyConnectedWallets[0],
          disableModals: true,
        },
      })
    }
  }, [connect])

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export const useWeb3Context = () => useContext(Web3Context)
