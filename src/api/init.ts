import axios from 'axios'

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
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default instance
