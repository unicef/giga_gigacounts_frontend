import axios from 'axios'

interface ISuggestedMetrics {
  id: number
  metric_id: number
  value: number
  unit: string
}

export interface IMetric {
  id: number
  name: string
  suggestedMetrics: ISuggestedMetrics[]
}

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/metric`

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

export const getSuggestedMetrics = async (): Promise<IMetric[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/suggested-values`)
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the suggested metrics')
  } catch (error: unknown) {
    return error as Error
  }
}
