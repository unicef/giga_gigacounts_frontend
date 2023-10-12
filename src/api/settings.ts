import instance from './init'

export const getSettingValue = async (key: string): Promise<string> => {
  const response = await instance.get(`/setting/${key}`)
  return response.data
}
