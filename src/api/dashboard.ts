import { IDashboardContract, IDashboardSchools } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/dashboard`

export const getSchools = async (countryId: string): Promise<IDashboardSchools[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/schools`, { params: { countryId } })

  return response.data
}

export const getContractsWithIssues = async (countryId: string): Promise<IDashboardContract[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/contracts/not-meets`, {
    params: { countryId }
  })
  return response.data.contracts
}
