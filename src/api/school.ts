import { ISchool, ISchoolMeasures, PaginationMetaData } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/school`

export const getSchools = async (countryId?: string): Promise<ISchool[]> => {
  const response = await instance.get(`${ENDPOINT_URL}`, {
    params: {
      countryId
    }
  })

  return response.data
}

export const getSchoolsPagination = async (
  countryId: string,
  page: number,
  limit: number
): Promise<{ meta: PaginationMetaData; data: ISchool[] }> => {
  const response = await instance.get(`${ENDPOINT_URL}/pagination`, {
    params: {
      page,
      limit,
      countryId
    }
  })

  return response.data
}

export const getSchoolsByExternalIdArray = async (
  countryId: string,
  externalIds: string[]
): Promise<(ISchool & { valid: boolean })[]> => {
  const response = await instance.post(
    `${ENDPOINT_URL}/csv`,
    {
      externalIds
    },
    { params: { countryId } }
  )
  return response.data
}

export const getSchoolsByNameOrExternalId = async (
  countryId: string,
  value: string
): Promise<ISchool[]> => {
  const response = await instance.get(`${ENDPOINT_URL}/search`, {
    params: {
      countryId,
      toSearch: encodeURI(value)
    }
  })
  return response.data
}

export const getSchoolMeasures = async (
  schoolId: string,
  interval: string,
  dateFrom: string,
  dateTo: string,
  contractId?: string
): Promise<ISchoolMeasures[]> => {
  const response = await instance.post(`${ENDPOINT_URL}/measures`, {
    schoolId,
    contractId,
    interval,
    dateFrom,
    dateTo
  })
  return response.data
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
