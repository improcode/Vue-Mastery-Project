import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  categories: [
    'sustainability',
    'nature',
    'animal welfare',
    'housing',
    'education',
    'food',
    'community'
  ],
  events: [],
  eventsTotal: 0,
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events.data
    state.eventsTotal = parseInt(events.headers['x-total-count'])
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fething events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fething event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}
export const getters = {
  getEventById: state => id => {
    state.event = state.events.find(event => event.id === id)
  },
  catLength: state => {
    return state.categories.length
  }
}
