import { INotification } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/user/USER_ID/notifications`

export const getNotifications = async (userId: string): Promise<INotification[]> => {
  try {
    const response = await instance.get(
      `${ENDPOINT_URL.replace('USER_ID', userId)}?channel=API&status=SENT&status=READ`
    )
    return response.data
  } catch {
    return []
  }
}

export const readNotification = async (userId: string, notificationId: string) => {
  const response = await instance.patch(
    `${ENDPOINT_URL.replace('USER_ID', userId)}/${notificationId}/read`
  )
  return response.data
}

export const discardNotification = async (userId: string, notificationId: string) => {
  const response = await instance.patch(
    `${ENDPOINT_URL.replace('USER_ID', userId)}/${notificationId}/discard`
  )
  return response.data
}
