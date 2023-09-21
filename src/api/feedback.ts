import { FeedbackForm } from 'src/@types'
import instance from './init'

export const sendFeedback = async (feedback: FeedbackForm & { path: string }) => {
  const response = await instance.post('/feedback', feedback)
  return response.data
}

export const getFeedbacks = async (): Promise<FeedbackForm[]> => {
  const response = await instance.get('/feedbacks')
  return response.data
}
