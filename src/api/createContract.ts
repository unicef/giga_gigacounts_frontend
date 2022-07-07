import instance from './init'

export interface ICountries {
  id: string
  name: string
  code: string
  flag_url: string
}

export interface ICurrency {
  id: string
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
  try {
    const response = await instance.get('/country')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the contracts')
  } catch (error: unknown) {
    throw error
  }
}

export const getCurrency = async (): Promise<ICurrency | Error> => {
  try {
    const response = await instance.get('/currency')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the currencies')
  } catch (error: unknown) {
    throw error
  }
}

export const getLtas = async (): Promise<ILtas | Error> => {
  try {
    const response = await instance.get('/lta')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the currencies')
  } catch (error: unknown) {
    throw error
  }
}
