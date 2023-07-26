import { ICountry, ICurrency, ILta } from 'src/@types'
import instance from './init'

export const getCountries = async (): Promise<ICountry[] | Error> => {
  const response = await instance.get('/country')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the contracts')
}

export const getCurrencies = async (
  countryId?: string,
  type?: string,
  networkId?: number
): Promise<ICurrency[] | Error> => {
  const response = await instance.get('/currency', {
    params: {
      type,
      networkId,
      countryId
    }
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}

export const getLtas = async (countryId?: string): Promise<ILta[]> => {
  const response = await instance.get('/lta', {
    params: {
      countryId
    }
  })

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}
