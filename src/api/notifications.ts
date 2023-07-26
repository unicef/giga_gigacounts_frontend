import { INotification } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = `/user/USER_ID/notifications`

export const getNotifications = async (userId: string): Promise<INotification[] | Error> => {
  try {
    const response = await instance.get(
      `${ENDPOINT_URL.replace('USER_ID', userId)}?channel=API&status=SENT&status=READ`
    )
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get user notificatons')
  } catch (error: unknown) {
    return error as Error
  }
}

export const readNotification = async (userId: string, notificationId: string) => {
  try {
    const response = await instance.patch(
      `${ENDPOINT_URL.replace('USER_ID', userId)}/${notificationId}/read`
    )
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to mark notification as read')
  } catch (error) {
    if (error?.response && error.response.status === 422) {
      throw new Error('Validation failed')
    }
    throw new Error('Failed to mark notification as read')
  }
}

export const discardNotification = async (userId: string, notificationId: string) => {
  try {
    const response = await instance.patch(
      `${ENDPOINT_URL.replace('USER_ID', userId)}/${notificationId}/discard`
    )
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to mark notification as discarded')
  } catch (error) {
    if (error?.response && error.response.status === 422) {
      throw new Error('Validation failed')
    }
    throw new Error('Failed to mark notification as discarded')
  }
}
