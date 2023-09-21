import {
  IContract,
  ICountry,
  ICurrency,
  IFrequency,
  IISP,
  INotification,
  ISchool
} from 'src/@types'
import { ISuggestedMetrics } from 'src/api/metrics'

export type BusinessContextValue = {
  currencies: ICurrency[]
  countries: ICountry[]
  internetProviders: IISP[]
  contracts: IContract[] | null
  schools: ISchool[] | null
  suggestedMetrics: ISuggestedMetrics | null
  notifications: INotification[] | null
  frequencies: IFrequency[]
  refetchNotifications: () => void
  refetchContracts: () => void
  setSchools: (newSchools: ISchool[] | null) => void
  refetchSchools: (countryId: string) => Promise<ISchool[]> | undefined
  refetchIsps: (countryId: string, ltaId?: string) => Promise<IISP[]> | undefined
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
