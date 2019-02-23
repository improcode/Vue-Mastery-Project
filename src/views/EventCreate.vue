<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories.</p>
    <ul>
      <li v-for="(cat, index) in categories" :key="index">{{ cat }}</li>
    </ul>
    <p>Searched id: {{ getEventById(1) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  
  computed: {
    // short way to setup getters
    ...mapGetters(['catLength', 'getEventById']),
    
    // longer way to setup a getters
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    // getEventById() {
    //   return this.$store.getters.getEventById
    // },
    ...mapState(['user', 'categories', 'events'])
  } 

  // fourth method the shortest
  // computed: mapState(['user', 'categories'])
  // })
  // third method shortly and with specific names
  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // })
  // second method to access store
  // computed: mapState({
  //   userName: state => state.user.name,
  //   userID: state => state.user.id,
  //   categories: state => state.categories
  // })
  // first method access to state
  // computed: {
  // userName() {
  //   return this.$store.state.user.name
  // },
  // userID() {
  //   return this.$store.state.user.id
  // }
  // }
}
</script>

<style scoped>
</style>
