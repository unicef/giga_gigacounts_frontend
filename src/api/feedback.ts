import { FeedbackForm } from 'src/@types'
import instance from './init'

export const sendFeedback = async (feedback: FeedbackForm) => {
  const response = await instance.post('/feedback', feedback)
  if (response.status === 200) return response.data
  throw new Error('Failed to send feedback')
}

export const getFeedbacks = async (): Promise<FeedbackForm[]> => {
  const response = await instance.get('/feedbacks')
  if (response.status === 200) return response.data
  throw new Error('Failed to get feedback')
}
