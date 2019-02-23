import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    // the same event like in db.json server to train search by id in getter !!!
    events: [
      {
        id: 1,
        title: 'Beach Cleanup'
      },
      {
        id: 2,
        title: 'Park Cleanup'
      },
      {
        id: 3,
        title: 'Pet Adoption Day'
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    catLength: state => {
      return state.categories.length
    }
  }
})
