import instance from './init'

const ENDPOINT_URL = `/school`

export interface ISchool {
  id: number
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
  country_id: number
}

export const getSchools = async (countryId?: number): Promise<ISchool[] | Error> => {
  try {
    const response = await instance.get(`${ENDPOINT_URL}`, {
      params: {
        countryId
      }
    })
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the suggested metrics')
  } catch (error: unknown) {
    return error as Error
  }
}
