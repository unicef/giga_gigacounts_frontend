import instance from './init'

const ENDPOINT_URL = `/isp`

export interface IIsp {
  id: string
  name: string
  country_id: string
}

export const getIsp = async (countryId?: string, ltaId?: string): Promise<IIsp[]> => {
  const response = await instance.get(ENDPOINT_URL, {
    params: {
      countryId,
      ltaId
    }
  })

  return response.data
}
