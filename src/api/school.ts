import { ISchoolMeasures } from 'src/types/general'
import instance from './init'

const ENDPOINT_URL = `/school`

export interface ISchool {
  id: string
  external_id: string
  name: string
  address: string
  location1: string
  location2: string
  location3: string
  location4: string
  education_level: string
  geopoint: string
  email: string
  phone_number: string
  contact_person: string
  country_id: string
}

export const getSchools = async (countryId?: string): Promise<ISchool[] | Error> => {
  const response = await instance.get(`${ENDPOINT_URL}`, {
    params: {
      countryId,
    },
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the schools')
}

export const getSchoolMeasures = async (
  schoolId: string,
  contractId: string,
  interval: string,
): Promise<ISchoolMeasures[] | Error> => {
  const response = await instance.post(`${ENDPOINT_URL}/measures`, {
    schoolId,
    contractId,
    interval,
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the schools measures')
}
