import { ISchool, ISchoolMeasures } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/school`

export const getSchools = async (countryId?: string): Promise<ISchool[]> => {
  const response = await instance.get(`${ENDPOINT_URL}`, {
    params: {
      countryId
    }
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the schools')
}

export const getSchoolMeasures = async (
  schoolId: string,
  contractId: string,
  interval: string
): Promise<ISchoolMeasures[] | Error> => {
  const response = await instance.post(`${ENDPOINT_URL}/measures`, {
    schoolId,
    contractId,
    interval
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the schools measures')
}

export const setReliability = async (id: string, newReliability: boolean) => {
  const response = await instance.patch(
    `${ENDPOINT_URL}`,
    {},
    {
      params: { reliableMeasures: newReliability, schoolId: id }
    }
  )
  return response.data
}
