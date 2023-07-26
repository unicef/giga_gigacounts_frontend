import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { IContract, ICountry, ICurrency, IISP, ILta, INotification, ISchool } from 'src/@types'
import { deleteContractDraft, getContracts } from 'src/api/contracts'
import { getCountries, getCurrencies, getLtas } from 'src/api/createContract'
import { getIsp } from 'src/api/isp'
import { discardNotification, getNotifications, readNotification } from 'src/api/notifications'
import { getSchools } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { DEFAULT_COUNTRY_CODE } from 'src/config-global'
import { CURRENCIES_TYPES } from 'src/constants/currencies'
import { ENV_SUPPORTED_NETWORK_ID } from 'src/constants/web3'
import { parseContractStatus } from 'src/utils/status'

const initialState: {
  currencies: ICurrency[]
  countries: ICountry[]
  internetProviders: IISP[]
  contracts: IContract[]
  ltas: ILta[]
  schools: ISchool[]
  notifications: INotification[]
  refetchNotifications: () => void
  refetchContracts: () => void
  refetchSchools: (countryId: string) => Promise<ISchool[] | Error> | undefined
  refetchLtas: (countryId: string) => Promise<ILta[] | Error> | undefined
  refetchIsps: (countryId: string, ltaId: string) => Promise<IISP[] | Error> | undefined
  refetchCurrencies: (
    automaticContract: boolean,
    countryId?: string
  ) => Promise<ICurrency[] | Error> | undefined
  deleteContract: (id: string) => Promise<void>
  deleteManyContracts: (ids: string[]) => Promise<PromiseSettledResult<any>[]>
  readNotification: (id: string) => Promise<void>
  readManyNotifications: (id: string[]) => Promise<PromiseSettledResult<any>[]>
  discardNotification: (id: string) => Promise<void>
  discardManyNotifications: (id: string[]) => Promise<PromiseSettledResult<any>[]>
} = {
  currencies: [],
  countries: [],
  internetProviders: [],
  contracts: [],
  ltas: [],
  schools: [],
  notifications: [],
  refetchNotifications: () => {},
  refetchContracts: () => {},
  refetchSchools: (countryId: string) => new Promise(() => {}),
  refetchLtas: (countryId: string) => new Promise(() => {}),
  refetchIsps: (countryId: string, ltaId: string) => new Promise(() => {}),
  refetchCurrencies: (automaticContract: boolean, countryId?: string) => new Promise(() => {}),
  deleteContract: (id: string) => new Promise(() => {}),
  deleteManyContracts: (ids: string[]) => new Promise(() => {}),
  readNotification: (id: string) => new Promise(() => {}),
  readManyNotifications: (id: string[]) => new Promise(() => {}),
  discardNotification: (id: string) => new Promise(() => {}),
  discardManyNotifications: (id: string[]) => new Promise(() => {})
}

export const BusinessContext = createContext(initialState)

