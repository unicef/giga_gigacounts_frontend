import { ICurrency } from 'src/types/general'
import instance from './init'

export interface ICountries {
  id: string
  name: string
  code: string
  flag_url: string
}

export interface ILtas {
  id: string
  name: string
  created_by: string
  created_at: string
  updated_at: string
  country_id: string
}

export const getCountries = async (): Promise<ICountries | Error> => {
  const response = await instance.get('/country')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the contracts')
}

export const getCurrencies = async (type?: string): Promise<ICurrency | Error> => {
  const response = await instance.get('/currency', {
    params: {
      type,
    },
  })

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}

export const getLtas = async (countryId?: string): Promise<ILtas | Error> => {
  const response = await instance.get('/lta', {
    params: {
      countryId,
    },
  })

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}
