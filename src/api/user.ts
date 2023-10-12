import { IExternalUserWithId, IUser, UserRoles } from 'src/@types'
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

export const getUsers = async <T extends boolean>(
  countryId: string,
  roles: UserRoles[],
  externals: T,
  ispId?: string
): Promise<T extends true ? (IUser | IExternalUserWithId)[] : IUser[]> => {
  const response = await instance.get(`/user`, {
    params: {
      countryId,
      ispId,
      roles: roles.join(','),
      externalUsers: externals ? 1 : 0
    }
  })
  return response.data
}
