import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import calendarReducer from './slices/calendar'
import chatReducer from './slices/chat'
import kanbanReducer from './slices/kanban'
import mailReducer from './slices/mail'

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
}

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
}

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer
})

export default rootReducer
