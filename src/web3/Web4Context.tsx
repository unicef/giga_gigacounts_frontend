import { ethers, providers } from 'ethers'
import { createContext, useEffect, useMemo, useContext, useCallback, useReducer } from 'react'
import { useConnectWallet, useWallets, useSetChain } from '@web3-onboard/react'
import { useUser } from 'src/state/hooks'
import { attachWallet, getWalletRandomString } from 'src/api/wallets'
import { useGeneralContext } from 'src/state/GeneralContext'
import { ChildrenProps } from '../types/utils'
import { INITIAL_WEB3_CONTEXT_VALUE, INITIAL_WEB3_STATE, SUPPORTED_CHAINS } from './consts'
import { IWeb3Context, Web3ActionType } from './types'

import 'src/web3/onboard'
import { reducer } from './reducer'

export const Web3Context = createContext<IWeb3Context>(INITIAL_WEB3_CONTEXT_VALUE)

export const Web3ContextProvider = ({ children }: ChildrenProps) => {
  const [{ initiated, verifying, error }, dispatch] = useReducer(reducer, INITIAL_WEB3_STATE)
  const user = useUser()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const connectedWallets = useWallets()
  const {
    actions: { reload },
  } = useGeneralContext()

  const [, setChain] = useSetChain()

  const account = useMemo(() => {
    const address = wallet?.accounts?.[0]?.address
    if (address) {
      return ethers.utils.getAddress(address)
    }
  }, [wallet?.accounts])

  const chain = useMemo(() => {
    if (wallet?.chains?.[0].id) {
      const supportedNetwork = SUPPORTED_CHAINS[parseInt(wallet?.chains?.[0].id)]
      if (supportedNetwork) {
        return supportedNetwork
      }
      const providerNetwork = ethers.providers.getNetwork(parseInt(wallet?.chains?.[0].id))
      return {
        id: providerNetwork.chainId,
        token: 'ETH',
        label: `${providerNetwork.name} Network`,
        rpcUrl: '',
      }
    }
  }, [wallet?.chains])

  const disconnectAll = useCallback(() => {
    if (wallet) {
      disconnect({
        label: wallet?.label,
      })
    }
  }, [disconnect, wallet])

  const resetError = () =>
    dispatch({
      type: Web3ActionType.SET_ERROR,
    })

  const verifyWallet = useCallback(async () => {
    if (!wallet?.provider || !account) {
      return
    }

    try {
      dispatch({
        type: Web3ActionType.SET_VERIFYING,
        payload: true,
      })
      const verificationMessage = await getWalletRandomString()
      const provider = new providers.Web3Provider(wallet.provider as unknown as providers.JsonRpcFetchFunc, 'any')

      const signer = provider.getSigner()

      const signedMessage = await signer.signMessage(verificationMessage)

      await attachWallet(account, signedMessage)

      reload()

      dispatch({
        type: Web3ActionType.SET_VERIFYING,
        payload: false,
      })
    } catch (error) {
      dispatch({
        type: Web3ActionType.SET_ERROR,
        payload: error,
      })
    }
  }, [account, reload, wallet?.provider])

  const value = useMemo(
    () => ({
      initiated,
      wallet,
      account,
      chain,
      connecting,
      verifying,
      error,
      connect,
      disconnect: disconnectAll,
      verifyWallet,
      setChain,
      resetError,
    }),
    [initiated, wallet, account, chain, connecting, verifying, error, connect, disconnectAll, verifyWallet, setChain],
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
    if (user.loading || initiated) {
      return
    }

    const previouslyConnectedWallets = JSON.parse(localStorage.getItem('connectedWallets') ?? '[]')

    if (previouslyConnectedWallets?.length) {
      if (user.data === undefined) {
        localStorage.removeItem('connectedWallets')

        dispatch({
          type: Web3ActionType.SET_INITIATED,
        })
      } else if (!account) {
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
              dispatch({
                type: Web3ActionType.SET_INITIATED,
              })
            }
          })
      } else {
        dispatch({
          type: Web3ActionType.SET_INITIATED,
        })
      }
    } else {
      dispatch({
        type: Web3ActionType.SET_INITIATED,
      })
    }

    return () => {
      inUnmounted = true
    }
  }, [account, connect, initiated, user.data, user.loading])

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export const useWeb3Context = () => useContext(Web3Context)
