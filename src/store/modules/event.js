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
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page).then(response => {
      commit('SET_EVENTS', response)
    })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error' + error)
        })
    }
  },
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
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
