import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { IContract, ICountry, ICurrency, IFrequency, IISP, INotification } from 'src/@types';
import { deleteContractDraft, getContracts, getCountries, getCurrencies } from 'src/api/contracts';
import { getIsp } from 'src/api/isp';
import { ISuggestedMetrics, getSuggestedMetrics } from 'src/api/metrics';
import { discardNotification, getNotifications, readNotification } from 'src/api/notifications';
import { getFrequencies } from 'src/api/payments';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CURRENCIES_TYPES, ENV_SUPPORTED_NETWORK_ID } from 'src/constants';
import { redirectOnError } from 'src/utils/errorHandlers';
import { parseContractStatus } from 'src/utils/status';
import { BusinessContextValue } from './types';

const initialState: BusinessContextValue = {
  currencies: [],
  countries: [],
  internetProviders: [],
  contracts: null,
  notifications: null,
  suggestedMetrics: null,
  frequencies: [],
  refetchNotifications: () => {},
  refetchContracts: () => {},
  refetchIsps: (countryId: string) => new Promise(() => {}),
  refetchCurrencies: (automaticContract: boolean, countryId?: string) => new Promise(() => {}),
  deleteContract: (id: string) => new Promise(() => {}),
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
  const navigate = useNavigate()
  const [suggestedMetrics, setSuggestedMetrics] = useState<ISuggestedMetrics | null>(null)
  const [countries, setCountries] = useState<ICountry[]>([])
  const [internetProviders, setInternetProviders] = useState<IISP[]>([])
  const [contracts, setContracts] = useState<IContract[] | null>(null)
  const [notifications, setNotifications] = useState<INotification[] | null>(null)
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [frequencies, setFrequencies] = useState<IFrequency[]>([])
  const { user, isAuthenticated, isAdmin } = useAuthContext()
  const isApproved = user?.approved

  const handleErrors = useCallback(
    (err: any) => redirectOnError(navigate, err),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const memorizedValue = useMemo(
    () => ({
      countries,
      internetProviders,
      contracts,
      notifications,
      currencies,
      frequencies,
      suggestedMetrics,
      refetchNotifications: () => {
        if (!isAuthenticated || !isApproved) return
        getNotifications(user?.id).then(setNotifications)
      },
      refetchContracts: () => {
        if (!isAuthenticated) return
        getContracts().then((response) => {
          setContracts(
            response.map((c) => ({
              ...c,
              status: parseContractStatus(c.status)
            }))
          )
        })
      },
      refetchIsps: (countryId: string) => {
        if (!isAuthenticated) return undefined
        return getIsp(countryId)
      },
      refetchCurrencies: (automaticContract: boolean, countryId?: string) => {
        if (!isAuthenticated || !isApproved) return undefined
        const currencyType = automaticContract ? CURRENCIES_TYPES.STABLE : CURRENCIES_TYPES.FIAT
        const networkId = automaticContract ? ENV_SUPPORTED_NETWORK_ID : undefined
        const finalCountryId = automaticContract ? undefined : countryId
        return getCurrencies(finalCountryId, currencyType, networkId)
      },
      deleteContract: deleteContractDraft,
      readNotification: (id: string) => readNotification(user?.id, id),
      readManyNotifications: (ids: string[]) =>
        Promise.allSettled(ids.map((id) => readNotification(user?.id, id))),
      discardNotification: (id: string) => discardNotification(user?.id, id),
      discardManyNotifications: (ids: string[]) =>
        Promise.allSettled(ids.map((id) => discardNotification(user?.id, id)))
    }),
    [
      isApproved,
      frequencies,
      suggestedMetrics,
      isAuthenticated,
      countries,
      internetProviders,
      contracts,
      notifications,
      user,
      currencies
    ]
  )

  const getCountryId = useCallback(
    () => (isAuthenticated ? user?.country?.id : null),
    [user, isAuthenticated]
  )

  useEffect(() => {
    if (!isAuthenticated || !isApproved) return
    getSuggestedMetrics().then(setSuggestedMetrics)
  }, [isAuthenticated, isApproved])

  useEffect(() => {
    if (!isAuthenticated || !isApproved) return
    getNotifications(user?.id).then(setNotifications)
  }, [isAuthenticated, user, isApproved])

  useEffect(() => {
    if (!isAuthenticated || !isApproved) return
    getContracts()
      .then((response) => {
        setContracts(
          response.map((c) => ({
            ...c,
            status: parseContractStatus(c.status)
          }))
        )
      })
      .catch(handleErrors)
  }, [isAuthenticated, handleErrors, isApproved])

  useEffect(() => {
    if (!isAuthenticated) return

    getCountries()
      .then((c) => {
        if (isAdmin) setCountries(c)
        else setCountries(c.filter((country) => country.id === user?.country?.id))
      })
      .catch(handleErrors)
  }, [isAuthenticated, user, isAdmin, handleErrors, isApproved])

  useEffect(() => {
    const countryId = getCountryId()
    if (!isAuthenticated || !countryId) return
    getIsp(countryId).then(setInternetProviders).catch(handleErrors)
  }, [isAuthenticated, countries, isAdmin, user, getCountryId, handleErrors, isApproved])

  useEffect(() => {
    const countryId = getCountryId()
    if (!isAuthenticated || !isApproved || !countryId) return

    getCurrencies(countryId).then(setCurrencies).catch(handleErrors)
  }, [getCountryId, isAuthenticated, handleErrors, isApproved])

  useEffect(() => {
    getFrequencies().then(setFrequencies).catch(handleErrors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <BusinessContext.Provider value={memorizedValue}>{children}</BusinessContext.Provider>
}
