import { IUser, UserRoles } from 'src/@types'
import instance from './init'

export const getUserProfile = async (): Promise<IUser> => {
  const response = await instance.get('/user/profile')

  return response.data
}

export const settingAutomaticContracts = async (automaticContractsEnabled: boolean) => {
  const response = await instance.patch(`/user/setting-automatic-contract`, {
    automaticContractsEnabled
  })

  return response.data
}

export const getUsers = async (
  countryId: string,
  roles: UserRoles[],
  ispId?: string
): Promise<IUser[]> => {
  const response = await instance.get(`/user`, {
    params: {
      countryId,
      ispId,
      roles: roles.join(',')
    }
  })
  return response.data
}
