import instance from './init'

interface ISuggestedMetrics {
  id: number
  metric_id: string
  value: string
  unit: string
}

export interface IMetric {
  id: number
  name: string
  suggestedMetrics: ISuggestedMetrics[]
}

const ENDPOINT_URL = `/metric`

export const getSuggestedMetrics = async (): Promise<IMetric[] | Error> => {
  try {
    const response = await instance.get(`${ENDPOINT_URL}/suggested-values`)
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the suggested metrics')
  } catch (error: unknown) {
    return error as Error
  }
}
