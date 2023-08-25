import { HelpRequestForm, HelpRequestFunctionality, HelpRequestPossibleValue } from 'src/@types'
import instance from './init'

export const sendHelpRequest = async (helpRequest: HelpRequestForm) => {
  const response = await instance.post('/help-request', helpRequest)
  return response.data
}

export const getHelpRequests = async (): Promise<HelpRequestForm[]> => {
  const response = await instance.get('/help-requests')
  return response.data
}

export const getHelpRequestPossibleValues = async (): Promise<HelpRequestPossibleValue[]> => {
  const response = await instance.get('/help-request-values')
  return response.data
}

export const getHelpRequestFunctionalities = async (): Promise<HelpRequestFunctionality[]> => {
  const response = await instance.get('/help-request-functionalities')
  return response.data
}
