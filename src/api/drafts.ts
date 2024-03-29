import { IDraft } from 'src/@types'
import { DRAFT_ID_OFFSET } from 'src/constants'
import instance from './init'

export const getDraft = async (draftId: string): Promise<IDraft> => {
  const response = await instance.get(
    `/contract/draft/${String(Number(draftId) - DRAFT_ID_OFFSET)}`
  )
  return { ...response.data, id: String(Number(response.data.id) + DRAFT_ID_OFFSET) }
}

export const duplicateDraft = async (draftId: string) => {
  const response = await instance.post(
    `/contract/draft/duplicate/${String(Number(draftId) - DRAFT_ID_OFFSET)}`
  )
  return { ...response.data, id: String(Number(response.data.id) + DRAFT_ID_OFFSET) }
}
