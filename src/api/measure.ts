import { IPaymentMeasure } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = '/measure'

export const getNewPaymentMetrics = async (measure: IPaymentMeasure): Promise<any> => {
  const response = await instance.post(`${ENDPOINT_URL}/calculate`, {
    ...measure
  })
  return response.data
}
