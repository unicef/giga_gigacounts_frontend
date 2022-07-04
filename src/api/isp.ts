import instance from './init'

const BASE_URL = `/isp`

export interface IIsp {
  id: number
  name: string
  country_id: number
}

export const getIsp = async (countryId?: number, ltaId?: number): Promise<IIsp[] | Error> => {
  try {
    let url = `${BASE_URL}`

    if (countryId) url = `${url}?countryId=${countryId}`
    if (ltaId) url = `${url}${countryId ? '&' : '?'}ltaId=${ltaId}`

    const response = await instance.get(url, {
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
