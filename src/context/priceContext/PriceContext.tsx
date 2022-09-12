import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ChildrenProps } from 'src/types/utils'

export const PRICE_FEED_URL = process.env.REACT_APP_COINGECKO_API as string

export interface IPriceContext {
  price: number | undefined
  initiated: boolean
  actions: {
    initPriceService: () => void
  }
}

const INITIAL_PRICE_CONTEXT: IPriceContext = {
  price: undefined,
  initiated: false,
  actions: {
    initPriceService: () => {
      throw new Error('Not implemented')
    },
  },
}

const ONE_MINUTE = 60000

export const PriceContext = createContext<IPriceContext>(INITIAL_PRICE_CONTEXT)

export const PriceProvider = ({ children }: ChildrenProps) => {
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [serviceInitiated, setServiceInitiated] = useState(false)

  const getPrice = useCallback(async (crypto: string = 'ethereum', curr: string = 'usd') => {
    try {
      const response = await axios.get(`${PRICE_FEED_URL}`, {
        params: {
          ids: crypto,
          vs_currencies: curr,
        },
      })
      if (response.status === 200) {
        setPrice(response.data.ethereum.usd)
      }
    } catch (error) {
      setPrice(undefined)
    }
  }, [])

  const initPriceService = useCallback(() => setServiceInitiated(true), [])

  useEffect(() => {
    const startPolling = () => {
      if (serviceInitiated) {
        getPrice()
        return setInterval(() => getPrice(), ONE_MINUTE)
      }
      return null
    }

    const interval = startPolling()

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [serviceInitiated, getPrice])

  const actions = useMemo(
    () => ({
      initPriceService,
    }),
    [initPriceService],
  )

  const value = useMemo(
    () => ({
      price,
      initiated: serviceInitiated,
      actions,
    }),
    [price, serviceInitiated, actions],
  )

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
}

export const usePriceContext = () => {
  return useContext(PriceContext)
}
