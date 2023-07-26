import axios from 'axios'
import { BACKEND_URL } from 'src/config-global'

const axiosInstance = axios.create({ baseURL: BACKEND_URL })

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance
