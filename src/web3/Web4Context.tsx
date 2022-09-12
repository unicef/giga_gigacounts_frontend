import { ethers } from 'ethers'
import { createContext, useEffect, useMemo, useContext, useCallback, useState } from 'react'
import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { ChildrenProps } from '../types/utils'
import { INITIAL_WEB3_CONTEXT_VALUE, SUPPORTED_CHAINS } from './consts'
import { IWeb3Context } from './types'

import 'src/web3/onboard'
import { useUser } from 'src/state/hooks'

export const Web3Context = createContext<IWeb3Context>(INITIAL_WEB3_CONTEXT_VALUE)

export const Web3ContextProvider = ({ children }: ChildrenProps) => {
  const [initiated, setInitiated] = useState(false)
  const user = useUser()
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
      initiated,
      wallet,
      account,
      chain,
      connecting,
      connect,
      disconnect: disconnectAll,
    }),
    [initiated, wallet, account, chain, connecting, connect, disconnectAll],
  )

  useEffect(() => {
    if (user.loading || connecting || !initiated) {
      return
    }

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label)

    if (connectedWalletsLabelArray.length) {
      localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray))
    } else {
      localStorage.removeItem('connectedWallets')
    }
  }, [connectedWallets, connecting, initiated, user.loading])

  useEffect(() => {
    let inUnmounted = false
    if (user.loading) {
      return
    }

    const previouslyConnectedWallets = JSON.parse(localStorage.getItem('connectedWallets') ?? '[]')

    if (previouslyConnectedWallets?.length) {
      if (user.data === undefined) {
        localStorage.removeItem('connectedWallets')

        setInitiated(true)
      } else {
        connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        })
          .then((walletStates) => {
            if (walletStates.length === 0) {
              localStorage.removeItem('connectedWallets')
            }
          })
          .catch(() => {
            localStorage.removeItem('connectedWallets')
          })
          .finally(() => {
            if (!inUnmounted) {
              setInitiated(true)
            }
          })
      }
    } else {
      setInitiated(true)
    }

    return () => {
      inUnmounted = true
    }
  }, [connect, user.data, user.loading])

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export const useWeb3Context = () => useContext(Web3Context)
