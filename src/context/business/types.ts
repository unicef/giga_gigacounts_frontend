import { IContract, ICountry, ICurrency, IFrequency, IISP, INotification } from 'src/@types'
import { ISuggestedMetrics } from 'src/api/metrics'

export type BusinessContextValue = {
  currencies: ICurrency[]
  countries: ICountry[]
  internetProviders: IISP[]
  contracts: IContract[] | null
  suggestedMetrics: ISuggestedMetrics | null
  notifications: INotification[] | null
  frequencies: IFrequency[]
  refetchNotifications: () => void
  refetchContracts: () => void
  refetchIsps: (countryId: string) => Promise<IISP[]> | undefined
  refetchCurrencies: (
    automaticContract: boolean,
    countryId?: string
  ) => Promise<ICurrency[]> | undefined
  deleteContract: (id: string) => Promise<void>
  readNotification: (id: string) => Promise<void>
  readManyNotifications: (id: string[]) => Promise<PromiseSettledResult<any>[]>
  discardNotification: (id: string) => Promise<void>
  discardManyNotifications: (id: string[]) => Promise<PromiseSettledResult<any>[]>
}
