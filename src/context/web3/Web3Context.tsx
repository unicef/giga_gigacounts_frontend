import { useConnectWallet, useSetChain, useSetLocale, useWallets } from '@web3-onboard/react'
import { ethers, providers } from 'ethers'
import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import {
  CreateBlockchainTransactionLog,
  IWeb3Context,
  TokenBalance,
  WalletBalance,
  Web3ActionType
} from 'src/@types'
import { generateSignContractRandomString, signContractWithWallet } from 'src/api/contracts'
import { createBlockchainTransaction } from 'src/api/blockchainTransactions'
import { attachWallet, getWalletRandomString } from 'src/api/wallets'
import { useAuthContext } from 'src/auth/useAuthContext'
import {
  GIGACOUNTS_CONTRACT_HANDLER_ADR,
  GIGACOUNTS_TOKEN_ADR,
  GIGACOUNTS_OWNER_ADR,
  ENV_SUPPORTED_NETWORK,
  ENV_SUPPORTED_NETWORK_ID,
  INITIAL_WEB3_CONTEXT_VALUE,
  INITIAL_WEB3_STATE,
  SUPPORTED_NETWORKS,
  TRANSACTION_TYPE
} from 'src/constants'
import { useLocales } from 'src/locales'
import { abiToken } from './abiToken'
import { abiHandler } from './abiHandlerv3'
import { reducer } from './reducer'
import { initWeb3Onboard } from './web3-onboard'

