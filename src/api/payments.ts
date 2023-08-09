import { IContractPayment, IFrequency, IPaymentForm, PaymentStatus } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = '/payment'

export const createPayment = async <T>(payment: IPaymentForm) => {
  const response = await instance.post<T>(ENDPOINT_URL, {
    ...payment
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to create a payment')
}

export const getContractPayments = async (contractId: string) => {
  const response = await instance.get<IContractPayment[]>(`${ENDPOINT_URL}/contract/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get contract payments')
}

export const updatePayment = async <T>(paymentId: string, payment: Partial<IPaymentForm>) => {
  const response = await instance.put<T>(ENDPOINT_URL, { paymentId, ...payment })
  if (response.status === 200) return response.data
  throw new Error('Failed to update payment')
}

export const changePaymentStatus = async <T>(paymentId: string, status: PaymentStatus) => {
  const response = await instance.post<T>(`${ENDPOINT_URL}/change-status`, { paymentId, status })
  if (response.status === 200) return response.data
  throw new Error('Failed to update payment')
}

export const getPayments = async () => {
  const response = await instance.get<
    (IContractPayment & {
      contractName: string
      contractId: string
      contractNumberOfSchools: number
    })[]
  >(ENDPOINT_URL)
  if (response.status === 200) return response.data
  throw new Error('Failed to get payments')
}

export const getFrequencies = async (): Promise<IFrequency[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/frequencies`)
  return response.data
}
