import { IPaymentMeasure } from 'src/types/general'
import instance from './init'

const ENDPOINT_URL = '/measure'

export const getNewPaymentMetrics = async <T>(measure: IPaymentMeasure): Promise<T> => {
  const response = await instance.post<T>(`${ENDPOINT_URL}/calculate`, {
    ...measure,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to create a payment')
}
