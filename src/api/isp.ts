import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/isp`

export interface IIsp {
  id: number
  name: string
  country_id: number
}

axios.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('session')
    if (config !== undefined && config.headers !== undefined) {
      config.headers.Authorization = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : ''
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

export const getIsp = async (countryId?: number, ltaId?: number): Promise<IIsp[] | Error> => {
  try {
    let url = `${BASE_URL}`

    if (countryId) url = `${url}?countryId=${countryId}`
    if (ltaId) url = `${url}${countryId ? '&' : '?'}ltaId=${ltaId}`

    const response = await axios.get(url)

    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the ISPs')
  } catch (error) {
    return error as Error
  }
}
