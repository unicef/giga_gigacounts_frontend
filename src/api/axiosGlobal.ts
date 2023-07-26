import axios from 'axios'

const AUTH_TOKEN = localStorage.getItem('accessToken')

axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_URL}`
axios.defaults.headers.common.Authorization = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
