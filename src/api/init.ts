import axios from 'axios'

const instance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

instance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('session')
    if (config !== undefined && config.headers !== undefined && AUTH_TOKEN !== null) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default instance
