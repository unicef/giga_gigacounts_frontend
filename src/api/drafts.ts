import instance from './init'

export const getDraft = async (id: string) => {
  const response = await instance.get(`/contract/draft/${id}`)
  if (response.status === 200) return response.data
  throw new Error(`Draft with id=${id} not found`)
}
