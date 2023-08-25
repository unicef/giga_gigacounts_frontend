import { useCallback, useState } from 'react'

const useApiRequest = <T, U extends any[]>(
  fetch: (...params: U) => Promise<T>,
  handleError?: (err: Error) => void
): {
  response: T | undefined
  error: Error | undefined
  loading: boolean
  fetch: (...params: U) => void
} => {
  const [response, setResponse] = useState<T | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState(false)

  const axiosFetch = useCallback(
    (...params: U) => {
      setLoading(true)
      fetch(...params)
        .then((res) => setResponse(res))
        .catch((err) => {
          if (err instanceof Error && handleError) {
            handleError(err)
            return
          }
          setError(err)
        })
        .finally(() => setLoading(false))
    },
    [fetch, handleError]
  )

  return { response, error, loading, fetch: axiosFetch }
}

export default useApiRequest
