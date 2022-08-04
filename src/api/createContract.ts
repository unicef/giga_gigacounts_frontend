import instance from './init'

export interface ICountries {
  id: string
  name: string
  code: string
  flag_url: string
}

export interface ICurrency {
  id: string
  code?: string
  name: string
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

export const getCurrency = async (): Promise<ICurrency | Error> => {
  const response = await instance.get('/currency')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}

export const getLtas = async (): Promise<ILtas | Error> => {
  const response = await instance.get('/lta')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}
