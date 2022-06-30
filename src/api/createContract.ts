import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`

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

axios.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('session')
    if (config !== undefined && config.headers !== undefined && AUTH_TOKEN !== undefined) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const getCountries = async (): Promise<ICountries | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/country`)
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the contracts')
  } catch (error: unknown) {
    throw error as Error
  }
}

export const getCurrency = async (): Promise<ICurrency | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/currency`)
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the currencies')
  } catch (error: unknown) {
    return error as Error
  }
}

export const getLtas = async (): Promise<ILtas | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/lta`)
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the currencies')
  } catch (error: unknown) {
    return error as Error
  }
}
