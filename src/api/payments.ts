import { IPaymentForm, IContractPayment } from 'src/types/general'
import instance from './init'

const ENDPOINT_URL = '/payment'

export const createPayment = async <T>(payment: IPaymentForm): Promise<T> => {
  const response = await instance.post<T>(ENDPOINT_URL, {
    ...payment,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to create a payment')
}

export const getPayment = async <T>(paymentId: string): Promise<T> => {
  const response = await instance.get<T>(`${ENDPOINT_URL}/${paymentId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get payment')
}

export const getContractPayments = async (contractId: string): Promise<IContractPayment[]> => {
  const response = await instance.get<IContractPayment[]>(`${ENDPOINT_URL}/contract/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get contract payments')
}
