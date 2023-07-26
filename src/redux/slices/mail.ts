import { createSlice, Dispatch } from '@reduxjs/toolkit'
import keyBy from 'lodash/keyBy'

import axios from 'src/utils/axios'

import { IMailState } from 'src/@types'

const initialState: IMailState = {
  isLoading: false,
  error: null,
  mails: { byId: {}, allIds: [] },
  labels: []
}

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },

    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    getLabelsSuccess(state, action) {
      state.isLoading = false
      state.labels = action.payload
    },

    getMailsSuccess(state, action) {
      const mails = action.payload

      state.isLoading = false
      state.mails.byId = keyBy(mails, 'id')
      state.mails.allIds = Object.keys(state.mails.byId)
    },

    getMailSuccess(state, action) {
      const mail = action.payload

      state.mails.byId[mail.id] = mail
      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id)
      }
    }
  }
})

export default slice.reducer

export function getLabels() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/mail/labels')
      dispatch(slice.actions.getLabelsSuccess(response.data.labels))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getMails(params: Record<string, string>) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/mail/mails', { params })
      dispatch(slice.actions.getMailsSuccess(response.data.mails))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getMail(mailId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId }
      })
      dispatch(slice.actions.getMailSuccess(response.data.mail))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}
