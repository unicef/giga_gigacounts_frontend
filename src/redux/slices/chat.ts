import { createSlice, Dispatch } from '@reduxjs/toolkit'
import keyBy from 'lodash/keyBy'

import axios from 'src/api/init'

import { IChatState } from 'src/@types'

const initialState: IChatState = {
  isLoading: false,
  error: null,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: []
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },

    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    getContactsSuccess(state, action) {
      const contacts = action.payload

      state.contacts.byId = keyBy(contacts, 'id')
      state.contacts.allIds = Object.keys(state.contacts.byId)
    },

    getConversationsSuccess(state, action) {
      const conversations = action.payload

      state.conversations.byId = keyBy(conversations, 'id')
      state.conversations.allIds = Object.keys(state.conversations.byId)
    },

    getConversationSuccess(state, action) {
      const conversation = action.payload

      if (conversation) {
        state.conversations.byId[conversation.id] = conversation
        state.activeConversationId = conversation.id
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id)
        }
      } else {
        state.activeConversationId = null
      }
    },

    sendMessage(state, action) {
      const conversation = action.payload
      const { conversationId, messageId, message, contentType, attachments, createdAt, senderId } =
        conversation

      const newMessage = {
        id: messageId,
        body: message,
        contentType,
        attachments,
        createdAt,
        senderId
      }

      state.conversations.byId[conversationId].messages.push(newMessage)
    },

    markConversationAsReadSuccess(state, action) {
      const { conversationId } = action.payload
      const conversation = state.conversations.byId[conversationId]
      if (conversation) {
        conversation.unreadCount = 0
      }
    },

    getParticipantsSuccess(state, action) {
      const participants = action.payload
      state.participants = participants
    },

    resetActiveConversation(state) {
      state.activeConversationId = null
    },

    addRecipients(state, action) {
      const recipients = action.payload
      state.recipients = recipients
    }
  }
})

export default slice.reducer

export const { addRecipients, sendMessage, resetActiveConversation } = slice.actions

export function getContacts() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/chat/contacts')
      dispatch(slice.actions.getContactsSuccess(response.data.contacts))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getConversations() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/chat/conversations')
      dispatch(slice.actions.getConversationsSuccess(response.data.conversations))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getConversation(conversationKey: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/chat/conversation', {
        params: { conversationKey }
      })
      dispatch(slice.actions.getConversationSuccess(response.data.conversation))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function markConversationAsRead(conversationId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      await axios.get('/api/chat/conversation/mark-as-seen', {
        params: { conversationId }
      })
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getParticipants(conversationKey: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/chat/participants', {
        params: { conversationKey }
      })
      dispatch(slice.actions.getParticipantsSuccess(response.data.participants))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}