export const Web3Context = createContext<IWeb3Context>(INITIAL_WEB3_CONTEXT_VALUE)

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setWeb3Onboard] = useState<any>(null)

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

  const getProvider = (wlt: any) => {
    if (!wlt)
      return new ethers.providers.JsonRpcProvider(
        SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].rpcUrl,
        ENV_SUPPORTED_NETWORK_ID
      )
    return new providers.Web3Provider(wlt.provider as unknown as providers.JsonRpcFetchFunc, 'any')
  }

  const saveTransactionLog = useCallback(
    (
      transactionType: string,
      transactionHash: string,
      contractId: string | undefined,
      status: string
    ) => {
      try {
        const record: CreateBlockchainTransactionLog = {
          userId: user?.id,
          walletAddress: wallet?.accounts?.[0]?.address || '',
          networkId: ENV_SUPPORTED_NETWORK_ID.toString(),
          networkName: SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].label || '',
          transactionType,
          transactionHash,
          contractId,
          status
        }
        createBlockchainTransaction(record)
      } catch (ex) {
        console.error(ex)
      }
    },
    [user, wallet]
  )

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

  const getContractBalance = useCallback(
    async (contractId: string): Promise<string> => {
      if (!wallet?.provider || !account) {
        return ''
      }
      let result
      try {
        const provider = getProvider(wallet)
        const contractHandler = new ethers.Contract(
          GIGACOUNTS_CONTRACT_HANDLER_ADR,
          abiHandler,
          provider
        )
        const contractToken = new ethers.Contract(GIGACOUNTS_TOKEN_ADR, abiToken, provider)
        const response = await contractHandler.getFunds(contractId, GIGACOUNTS_TOKEN_ADR)
        const decimals = await contractToken.decimals()
        result = ethers.utils.formatUnits(response, decimals)
      } catch (err) {
        console.error('getContractBalance Error:', err)
      }
      return result ?? ''
    },
    [wallet, account]
  )

  const getWalletBalance = useCallback(
    async (
      walletAddress: string,
      tokenERC20ContractAddress: string | undefined
    ): Promise<WalletBalance[]> => {
      if (!wallet?.provider || !account) {
        return []
      }

      const defaultResult = [{ token: '', balance: 0 }]

      if (tokenERC20ContractAddress) {
        try {
          const provider = getProvider(wallet)
          const erc20Contract = new ethers.Contract(
            tokenERC20ContractAddress,
            [
              'function balanceOf(address) view returns (uint256)',
              'function decimals() view returns (uint8)',
              'function symbol() view returns (string)'
            ],
            provider
          )
          const balanceWei = await erc20Contract.balanceOf(walletAddress)
          const decimals = await erc20Contract.decimals()
          const token: string = await erc20Contract.symbol()
          const balance: number = parseInt(
            ethers.utils.formatUnits(balanceWei, decimals) || '0',
            10
          )
          return [{ token, balance }]
        } catch (err) {
          console.error(err)
        }
      }
      return defaultResult
    },
    [wallet, account]
  )

  const fundContract = useCallback(
    async (contractId: string, budget: string): Promise<boolean> => {
      if (!wallet?.provider || !account) {
        return false
      }

      let lastTrx = { type: '', hash: '', contractId: '', status: '' }

      try {
        const provider = getProvider(wallet)
        const signer = provider.getSigner()

        // allowance
        const contractToken = new ethers.Contract(GIGACOUNTS_TOKEN_ADR, abiToken, provider)
        let trxAllowance = await contractToken.allowance(
          GIGACOUNTS_OWNER_ADR,
          GIGACOUNTS_CONTRACT_HANDLER_ADR
        )
        const decimals = await contractToken.decimals()
        const valueAllowance = ethers.utils.formatUnits(trxAllowance, decimals)
        console.log('fundcontract allowance', valueAllowance)
        const amount = ethers.utils.parseUnits(budget, decimals)

        if (parseInt(budget, 10) > parseInt(valueAllowance, 10)) {
          const trxIncreaseAllowance = await contractToken
            .connect(signer)
            .increaseAllowance(GIGACOUNTS_CONTRACT_HANDLER_ADR, amount)

          lastTrx = {
            type: TRANSACTION_TYPE.INCREASE_ALLOWANCE,
            hash: trxIncreaseAllowance.hash,
            contractId,
            status: trxIncreaseAllowance.status
          }
          const trxIncreaseAllowanceWait = await trxIncreaseAllowance.wait()
          console.log('fundcontract increase allowance result:', trxIncreaseAllowanceWait)
          saveTransactionLog(
            lastTrx.type,
            trxIncreaseAllowanceWait.transactionHash,
            lastTrx.contractId,
            trxIncreaseAllowanceWait.status
          )

          // re-chech allowance
          trxAllowance = await contractToken.allowance(
            GIGACOUNTS_OWNER_ADR,
            GIGACOUNTS_CONTRACT_HANDLER_ADR
          )
          console.log(
            'fundcontract allowance re-check',
            ethers.utils.formatUnits(trxAllowance, decimals)
          )
        }

        // check funds
        const provider2 = getProvider(wallet)
        const signer2 = provider2.getSigner()
        const contractHandler = new ethers.Contract(
          GIGACOUNTS_CONTRACT_HANDLER_ADR,
          abiHandler,
          provider2
        )
        const response1 = await contractHandler.getFunds(contractId, GIGACOUNTS_TOKEN_ADR)
        const balance1 = ethers.utils.formatUnits(response1, decimals)
        console.log('fundcontract getContractBalance: ', balance1)

        // send funds
        const trxFund = await contractHandler
          .connect(signer2)
          .createContractAndFund(contractId, GIGACOUNTS_TOKEN_ADR, amount, { gasLimit: 6000000 })
        lastTrx = {
          type: TRANSACTION_TYPE.FUND_CONTRACT,
          hash: trxFund.hash,
          contractId,
          status: trxFund.status
        }
        const trxFundWait = await trxFund.wait()
        console.log('fundcontract funds result:', trxFundWait)
        saveTransactionLog(
          lastTrx.type,
          trxFundWait.transactionHash,
          contractId,
          trxFundWait.status
        )

        // check
        const response2 = await contractHandler.getFunds(contractId, GIGACOUNTS_TOKEN_ADR)
        const balance2 = ethers.utils.formatUnits(response2, decimals)
        console.log('fundcontract getContractBalance: ', balance2)

        return true
      } catch (err) {
        console.error('fundContract error:', err)
        saveTransactionLog(lastTrx.type, lastTrx.hash, lastTrx.contractId, lastTrx.status)
        dispatch({
          type: Web3ActionType.SET_ERROR,
          payload: new Error(err.message)
        })
        return false
      }
      return true
    },
    [account, wallet, saveTransactionLog]
  )

  const fundWallet = useCallback(
    async (walletAddress: string, budget: string): Promise<boolean> => {
      console.log(`fundWallet wallet:${walletAddress}`)
      if (!wallet?.provider || !account) {
        return false
      }

      let lastTrx = { type: '', hash: '', contractId: '', status: '' }

      try {
        const provider = getProvider(wallet)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(GIGACOUNTS_TOKEN_ADR, abiToken, provider)
        const decimals = await contract.decimals()
        const value = ethers.utils.parseUnits(budget, decimals)
        const trx = await contract.connect(signer).transfer(walletAddress, value)
        lastTrx = {
          type: TRANSACTION_TYPE.FUND_WALLET,
          hash: trx.hash,
          contractId: '',
          status: trx.status
        }
        const trxWait = await trx.wait()
        saveTransactionLog(
          lastTrx.type,
          trxWait.transactionHash,
          lastTrx.contractId,
          trxWait.status
        )
        console.log(trxWait)
        return true
      } catch (err) {
        console.error('fundWallet Error:', err)
        saveTransactionLog(lastTrx.type, lastTrx.hash, lastTrx.contractId, lastTrx.status)
        dispatch({
          type: Web3ActionType.SET_ERROR,
          payload: new Error(err.message)
        })
        return false
      }
      return true
    },
    [account, wallet, saveTransactionLog]
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
      fundContract,
      getContractBalance,
      getWalletBalance,
      fundWallet,
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
      fundContract,
      getContractBalance,
      getWalletBalance,
      fundWallet,
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
