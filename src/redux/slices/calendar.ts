import { createSlice, Dispatch } from '@reduxjs/toolkit'

import axios from 'src/api/init'

import { ICalendarEvent, ICalendarState } from 'src/@types'

const initialState: ICalendarState = {
  isLoading: false,
  error: null,
  events: []
}

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },

    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    getEventsSuccess(state, action) {
      state.isLoading = false
      state.events = action.payload
    },

    createEventSuccess(state, action) {
      const newEvent = action.payload
      state.isLoading = false
      state.events = [...state.events, newEvent]
    },

    updateEventSuccess(state, action) {
      state.isLoading = false
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload
        }
        return event
      })
    },

    deleteEventSuccess(state, action) {
      const eventId = action.payload
      state.events = state.events.filter((event) => event.id !== eventId)
    }
  }
})

export default slice.reducer

export function getEvents() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get('/api/calendar/events')
      dispatch(slice.actions.getEventsSuccess(response.data.events))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function createEvent(newEvent: ICalendarEvent) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent)
      dispatch(slice.actions.createEventSuccess(response.data.event))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function updateEvent(
  eventId: string,
  event: Partial<{
    allDay: boolean
    start: Date | string | number | null
    end: Date | string | number | null
  }>
) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        event
      })
      dispatch(slice.actions.updateEventSuccess(response.data.event))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function deleteEvent(eventId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      await axios.post('/api/calendar/events/delete', { eventId })
      dispatch(slice.actions.deleteEventSuccess(eventId))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}
