import { useState, useEffect } from 'react'
import { Axios, AxiosRequestConfig } from 'axios'

interface Config {
  axiosInstance: Axios
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  requestConfig?: AxiosRequestConfig
}

const useApiRequest = (): {
  response: null
  errors: Error | undefined
  loading: boolean
  axiosFetch: (configObj: Config) => Promise<void>
} => {
  const [response, setResponse] = useState(null)
  const [errors, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)
  const [controller, setController] = useState<AbortController>()

  const axiosFetch = async (configObj: Config) => {
    const { axiosInstance, method, url, requestConfig } = configObj

    setLoading(true)

    try {
      const ctrl = new AbortController()
      setController(ctrl)

      const res = await axiosInstance[method](url, {
        ...requestConfig,
        signal: ctrl.signal,
      })

      setResponse(res.data)
      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
    }
  }

  useEffect(() => {
    return () => controller && controller.abort()
  }, [controller])

  return { response, errors, loading, axiosFetch }
}

export default useApiRequest
