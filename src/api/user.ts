import { IUser } from 'src/@types'
import instance from './init'

export const getUserProfile = async (): Promise<IUser> => {
  const response = await instance.get('/user/profile')

  if (response.status === 200) {
    const { data } = response
    return data
  }

  throw new Error('Failed to get user profile')
}

export const settingAutomaticContracts = async (automaticContractsEnabled: boolean) => {
  const response = await instance.patch(`/user/setting-automatic-contract`, {
    automaticContractsEnabled
  })
  if (response.status === 200) return response.data
  throw new Error(`Could not set setting automatic contracts`)
}
