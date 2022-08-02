import instance from './init'

const ENDPOINT_URL = `/isp`

export interface IIsp {
  id: string
  name: string
  country_id: number
}

export const getIsp = async (countryId?: number, ltaId?: number): Promise<IIsp[] | Error> => {
  try {
    const response = await instance.get(ENDPOINT_URL, {
      params: {
        countryId,
        ltaId,
      },
    })

    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the ISPs')
  } catch (error) {
    return error as Error
  }
}
