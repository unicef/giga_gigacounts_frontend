import axios from 'axios'
import { Error403, Error404, Error500 } from 'src/@types'

const instance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

instance.interceptors.request.use(
  (config) => {
    const AUTH_TOKEN = localStorage.getItem('accessToken')
    if (config !== undefined && config.headers !== undefined && AUTH_TOKEN !== null) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 500)
      return Promise.reject(new Error500())
    if (error && error.response && (error.response.status === 403 || error.response.status === 401))
      return Promise.reject(new Error403())
    if (error && error.response && error.response.status === 404)
      return Promise.reject(new Error404())
    return Promise.reject(error)
  }
)

export default instance
