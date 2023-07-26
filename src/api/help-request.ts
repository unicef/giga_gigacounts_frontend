import { HelpRequestForm, HelpRequestFunctionality, HelpRequestPossibleValue } from 'src/@types'
import instance from './init'

export const sendHelpRequest = async (helpRequest: HelpRequestForm) => {
  const response = await instance.post('/help-request', helpRequest)
  if (response.status === 200) return response.data
  throw new Error('Failed to send help request')
}

export const getHelpRequests = async (): Promise<HelpRequestForm[]> => {
  const response = await instance.get('/help-requests')
  if (response.status === 200) return response.data
  throw new Error('Failed to get help request')
}

export const getHelpRequestPossibleValues = async (): Promise<HelpRequestPossibleValue[]> => {
  const response = await instance.get('/help-request-values')
  if (response.status === 200) return response.data
  throw new Error('Failed to get help request possible values')
}

export const getHelpRequestFunctionalities = async (): Promise<HelpRequestFunctionality[]> => {
  const response = await instance.get('/help-request-functionalities')
  if (response.status === 200) return response.data
  throw new Error('Failed to get help request functionalities')
}
