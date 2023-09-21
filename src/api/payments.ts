import {
  IContractPayment,
  IFrequency,
  IPaymentConnection,
  IPaymentForm,
  IPeriod,
  PaymentStatus
} from 'src/@types'
import instance from './init'

const ENDPOINT_URL = '/payment'

export const createPayment = async (payment: IPaymentForm): Promise<IContractPayment> => {
  const response = await instance.post(ENDPOINT_URL, {
    ...payment
  })
  return response.data
}

export const getContractPayments = async (contractId: string): Promise<IContractPayment[]> => {
  const response = await instance.get<IContractPayment[]>(`${ENDPOINT_URL}/contract/${contractId}`)
  return response.data
}

export const updatePayment = async (
  paymentId: string,
  payment: Partial<IPaymentForm>
): Promise<IContractPayment> => {
  const response = await instance.put(ENDPOINT_URL, { paymentId, ...payment })
  return response.data
}

export const changePaymentStatus = async (paymentId: string, status: PaymentStatus) => {
  const response = await instance.post(`${ENDPOINT_URL}/change-status`, { paymentId, status })
  return response.data
}

export const getPayments = async (countryId?: string) => {
  const response = await instance.get<
    (IContractPayment & {
      contractName: string
      contractId: string
      contractNumberOfSchools: number
      contractCountryName: string
    })[]
  >(ENDPOINT_URL, { params: { countryId } })
  return response.data
}

export const getFrequencies = async (): Promise<IFrequency[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/frequencies`)
  return response.data
}

export const getPaymentConnection = async (
  contractId: number,
  paidDate: IPeriod
): Promise<IPaymentConnection> => {
  const response = await instance.post(`${ENDPOINT_URL}/measures`, {
    ...paidDate,
    contractId
  })
  return response.data
}
