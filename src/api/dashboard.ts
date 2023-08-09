import { IDashboardSchools } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/dashboard`

export const getSchools = async (): Promise<IDashboardSchools[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/schools`, {})
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the schools')
}
