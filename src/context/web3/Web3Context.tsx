import { ethers, providers } from 'ethers'
import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useLocales } from 'src/locales'
import { useConnectWallet, useSetChain, useSetLocale, useWallets } from '@web3-onboard/react'
import { generateSignContractRandomString, signContractWithWallet } from 'src/api/contracts'
import { attachWallet, getWalletRandomString } from 'src/api/wallets'
import { useAuthContext } from 'src/auth/useAuthContext'
import {
  ENV_SUPPORTED_NETWORK,
  INITIAL_WEB3_CONTEXT_VALUE,
  INITIAL_WEB3_STATE,
  SUPPORTED_NETWORKS
} from 'src/constants/web3'
import { IWeb3Context, TokenBalance, Web3ActionType } from 'src/@types'
import { reducer } from './reducer'
import { initWeb3Onboard } from './web3-onboard'


export const Web3Context = createContext<IWeb3Context>(INITIAL_WEB3_CONTEXT_VALUE)

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3Onboard, setWeb3Onboard] = useState<any>(null)
  const [secondaryTokens, setSecondaryTokens] = useState<{address:string}[]>([])

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
  }, [])

  const { currentLang } = useLocales()
  const [{ initiated, verifying, verified, signing, signed, error }, dispatch] = useReducer(
    reducer,
    INITIAL_WEB3_STATE
  )
  const { user } = useAuthContext()
  const [{ wallet, connecting }, connect, disconnect, updateBalances] = useConnectWallet()
  const connectedWallets = useWallets()
  const [, setChain] = useSetChain()

  const updateLocale: (locale: string) => void = useSetLocale()

  useEffect(() => {
    updateLocale(currentLang.value || 'en')
  }, [updateLocale, currentLang])

  const account = useMemo(() => {
    const address = wallet?.accounts?.[0]?.address
    if (address) {
      return ethers.utils.getAddress(address)
    }
    return undefined
  }, [wallet?.accounts])

  const balances = useMemo(() => {
    const address = wallet?.accounts?.[0]?.address

    if (address && wallet?.accounts[0]) {
      try {
        const combinedBalances: TokenBalance[] = []
        const accountBalances = wallet?.accounts[0]
        let mainBalanceKeys: any[] = []
        try {
          // @ts-ignore
          mainBalanceKeys = Object.keys(accountBalances?.balance)
        } catch (err) {
          // ignore
        }

        if (mainBalanceKeys.length > 0) {
          combinedBalances.push({
            name: mainBalanceKeys[0],
            value: accountBalances.balance ? accountBalances.balance[mainBalanceKeys[0]] : '0',
            type: 'main'
          })
        }

        accountBalances?.secondaryTokens?.forEach((secondaryToken: any) => {
          combinedBalances.push({
            name: secondaryToken.name,
            value: secondaryToken.balance,
            type: 'secondary'
          })
        })
        return combinedBalances
      } catch (err) {
        console.error('error en web3', err)
        return []
      }
    }
    return []
  }, [wallet?.accounts])

  const chain = useMemo(() => {
    const chanId = wallet?.chains?.[0].id.toString()
    if (chanId) {
      const chanIdDecimal = parseInt(chanId, 16)
      const selectedNetwork = SUPPORTED_NETWORKS[chanIdDecimal]
      if (selectedNetwork && wallet) {
        return selectedNetwork
      }
      const providerNetwork = ethers.providers.getNetwork(chanIdDecimal)
      return {
        id: providerNetwork.chainId,
        token: 'ETH',
        label: `${providerNetwork.name} Network`,
        publicRpcUrl: 'https://rpc.ankr.com/eth',
        rpcUrl: 'https://rpc.ankr.com/eth',
        blockExplorerUrl: 'https://etherscan.io/'
      }
    }
    return undefined
  }, [wallet])
  
  const supportedChain = useMemo(() => {
    if (chain && chain?.id === ENV_SUPPORTED_NETWORK?.id) {
      return chain
    }
    return undefined
  }, [chain])

  const changeLanguage = useCallback(() => {
    updateLocale(currentLang.value || 'en')
  }, [updateLocale, currentLang])

  const disconnectAll = useCallback(() => {
    if (wallet) {
      disconnect({
        label: wallet?.label
      })
    }
  }, [disconnect, wallet])

  const updateBalance = useCallback(() => {
    const address = wallet?.accounts?.[0]?.address
    if (address) {
      updateBalances([address])
    }
  }, [updateBalances, wallet])

  const resetError = () =>
    dispatch({
      type: Web3ActionType.RESET_ERROR
    })

  const verifyWallet = useCallback(async () => {
    if (!wallet?.provider || !account) {
      return false
    }

    try {
      dispatch({
        type: Web3ActionType.SET_VERIFYING,
        payload: true
      })

      const provider = new providers.Web3Provider(
        wallet.provider as unknown as providers.JsonRpcFetchFunc,
        'any'
      )

      const signer = provider.getSigner()
      const verificationMessage = await getWalletRandomString()
      const signatureHash = await signer.signMessage(verificationMessage)
      await attachWallet(account, signatureHash)

      dispatch({
        type: Web3ActionType.SET_VERIFIED,
        payload: true
      })

      return true
    } catch (err) {
      console.error('error en web3', err)
      dispatch({
        type: Web3ActionType.SET_ERROR,
        payload: new Error(err.message)
      })
      return false
    }
  }, [account, wallet?.provider])

  const signContract = useCallback(
    async (contractId: string): Promise<boolean> => {
      if (!wallet?.provider || !account) {
        return false
      }

      try {
        dispatch({
          type: Web3ActionType.SET_SIGNING,
          payload: true
        })

        const provider = new providers.Web3Provider(
          wallet?.provider as unknown as providers.JsonRpcFetchFunc,
          'any'
        )

        const signer = provider.getSigner()
        const verificationMessage = await generateSignContractRandomString(contractId)

        if (verificationMessage) {
          const signatureHash = await signer.signMessage(verificationMessage)
          const address = wallet?.accounts?.[0]?.address || ''
          const result = await signContractWithWallet(contractId, address, signatureHash)
          if (result) {
            dispatch({
              type: Web3ActionType.SET_SIGNED,
              payload: true
            })
            return true
          }
        }
        dispatch({
          type: Web3ActionType.SET_ERROR,
          payload: new Error('some error ocurr')
        })
        return false
      } catch (err) {
        console.error('error en web3', err)
        dispatch({
          type: Web3ActionType.SET_ERROR,
          payload: new Error(err.message)
        })
        return false
      }
    },
    [account, wallet?.provider, wallet?.accounts]
  )

  const value = useMemo(
    () => ({
      initiated,
      wallet,
      account,
      balances,
      chain,
      supportedChain,
      connecting,
      verifying,
      verified,
      signing,
      signed,
      error,
      updateLocale,
      connect,
      disconnect: disconnectAll,
      verifyWallet,
      signContract,
      updateBalance,
      setChain,
      changeLanguage,
      resetError
    }),
    [
      initiated,
      wallet,
      account,
      balances,
      chain,
      supportedChain,
      connecting,
      verifying,
      verified,
      signing,
      signed,
      error,
      updateLocale,
      connect,
      disconnectAll,
      verifyWallet,
      signContract,
      updateBalance,
      setChain,
      changeLanguage
    ]
  )
  useEffect(() => {
    if (user?.loading || connecting || !initiated) {
      return
    }

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label)

    if (connectedWalletsLabelArray.length) {
      localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray))
    } else {
      localStorage.removeItem('connectedWallets')
    }
  }, [connectedWallets, connecting, initiated, user?.loading])

  useEffect(() => {
    let inUnmounted = false
    if (user?.loading || initiated) {
      return
    }

    const previouslyConnectedWallets = JSON.parse(localStorage.getItem('connectedWallets') ?? '[]')

    if (previouslyConnectedWallets?.length) {
      if (user?.data === undefined) {
        localStorage.removeItem('connectedWallets')

        dispatch({
          type: Web3ActionType.SET_INITIATED
        })
      } else if (!account) {
        connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
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
                type: Web3ActionType.SET_INITIATED
              })
            }
          })
      } else {
        dispatch({
          type: Web3ActionType.SET_INITIATED
        })
      }
    } else {
      dispatch({
        type: Web3ActionType.SET_INITIATED
      })
    }
    inUnmounted = true
  }, [account, connect, initiated, user?.data, user?.loading])

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}