export const useBusinessContext = () => {
  const context = useContext(BusinessContext)
  if (!context) throw new Error('useBusinessContext must be use inside BusinessProvider')

  return context
}

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<ICountry[]>([])
  const [internetProviders, setInternetProviders] = useState<IISP[]>([])
  const [contracts, setContracts] = useState<IContract[]>([])
  const [ltas, setLtas] = useState<ILta[]>([])
  const [schools, setSchools] = useState<ISchool[]>([])
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const { user, isAuthenticated, isAdmin } = useAuthContext()

  const memorizedValue = useMemo(
    () => ({
      countries,
      internetProviders,
      contracts,
      ltas,
      schools,
      notifications,
      currencies,
      refetchNotifications: () => {
        if (!isAuthenticated) return
        getNotifications(user?.id || '0').then((response) => {
          if (response instanceof Error) throw response
          setNotifications(response)
        })
      },
      refetchContracts: () => {
        if (!isAuthenticated) return
        getContracts().then((response) => {
          if (response instanceof Error) throw response
          setContracts(
            response.contracts.map((c) => ({
              ...c,
              status: parseContractStatus(c.status)
            }))
          )
        })
      },
      refetchSchools: (countryId: string) => {
        if (!isAuthenticated) return undefined
        return getSchools(countryId)
      },
      refetchLtas: (countryId: string) => {
        if (!isAuthenticated) return undefined
        return getLtas(countryId)
      },
      refetchIsps: (countryId: string, ltaId: string) => {
        if (!isAuthenticated) return undefined
        return getIsp(countryId, ltaId)
      },
      refetchCurrencies: (automaticContract: boolean, countryId?: string) => {
        if (!isAuthenticated) return undefined
        const currencyType = automaticContract ? CURRENCIES_TYPES.STABLE : CURRENCIES_TYPES.FIAT
        const networkId = automaticContract ? ENV_SUPPORTED_NETWORK_ID : undefined
        const finalCountryId = automaticContract ? undefined : countryId
        return getCurrencies(finalCountryId, currencyType, networkId)
      },
      deleteContract: (id: string) => deleteContractDraft(id),
      deleteManyContracts: (ids: string[]) =>
        Promise.allSettled(ids.map((id) => deleteContractDraft(id))),
      readNotification: (id: string) => readNotification(user?.id || '0', id),
      readManyNotifications: (ids: string[]) =>
        Promise.allSettled(ids.map((id) => readNotification(user?.id || '0', id))),
      discardNotification: (id: string) => discardNotification(user?.id || '0', id),
      discardManyNotifications: (ids: string[]) =>
        Promise.allSettled(ids.map((id) => discardNotification(user?.id || '0', id)))
    }),
    [
      isAuthenticated,
      countries,
      internetProviders,
      contracts,
      ltas,
      schools,
      notifications,
      user,
      currencies
    ]
  )

  const getCountryId = useCallback(async () => {
    let countryId
    const defaultCountryId = countries.find((c: ICountry) => c.code === DEFAULT_COUNTRY_CODE)?.id
    if (!isAdmin) {
      countryId = countries.find((c: ICountry) => c.id === user?.country.id)?.id ?? defaultCountryId
    }
    return countryId
  }, [countries, isAdmin, user?.country.id])

  useEffect(() => {
    if (!isAuthenticated) return
    getNotifications(user?.id || '0').then((n) => {
      if (n instanceof Error) throw n
      setNotifications(n)
    })
  }, [isAuthenticated, user])

  useEffect(() => {
    if (!isAuthenticated) return
    getContracts().then((response) => {
      if (response instanceof Error) throw response
      setContracts(
        response.contracts.map((c) => ({
          ...c,
          status: parseContractStatus(c.status)
        }))
      )
    })
  }, [isAuthenticated, ltas])

  useEffect(() => {
    if (!isAuthenticated) return
    getCountryId().then((countryId) => {
      getSchools(countryId).then((s) => {
        if (s instanceof Error) throw s
        setSchools(s)
      })
    })
  }, [isAuthenticated, countries, isAdmin, user, getCountryId])

  useEffect(() => {
    if (!isAuthenticated) return

    getCountryId().then((countryId) => {
      getLtas(countryId).then((l) => {
        if (l instanceof Error) throw l
        setLtas(l)
      })
    })
  }, [isAuthenticated, countries, isAdmin, user, getCountryId])

  useEffect(() => {
    if (!isAuthenticated) return

    getCountries().then((c) => {
      if (c instanceof Error) throw c
      if (isAdmin) setCountries(c)
      else setCountries(c.filter((country) => country.id === user?.country.id))
    })
  }, [isAuthenticated, user, isAdmin])

  useEffect(() => {
    if (!isAuthenticated) return
    getCountryId().then((countryId) => {
      getIsp(countryId).then((i) => {
        if (i instanceof Error) throw i
        setInternetProviders(i)
      })
    })
  }, [isAuthenticated, countries, isAdmin, user, getCountryId])

  useEffect(() => {
    if (!isAuthenticated) return

    getCountryId().then((countryId) => {
      getCurrencies(countryId).then((c) => {
        if (c instanceof Error) throw c
        setCurrencies(c)
      })
    })
  }, [getCountryId, isAuthenticated])

  return <BusinessContext.Provider value={memorizedValue}>{children}</BusinessContext.Provider>
}
