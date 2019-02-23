<template>
  <div>
    <h1>Events List</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <BaseIcon/>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
export default {
  name: 'EventsList',
  components: { EventCard },
  data() {
    return {
      serwer: 'http://localhost:3000/events',
      events: []
    }
  },
  created() {
      EventService.getEvents()
      .then(response => {this.events = response.data; console.log(this.events)})
      .catch(error => {console.log('There was an error' + error)})
    
  }
}
</script>

<style>
</style>
